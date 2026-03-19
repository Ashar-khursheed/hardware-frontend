"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import request from "@/Utils/AxiosUtils";
import { BulkQuoteAPI } from "@/Utils/AxiosUtils/API";

/* ─── Styles injected once ─── */
const STYLE_ID = "bulk-quote-modal-styles";
const css = `
.bqm-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(3px);
  z-index: 9998;
  display: flex; align-items: center; justify-content: center;
  animation: bqmFadeIn .2s ease;
}
@keyframes bqmFadeIn { from { opacity:0 } to { opacity:1 } }

.bqm-dialog {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 860px;
  max-height: 92vh;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  box-shadow: 0 24px 60px rgba(0,0,0,0.22);
  animation: bqmSlideUp .25s cubic-bezier(.4,0,.2,1);
}
@keyframes bqmSlideUp { from { transform:translateY(40px); opacity:0} to { transform:translateY(0); opacity:1 } }

.bqm-left {
  width: 300px;
  min-width: 260px;
  background: linear-gradient(160deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.bqm-left::before {
  content:''; position:absolute; top:-60px; right:-60px;
  width:200px; height:200px; border-radius:50%;
  background:rgba(255,102,0,0.12);
}
.bqm-left::after {
  content:''; position:absolute; bottom:-70px; left:-40px;
  width:240px; height:240px; border-radius:50%;
  background:rgba(255,102,0,0.08);
}
.bqm-badge {
  display:inline-flex; align-items:center; gap:6px;
  background:rgba(255,102,0,0.18); border:1px solid rgba(255,102,0,0.35);
  color:#ff6600; font-size:11px; font-weight:700; letter-spacing:1px;
  padding:5px 12px; border-radius:20px; text-transform:uppercase;
  width:fit-content; margin-bottom:20px;
}
.bqm-left h2 { font-size:21px; font-weight:800; line-height:1.35; margin-bottom:12px; }
.bqm-left p  { font-size:13px; color:rgba(255,255,255,0.7); line-height:1.65; }
.bqm-perks   { list-style:none; padding:0; margin:20px 0 0; }
.bqm-perks li {
  display:flex; align-items:center; gap:10px;
  font-size:13px; color:rgba(255,255,255,0.85); margin-bottom:11px;
}
.bqm-perk-dot {
  width:22px; height:22px; border-radius:50%;
  background:rgba(255,102,0,0.25); border:1px solid rgba(255,102,0,0.5);
  display:flex; align-items:center; justify-content:center;
  font-size:11px; font-weight:900; color:#ff6600; flex-shrink:0;
}
.bqm-phone {
  margin-top:28px; display:flex; align-items:center; gap:10px;
  background:rgba(255,255,255,0.07); border-radius:10px; padding:12px 14px;
}
.bqm-phone span { font-size:11px; color:rgba(255,255,255,0.55); display:block; }
.bqm-phone strong { font-size:14px; color:#fff; }

.bqm-right { flex:1; padding:32px 32px 28px; position:relative; overflow-y:auto; }
.bqm-right h3 { font-size:21px; font-weight:800; color:#1a1a2e; margin-bottom:4px; }
.bqm-sub { font-size:13px; color:#999; margin-bottom:22px; }

.bqm-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
.bqm-span { grid-column:1/-1; }

.bqm-field { display:flex; flex-direction:column; }
.bqm-label { font-size:11px; font-weight:700; color:#666; letter-spacing:.5px; text-transform:uppercase; margin-bottom:4px; }
.bqm-input, .bqm-select, .bqm-textarea {
  border:1.5px solid #e2e8f0; border-radius:8px; padding:9px 13px;
  font-size:14px; color:#1a1a2e; outline:none;
  transition:border-color .18s, box-shadow .18s;
  background:#fafbfc; width:100%;
}
.bqm-input:focus, .bqm-select:focus, .bqm-textarea:focus {
  border-color:#ff6600; box-shadow:0 0 0 3px rgba(255,102,0,0.11); background:#fff;
}
.bqm-input.err, .bqm-select.err, .bqm-textarea.err { border-color:#e53e3e; }
.bqm-textarea { resize:vertical; min-height:76px; }
.bqm-err-msg { font-size:11px; color:#e53e3e; margin-top:3px; }

.bqm-global-err {
  background:#fff5f5; border:1px solid #feb2b2; border-radius:8px;
  padding:10px 14px; font-size:13px; color:#c53030; margin-bottom:12px;
}
.bqm-submit {
  width:100%; padding:13px;
  background:linear-gradient(135deg,#ff6600,#e65500);
  color:#fff; font-size:15px; font-weight:700;
  border:none; border-radius:10px; cursor:pointer;
  letter-spacing:.4px; margin-top:4px;
  transition:opacity .18s, transform .15s;
  display:flex; align-items:center; justify-content:center; gap:8px;
}
.bqm-submit:hover:not(:disabled) { opacity:.91; transform:translateY(-1px); }
.bqm-submit:disabled { opacity:.6; cursor:not-allowed; }
.bqm-note { text-align:center; font-size:11px; color:#bbb; margin-top:10px; margin-bottom:0; }

.bqm-close {
  position:absolute; top:14px; right:14px;
  background:none; border:none; cursor:pointer;
  color:#aaa; font-size:20px; line-height:1;
  padding:4px 8px; border-radius:6px;
  transition:color .15s, background .15s;
}
.bqm-close:hover { color:#333; background:#f0f0f0; }

.bqm-success {
  display:flex; flex-direction:column; align-items:center;
  justify-content:center; padding:56px 36px; text-align:center;
}
.bqm-success-icon {
  width:68px; height:68px; border-radius:50%;
  background:linear-gradient(135deg,#ff6600,#e65500);
  display:flex; align-items:center; justify-content:center; margin-bottom:18px;
}
.bqm-success h4 { font-size:21px; font-weight:800; color:#1a1a2e; margin-bottom:8px; }
.bqm-success p  { font-size:14px; color:#777; max-width:320px; line-height:1.65; }

@media(max-width:640px) {
  .bqm-dialog  { flex-direction:column; max-width:98vw; border-radius:12px; }
  .bqm-left    { width:100%; min-width:unset; padding:26px 22px; }
  .bqm-right   { padding:22px; }
  .bqm-grid    { grid-template-columns:1fr; }
}
`;

function injectStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = css;
  document.head.appendChild(s);
}

/* ─── Spinner SVG ─── */
const Spinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "bqmSpin 1s linear infinite" }}>
    <style>{`@keyframes bqmSpin{to{transform:rotate(360deg)}}`}</style>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
  </svg>
);

const URGENCY_LABELS = {
  asap:     "ASAP (1–3 days)",
  week:     "Within a week",
  month:    "Within a month",
  flexible: "Flexible",
};

/* ════════════════════════════════════════
   BULK QUOTE MODAL
════════════════════════════════════════ */
const BulkQuoteModal = ({ open, onClose }) => {
  const EMPTY = { full_name: "", org_name: "", email: "", phone: "", part_number: "", quantity: "", urgency: "", description: "" };
  const [fields, setFields]     = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalErr, setGlobalErr] = useState("");

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    if (open) { setFields(EMPTY); setErrors({}); setSubmitted(false); setGlobalErr(""); }
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  /* Validation */
  const validate = () => {
    const e = {};
    if (!fields.full_name.trim())    e.full_name    = "Full name is required.";
    if (!fields.email.trim())        e.email        = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email.";
    if (!fields.phone.trim())        e.phone        = "Phone is required.";
    if (!fields.part_number.trim())  e.part_number  = "Part # / Product is required.";
    if (!fields.quantity.trim())     e.quantity     = "Quantity is required.";
    return e;
  };

  const set = (k) => (e) => {
    setFields((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  /* Submit → Laravel API */
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setGlobalErr("");
    try {
      const res = await request({
        url:    BulkQuoteAPI,   // "/bulk-quote"  →  your Laravel route
        method: "POST",
        data:   fields,
      });
      // Laravel returns 200/201 on success
      if (res?.status === 200 || res?.status === 201) {
        setSubmitted(true);
      } else {
        const msg = res?.data?.message || "Something went wrong. Please try again.";
        setGlobalErr(msg);
      }
    } catch (err) {
      setGlobalErr("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Reusable field renderer */
  const F = ({ name, label, type = "text", placeholder = "" }) => (
    <div className="bqm-field">
      <label className="bqm-label">{label}</label>
      <input
        type={type} value={fields[name]} onChange={set(name)}
        placeholder={placeholder}
        className={`bqm-input${errors[name] ? " err" : ""}`}
      />
      {errors[name] && <span className="bqm-err-msg">{errors[name]}</span>}
    </div>
  );

  return (
    <div
      className="bqm-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bqm-dialog" role="dialog" aria-modal="true" aria-label="Request Bulk Quote">

        {/* ── LEFT PANEL ── */}
        <div className="bqm-left">
          <div>
            <div className="bqm-badge">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#ff6600"><circle cx="4" cy="4" r="4"/></svg>
              Bulk Pricing Available
            </div>
            <h2>Get the Best Price on Bulk IT Hardware</h2>
            <p>Fill out the form and our procurement specialists will respond within 2 business hours with a competitive quote.</p>
            <ul className="bqm-perks">
              {[
                "Volume discounts on all major brands",
                "SAM registered — Government POs welcome",
                "Genuine & refurbished options available",
                "Fast, tracked worldwide shipping",
              ].map((t, i) => (
                <li key={i}>
                  <span className="bqm-perk-dot">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bqm-phone">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.44 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.61a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
            </svg>
            <div>
              <span>Speak to a specialist</span>
              <strong>+1 (855) 483-7810</strong>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="bqm-right">
          <button className="bqm-close" onClick={onClose} aria-label="Close">✕</button>

          {submitted ? (
            /* SUCCESS STATE */
            <div className="bqm-success">
              <div className="bqm-success-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4>Quote Request Received!</h4>
              <p>
                Thank you, <strong>{fields.full_name}</strong>. A confirmation has been sent to{" "}
                <strong>{fields.email}</strong>. Our team will reach out within 2 business hours.
              </p>
              <button
                onClick={onClose}
                style={{ marginTop: 22, padding: "10px 30px", background: "#ff6600", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
              >
                Done
              </button>
            </div>
          ) : (
            /* FORM STATE */
            <>
              <h3>Request Bulk Quote</h3>
              <p className="bqm-sub">Fill in your details — we'll respond with a custom price within hours.</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="bqm-grid">
                  <F name="full_name"   label="Full Name *"           placeholder="John Smith" />
                  <F name="org_name"    label="Organization Name"     placeholder="Acme Corp" />
                  <F name="email"       label="Email *"  type="email" placeholder="john@company.com" />
                  <F name="phone"       label="Phone *"  type="tel"   placeholder="+1 (555) 000-0000" />
                  <F name="part_number" label="Part # / Product *"    placeholder="e.g. 881457-B21" />
                  <F name="quantity"    label="Quantity *" type="number" placeholder="e.g. 50" />

                  {/* Urgency — full width */}
                  <div className="bqm-field bqm-span">
                    <label className="bqm-label">How Soon Do You Need It?</label>
                    <select value={fields.urgency} onChange={set("urgency")} className="bqm-select">
                      <option value="">— Select Timeframe —</option>
                      {Object.entries(URGENCY_LABELS).map(([val, lbl]) => (
                        <option key={val} value={val}>{lbl}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description — full width */}
                  <div className="bqm-field bqm-span">
                    <label className="bqm-label">Description / Additional Notes</label>
                    <textarea
                      value={fields.description} onChange={set("description")}
                      className="bqm-textarea"
                      placeholder="Any specs, alternatives you'd consider, or special requirements…"
                    />
                  </div>
                </div>

                {globalErr && <div className="bqm-global-err">{globalErr}</div>}

                <button type="submit" className="bqm-submit" disabled={loading}>
                  {loading ? <><Spinner /> Submitting…</> : "Submit Quote Request"}
                </button>

                <p className="bqm-note">
                  By submitting you agree to our{" "}
                  <Link href="/privacy-policy" style={{ color: "#ff6600" }}>Privacy Policy</Link>.
                  We never share your information.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   BUTTON — used in the homepage banner
════════════════════════════════════════ */
export const BulkQuoteButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn fw-bold"
        style={{
          backgroundColor: "#ff6600",
          color: "#fff",
          padding: "12px 22px",
          borderRadius: "4px",
          border: "none",
          textTransform: "uppercase",
          fontSize: "14px",
          cursor: "pointer",
          letterSpacing: "0.5px",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Request Bulk Quote
      </button>
      <BulkQuoteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BulkQuoteModal;
