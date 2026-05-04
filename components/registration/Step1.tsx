"use client";

export default function Step1({ data, set, S, NIGERIAN_STATES }: any) {
  return (
    <>
      <p style={S.stepTag}>Step 1</p>
      <h2 style={S.stepHeading}>Personal Info</h2>

      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Full Name *</label>
          <input
            style={S.input}
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => set("fullName", e.target.value)}
          />
        </div>

        <div style={S.field}>
          <label style={S.label}>Email Address *</label>
          <input
            style={S.input}
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Phone Number *</label>
          <input
            style={S.input}
            placeholder="+234 000 000 0000"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>

        <div style={S.field}>
          <label style={S.label}>Date of Birth *</label>
          <input
            style={S.input}
            type="date"
            value={data.dob}
            onChange={(e) => set("dob", e.target.value)}
          />
        </div>
      </div>

      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Gender *</label>
          <select
            style={S.select}
            value={data.gender}
            onChange={(e) => set("gender", e.target.value)}
          >
            <option value="">Select gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div style={S.field}>
          <label style={S.label}>Nationality</label>
          <input
            style={S.input}
            placeholder="e.g. Nigerian"
            value={data.nationality}
            onChange={(e) => set("nationality", e.target.value)}
          />
        </div>
      </div>

      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>State *</label>
          <select
            style={S.select}
            value={data.state}
            onChange={(e) => set("state", e.target.value)}
          >
            <option value="">Select state</option>
            {NIGERIAN_STATES.map((s: string) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={S.field}>
          <label style={S.label}>Instagram Handle</label>
          <input
            style={S.input}
            placeholder="@yourhandle"
            value={data.instagram}
            onChange={(e) => set("instagram", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}