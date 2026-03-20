import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiCloseLine, RiCheckLine, RiSendPlaneLine, RiPhoneLine } from "react-icons/ri";
import { BulkQuoteAPI } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";

// Simple Spinner Element
const Spinner = () => (
  <div style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderRadius: "50%", borderTopColor: "#fff", animation: "spin 0.6s linear infinite" }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const URGENCY_LABELS = {
  immediate: "Immediately",
  within_week: "Within 1 Week",
  within_month: "Within 1 Month",
  future: "Sourcing for future",
};

const BulkQuoteModal = ({ open, onClose }) => {
  const [fields, setFields] = useState({
    full_name: "",
    org_name: "",
    email: "",
    phone: "",
    part_number: "",
    quantity: "",
    urgency: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalErr, setGlobalErr] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setFields({ ...fields, urgency: "immediate" });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!fields.full_name.trim()) e.full_name = "Required";
    if (!fields.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid";
    if (!fields.phone.trim()) e.phone = "Required";
    if (!fields.part_number.trim()) e.part_number = "Required";
    if (!fields.quantity.trim()) e.quantity = "Required";
    return e;
  };

  const set = (k) => (e) => {
    setFields((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setGlobalErr("");
    try {
      const res = await request({
        url: BulkQuoteAPI,
        method: "POST",
        data: fields,
      });
      if (res?.status === 200 || res?.status === 201) setSubmitted(true);
      else setGlobalErr(res?.data?.message || "Integration error. Please try again.");
    } catch (err) {
      setGlobalErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const F = ({ name, label, type = "text", placeholder = "", span = false }) => (
    <div className={`bqm-field ${span ? 'bqm-span' : ''}`}>
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
    <div className="bqm-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bqm-dialog" role="dialog" aria-modal="true">
        
        {/* LEFT: Branding/Trust */}
        <div className="bqm-side-brand">
          <div className="bqm-brand-inner">
            <span className="bqm-top-tag">Hardware Box Advantage</span>
            <h2 className="bqm-heading">Enterprise IT Sourcing Simplified</h2>
            <p className="bqm-subline">Get specialized pricing for bulk orders of servers, networking gear, and workstations.</p>
            
            <ul className="bqm-features">
              <li><RiCheckLine /> Wholesale Pricing across all SKUs</li>
              <li><RiCheckLine /> Global Shipping within 48 Hours</li>
              <li><RiCheckLine /> Assigned Procurement Account Manager</li>
              <li><RiCheckLine /> Net 30 Terms available for Corporate</li>
            </ul>

            <div className="bqm-contact-box mt-auto">
              <div className="bqm-phone-link">
                <RiPhoneLine className="text-orange" />
                <div>
                  <small>Human Support</small>
                  <span>+1 (833) 883-5303</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="bqm-side-form">
          <button className="bqm-btn-close" onClick={onClose}><RiCloseLine /></button>
          
          {submitted ? (
            <div className="bqm-success-state">
              <div className="bqm-check-circle"><RiCheckLine /></div>
              <h3>Quote Request Sent!</h3>
              <p>Our specialists are reviewing your request. Expect a custom quote via email within 2 business hours.</p>
              <button onClick={onClose} className="bqm-btn-done">Proceed to Store</button>
            </div>
          ) : (
            <div className="bqm-form-container">
              <div className="bqm-form-header">
                <h3>Request a Bulk Quote</h3>
                <p>Fill out the details below for volume discounts.</p>
              </div>

              <form onSubmit={handleSubmit} className="bqm-actual-form">
                <div className="bqm-form-grid">
                  <F name="full_name" label="Full Name *" placeholder="Your name" />
                  <F name="email" label="Business Email *" type="email" placeholder="name@company.com" />
                  <F name="org_name" label="Organization" placeholder="Acme Inc." />
                  <F name="phone" label="Phone Number *" type="tel" placeholder="+1 (..." />
                  <F name="part_number" label="Part Number / Product *" placeholder="e.g. SSD-001" />
                  <F name="quantity" label="Total Quantity *" type="number" placeholder="e.g. 100" />
                  
                  <div className="bqm-field bqm-span">
                    <label className="bqm-label">Timeline Required</label>
                    <select value={fields.urgency} onChange={set("urgency")} className="bqm-select">
                      {Object.entries(URGENCY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>

                  <div className="bqm-field bqm-span">
                    <label className="bqm-label">Project Details / Custom Requests</label>
                    <textarea 
                      value={fields.description} onChange={set("description")} 
                      className="bqm-textarea" 
                      placeholder="List any alternatives you'd consider or extra specs..."
                    />
                  </div>
                </div>

                {globalErr && <div className="bqm-error-strip">{globalErr}</div>}

                <div className="bqm-form-footer">
                  <button type="submit" className="bqm-btn-submit" disabled={loading}>
                    {loading ? <><Spinner /> Sending...</> : <>Send Quote Request <RiSendPlaneLine style={{ marginLeft: 8 }} /></>}
                  </button>
                  <p className="bqm-privacy-note">By submitting, you agree to our <Link href="/privacy-policy">Terms & Conditions</Link>.</p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bqm-backdrop {
          position: fixed; top:0; left:0; width:100%; height:100%;
          background: rgba(15, 19, 64, 0.45); backdrop-filter: blur(4px);
          z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .bqm-dialog {
          width: 100%; max-width: 900px; height: 600px; display: flex;
          background: #fff; border-radius: 20px; overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: bqmFadeIn 0.3s cubic-bezier(0, 0.5, 0.5, 1);
        }
        @keyframes bqmFadeIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .bqm-side-brand {
          width: 38%; background: #0f1340; color: #fff; padding: 50px 40px;
          display: flex; flex-direction: column; position: relative;
        }
        .bqm-top-tag { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #fb641b; font-weight: 800; margin-bottom: 20px; display: block; }
        .bqm-heading { font-size: 28px; font-weight: 800; line-height: 1.25; margin-bottom: 15px; }
        .bqm-subline { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 30px; line-height: 1.6; }
        .bqm-features { list-style: none; padding:0; margin:0; }
        .bqm-features li { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; font-size: 14px; font-weight: 500; }
        .bqm-features li :global(svg) { color: #fb641b; font-size: 18px; }
        .bqm-phone-link { display: flex; align-items: center; gap: 14px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 12px; }
        .bqm-phone-link span { display: block; font-size: 16px; font-weight: 700; }
        .bqm-phone-link small { display: block; font-size: 11px; opacity: 0.6; text-transform: uppercase; }
        .text-orange { color: #fb641b; font-size: 24px; }

        .bqm-side-form { width: 62%; position: relative; background: #fff; padding: 40px 50px; }
        .bqm-btn-close { position: absolute; top: 20px; right: 20px; border:none; background:none; font-size: 26px; cursor:pointer; color: #999; }
        .bqm-form-header { margin-bottom: 25px; }
        .bqm-form-header h3 { font-size: 22px; font-weight: 800; color: #0f1340; margin-bottom: 4px; }
        .bqm-form-header p { font-size: 14px; color: #666; }
        
        .bqm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 22px; }
        .bqm-span { grid-column: span 2; }
        .bqm-field { display: flex; flex-direction: column; gap: 6px; }
        .bqm-label { font-size: 12px; font-weight: 700; color: #444; text-transform: uppercase; letter-spacing: 0.4px; }
        .bqm-input, .bqm-select, .bqm-textarea {
          padding: 10px 14px; border: 1.5px solid #eee; border-radius: 8px; font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s; background: #fdfdfd;
        }
        .bqm-input:focus, .bqm-select:focus, .bqm-textarea:focus { outline: none; border-color: #0f1340; box-shadow: 0 0 0 3px rgba(15,19,64,0.05); }
        .bqm-input.err { border-color: #ff4d4f; background: #fff2f0; }
        .bqm-err-msg { font-size: 11px; color: #ff4d4f; font-weight: 600; }
        .bqm-textarea { height: 74px; resize: none; }
        .bqm-btn-submit {
          width: 100%; border:none; background: #fb641b; color: #fff; font-weight: 800; font-size: 15px;
          padding: 14px; border-radius: 10px; cursor:pointer; transition: transform 0.15s, opacity 0.2s;
          display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(251, 100, 27, 0.3);
        }
        .bqm-btn-submit:hover:not(:disabled) { transform: translateY(-2px); opacity: 0.95; }
        .bqm-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .bqm-error-strip { background: #fff2f0; border: 1px solid #ffccc7; color: #ff4d4f; padding: 10px; border-radius: 8px; font-size: 13px; margin-bottom: 12px; text-align: center; }
        .bqm-privacy-note { font-size: 11px; color: #999; text-align: center; margin-top: 14px; }
        .bqm-privacy-note a { color: #0f1340; font-weight: 600; text-decoration: none; }

        .bqm-success-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .bqm-check-circle { width: 70px; height: 70px; background: #fb641b; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin-bottom: 24px; box-shadow: 0 10px 25px rgba(251, 100, 27, 0.3); }
        .bqm-success-state h3 { font-size: 24px; font-weight: 800; color: #0f1340; margin-bottom: 10px; }
        .bqm-success-state p { font-size: 15px; color: #555; line-height: 1.6; max-width: 320px; margin-bottom: 30px; }
        .bqm-btn-done { background: #0f1340; color: #fff; border:none; padding: 12px 40px; border-radius: 10px; font-weight: 700; cursor:pointer; }

        @media (max-width: 850px) {
          .bqm-dialog { height: auto; max-height: 90vh; flex-direction: column; overflow-y: auto; }
          .bqm-side-brand { width: 100%; padding: 40px 30px 20px; }
          .bqm-side-form { width: 100%; padding: 30px; }
          .bqm-form-grid { grid-template-columns: 1fr; gap: 14px; }
          .bqm-span { grid-column: span 1; }
        }
      `}</style>
    </div>
  );
};

export const BulkQuoteButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button" onClick={() => setOpen(true)}
        className="btn fw-extrabold"
        style={{
          backgroundColor: "#fb641b", color: "#fff", padding: "12px 28px",
          borderRadius: "8px", border: "none", textTransform: "uppercase",
          fontSize: "14px", cursor: "pointer", letterSpacing: "0.8px",
          transition: "all 0.2s", boxShadow: "0 4px 15px rgba(251, 100, 27, 0.3)"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(251, 100, 27, 0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(251, 100, 27, 0.3)"; }}
      >
        Request Bulk Quote
      </button>
      <BulkQuoteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BulkQuoteModal;
