import { NextRequest, NextResponse } from "next/server";

// ─── CONFIG FROM ENV ONLY ──────────────────────────────────────────────────
// PAYSTACK_SECRET_KEY must never appear in any frontend file.
// It only exists here on the server side, read from .env.local.
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Missing env: PAYSTACK_SECRET_KEY");
}

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface VerifyRequestBody {
  reference:   string; // Paystack transaction reference
  internalRef: string; // Our internal EH reference
}

// ─── ROUTE HANDLER ─────────────────────────────────────────────────────────
// Called by the frontend after Paystack's callback fires.
// We re-verify the transaction with Paystack's API using the secret key
// (which only lives server-side) before trusting the payment.
// This prevents anyone from faking a successful payment on the frontend.
export async function POST(req: NextRequest) {
  try {
    const body: Partial<VerifyRequestBody> = await req.json();

    // Basic input validation
    if (
      typeof body.reference   !== "string" || body.reference.trim().length   === 0 ||
      typeof body.internalRef !== "string" || body.internalRef.trim().length === 0
    ) {
      return NextResponse.json(
        { verified: false, error: "Missing or invalid reference fields" },
        { status: 400 }
      );
    }

    const { reference, internalRef } = body as VerifyRequestBody;

    // ── DEV BYPASS ────────────────────────────────────────────────────────
    // Localhost cannot reliably reach api.paystack.co, so we skip live
    // verification in development. NODE_ENV is automatically "production"
    // on Vercel, so this block never runs after deployment.
    // ⚠️  Remove or comment out this entire block before going live.
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️  DEV MODE: Skipping live Paystack verification — auto-approving:", reference);
      return NextResponse.json({
        verified:    true,
        reference,
        internalRef,
        dev:         true,
      });
    }
    // ── END DEV BYPASS ────────────────────────────────────────────────────

    // Verify with Paystack — the secret key authorises this server-side call
    console.log("Verifying reference with Paystack:", reference);
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method:  "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Paystack response status:", paystackRes.status);

    if (!paystackRes.ok) {
      console.error(`Paystack API error: ${paystackRes.status} ${paystackRes.statusText}`);
      return NextResponse.json(
        { verified: false, error: "Paystack API request failed" },
        { status: 502 }
      );
    }

    const paystackData = await paystackRes.json();

    // Paystack returns status: true and data.status: "success" for confirmed payments
    const txStatus = paystackData?.data?.status;
    const txAmount = paystackData?.data?.amount;   // in kobo
    const txRef    = paystackData?.data?.reference;

    // Validate:
    // 1. Paystack confirms the transaction as "success"
    // 2. Amount matches ₦15,000 (= 1,500,000 kobo)
    // 3. Reference matches what we sent (prevents reference substitution attacks)
    const expectedAmountKobo = 15000 * 100;

    if (
      paystackData.status !== true     ||
      txStatus            !== "success" ||
      txAmount            !== expectedAmountKobo ||
      txRef               !== reference
    ) {
      console.warn("Payment verification failed:", {
        paystackStatus: paystackData.status,
        txStatus,
        txAmount,
        txRef,
        expectedAmountKobo,
        reference,
        internalRef,
      });

      return NextResponse.json(
        {
          verified: false,
          reason:   "Payment not confirmed or amount mismatch",
          txStatus,
        },
        { status: 200 }
      );
    }

    // All checks passed — payment is verified
    console.log(`✅ Payment verified: ${reference} for ${internalRef}`);

    return NextResponse.json({
      verified:   true,
      reference,
      internalRef,
      amountKobo: txAmount,
    });

  } catch (err) {
    console.error("verify-payment route error:", err);
    return NextResponse.json(
      { verified: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}