// app/api/send-registration-emails/route.ts
//
// Install Resend: npm install resend
// Add to .env.local:
//   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
//   ADMIN_EMAIL=admin@everythinghigh.com   (or wherever you want admin alerts)
//   FROM_EMAIL=noreply@yourdomain.com      (must be a verified Resend sender domain)

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const ADMIN_EMAIL  = process.env.ADMIN_EMAIL  ?? "admin@everythinghigh.com";
const FROM_EMAIL   = process.env.FROM_EMAIL   ?? "noreply@everythinghigh.com";
const BRAND_NAME   = "Everything High Modelling Academy";

interface EmailPayload {
  applicantName: string;
  applicantEmail: string;
  internalRef: string;
  paymentRef: string;
  paymentMethod: string;
  state: string;
  phone: string;
  category: string;
  amount: number;
}

// ─── ADMIN EMAIL HTML ──────────────────────────────────────────────────────
function adminEmailHtml(p: EmailPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Application — ${BRAND_NAME}</title></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8ddd4;">
    <!-- Header -->
    <div style="background:#1a0f0a;padding:28px 32px;display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:#7a3d18;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:700;">EH</div>
      <span style="color:#f5f0eb;font-size:16px;letter-spacing:0.04em;">${BRAND_NAME}</span>
    </div>
    <!-- Top accent -->
    <div style="height:3px;background:linear-gradient(to right,#7a3d18,#b08968);"></div>
    <!-- Body -->
    <div style="padding:32px;">
      <p style="font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#b08968;margin-bottom:12px;font-family:sans-serif;">New Application Received</p>
      <h1 style="font-size:1.6rem;font-weight:400;color:#1a0f0a;margin-bottom:24px;">
        ${p.applicantName}
      </h1>

      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:13px;">
        ${[
          ["Internal Ref",    p.internalRef],
          ["Email",           p.applicantEmail],
          ["Phone",           p.phone],
          ["State",           p.state],
          ["Category",        p.category],
          ["Payment Method",  p.paymentMethod],
          ["Payment Ref",     p.paymentRef],
          ["Amount",          `₦${p.amount.toLocaleString()}`],
        ].map(([k, v]) => `
          <tr>
            <td style="padding:10px 0;color:#9a8880;border-bottom:1px solid #f0ebe6;width:40%;">${k}</td>
            <td style="padding:10px 0;color:#1a0f0a;font-weight:500;border-bottom:1px solid #f0ebe6;">${v}</td>
          </tr>
        `).join("")}
      </table>

      <div style="margin-top:24px;">
        <a href="https://yourdomain.com/admin" style="display:inline-block;background:#3d2210;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-family:sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">
          View in Dashboard →
        </a>
      </div>
    </div>
    <!-- Footer -->
    <div style="padding:20px 32px;background:#faf8f6;border-top:1px solid #e8ddd4;">
      <p style="font-size:11px;color:#b8a49a;font-family:sans-serif;margin:0;">${BRAND_NAME} · Admin Notification · ${new Date().getFullYear()}</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── APPLICANT EMAIL HTML ──────────────────────────────────────────────────
function applicantEmailHtml(p: EmailPayload): string {
  const isPaid = p.paymentMethod.toLowerCase() === "paystack";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Application Received — ${BRAND_NAME}</title></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8ddd4;">
    <!-- Header -->
    <div style="background:#1a0f0a;padding:28px 32px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:0;">
        <div style="width:36px;height:36px;background:#7a3d18;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:700;">EH</div>
        <span style="color:#f5f0eb;font-size:16px;letter-spacing:0.04em;">${BRAND_NAME}</span>
      </div>
    </div>
    <div style="height:3px;background:linear-gradient(to right,#7a3d18,#b08968);"></div>

    <!-- Hero -->
    <div style="padding:40px 32px 32px;text-align:center;background:#faf8f6;border-bottom:1px solid #e8ddd4;">
      <div style="width:56px;height:56px;border-radius:50%;background:#f5ece4;border:2px solid #7a3d18;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">✓</div>
      <h1 style="font-size:1.6rem;font-weight:400;color:#1a0f0a;margin-bottom:8px;">Application Received!</h1>
      <p style="font-size:14px;color:#6b5a50;line-height:1.7;max-width:400px;margin:0 auto;font-family:sans-serif;">
        Dear ${p.applicantName}, thank you for applying to ${BRAND_NAME}. We've received your application and it's currently under review.
      </p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <!-- Ref box -->
      <div style="background:#f5ece4;border:1px solid #c5a98a;border-radius:10px;padding:16px 20px;margin-bottom:24px;text-align:center;">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#b08968;margin-bottom:4px;font-family:sans-serif;">Your Application Reference</p>
        <p style="font-size:1.3rem;color:#3d2210;font-weight:700;font-family:sans-serif;letter-spacing:0.08em;">${p.internalRef}</p>
        <p style="font-size:11px;color:#6b5a50;margin-top:4px;font-family:sans-serif;">Please keep this for your records</p>
      </div>

      <!-- Application summary -->
      <p style="font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#b08968;margin-bottom:14px;font-family:sans-serif;">Application Summary</p>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:13px;margin-bottom:24px;">
        ${[
          ["Full Name",   p.applicantName],
          ["Email",       p.applicantEmail],
          ["Phone",       p.phone],
          ["State",       p.state],
          ["Category",    p.category],
          ["Amount Paid", `₦${p.amount.toLocaleString()}`],
          ["Payment",     p.paymentMethod],
          ...(p.paymentRef !== "Pending (Bank Transfer)" ? [["Payment Ref", p.paymentRef]] : []),
        ].map(([k, v]) => `
          <tr>
            <td style="padding:10px 0;color:#9a8880;border-bottom:1px solid #f0ebe6;width:40%;">${k}</td>
            <td style="padding:10px 0;color:#1a0f0a;font-weight:500;border-bottom:1px solid #f0ebe6;">${v}</td>
          </tr>
        `).join("")}
      </table>

      ${isPaid ? "" : `
      <!-- Bank transfer notice -->
      <div style="background:#fff8e6;border:1px solid #f5a623;border-radius:10px;padding:16px 20px;margin-bottom:24px;font-family:sans-serif;">
        <p style="font-size:12px;font-weight:600;color:#7a5c00;margin-bottom:8px;">⏳ Payment Pending</p>
        <p style="font-size:12px;color:#7a5c00;line-height:1.6;">
          Your application has been saved. Please transfer <strong>₦15,000</strong> to:<br><br>
          <strong>Bank:</strong> Access Bank<br>
          <strong>Account Name:</strong> Blessing Odey<br>
          <strong>Account No:</strong> 1452437529<br><br>
          Use your full name as the transfer reference. Your application will be activated once payment is confirmed.
        </p>
      </div>
      `}

      <!-- What's next -->
      <div style="background:#faf8f6;border-radius:10px;padding:20px;border:1px solid #e8ddd4;margin-bottom:24px;font-family:sans-serif;">
        <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#b08968;margin-bottom:12px;">What Happens Next</p>
        ${[
          ["Our team reviews your application", "We evaluate each candidate for potential, readiness, and category fit."],
          ["You'll hear from us", "Selected applicants are contacted within 5 business days via email or phone."],
          ["Onboarding", "Successful applicants will receive next steps and programme details."],
        ].map(([title, desc], i) => `
          <div style="display:flex;gap:12px;margin-bottom:${i < 2 ? "14px" : "0"};">
            <div style="width:24px;height:24px;border-radius:50%;background:#3d2210;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">${i + 1}</div>
            <div>
              <p style="font-size:13px;font-weight:600;color:#1a0f0a;margin-bottom:2px;">${title}</p>
              <p style="font-size:12px;color:#6b5a50;line-height:1.5;">${desc}</p>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- CTA -->
      <p style="font-size:13px;color:#6b5a50;font-family:sans-serif;text-align:center;margin-bottom:16px;">
        Follow us on Instagram for updates
      </p>
      <div style="text-align:center;">
        <a href="https://instagram.com/everythinghigh" style="display:inline-block;background:#3d2210;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-family:sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">
          @EverythingHigh →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;background:#faf8f6;border-top:1px solid #e8ddd4;text-align:center;">
      <p style="font-size:11px;color:#b8a49a;font-family:sans-serif;margin:0 0 4px;">
        ${BRAND_NAME}
      </p>
      <p style="font-size:11px;color:#b8a49a;font-family:sans-serif;margin:0;">
        If you didn't submit this application, please ignore this email.
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── ROUTE HANDLER ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const payload: EmailPayload = await req.json();

    const { applicantName, applicantEmail, internalRef } = payload;

    if (!applicantEmail || !internalRef) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send both emails in parallel
    const [adminResult, applicantResult] = await Promise.allSettled([
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      ADMIN_EMAIL,
        subject: `New Application: ${applicantName} (${internalRef})`,
        html:    adminEmailHtml(payload),
      }),
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      applicantEmail,
        subject: `Application Received — ${internalRef} | ${BRAND_NAME}`,
        html:    applicantEmailHtml(payload),
      }),
    ]);

    // Log any failures but don't throw — emails are non-critical
    if (adminResult.status === "rejected") {
      console.error("Admin email failed:", adminResult.reason);
    }
    if (applicantResult.status === "rejected") {
      console.error("Applicant email failed:", applicantResult.reason);
    }

    return NextResponse.json({
      success: true,
      admin:     adminResult.status,
      applicant: applicantResult.status,
    });

  } catch (err) {
    console.error("Email route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}