import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiCloseLine, RiCheckLine, RiSendPlaneLine, RiPhoneLine, RiBuilding4Line, RiUser3Line, RiArchiveLine } from "react-icons/ri";
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
    urgency: "immediate",
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
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!fields.full_name?.trim()) e.full_name = "Full Name is required";
    if (!fields.email?.trim()) e.email = "Business email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email address";
    if (!fields.phone?.trim()) e.phone = "Phone number is required";
    if (!fields.part_number?.trim()) e.part_number = "Part Number/Product is required";
    if (!fields.quantity?.trim() || isNaN(fields.quantity)) e.quantity = "Valid quantity is required";
    return e;
  };

  const handleSetField = (k) => (val) => {
    setFields((p) => ({ ...p, [k]: val }));
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
      else setGlobalErr(res?.data?.message || "Something went wrong. Please check your data.");
    } catch (err) {
      setGlobalErr("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hwb-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="hwb-modal-container">
        {/* Banner across the top if needed, but side-by-side with bg is better */}
        <div className="hwb-modal-top-bar d-lg-none">
          <h3>Bulk Order Inquiry</h3>
          <button className="hwb-close-mobile" onClick={onClose}><RiCloseLine /></button>
        </div>

        <div className="hwb-modal-wrap">
          {/* LEFT PANEL with BACKGROUND BANNER */}
          <div className="hwb-modal-aside">
            <div className="hwb-aside-bg-overlay"></div>
            <div className="hwb-aside-content">
              <div className="hwb-aside-header">
                <span className="hwb-badge">Bulk Advantage</span>
                <h2 className="hwb-aside-title">Enterprise Hardware Solutions</h2>
              </div>
              <ul className="hwb-aside-list">
                <li><RiCheckLine /> High Volume Price Matching</li>
                <li><RiCheckLine /> Global Freight & Logistics</li>
                <li><RiCheckLine /> Pre-Sales Technical Audit</li>
                <li><RiCheckLine /> Extended Product Warranties</li>
              </ul>
              <div className="hwb-aside-footer">
                <div className="hwb-help-pill">
                  <RiPhoneLine />
                  <div>
                    <label>Assistance</label>
                    <strong>+1 (832) 883-5303</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - FORM */}
          <div className="hwb-modal-main">
            <button className="hwb-header-close d-none d-lg-flex" onClick={onClose}><RiCloseLine /></button>

            {submitted ? (
              <div className="hwb-success-view">
                <div className="hwb-success-icon"><RiCheckLine /></div>
                <h3>Request Successful</h3>
                <p>We have received your bulk quote request. One of our procurement specialists will contact you within 2 business hours.</p>
                <button onClick={onClose} className="hwb-btn-primary">Return to Store</button>
              </div>
            ) : (
              <div className="hwb-form-view">
                <div className="hwb-form-intro">
                  <h3>Get a Custom Quote</h3>
                  <p>Submit your requirements below for bulk pricing.</p>
                </div>

                <form className="hwb-form" onSubmit={handleSubmit}>
                  <div className="hwb-grid">
                    <div className="hwb-input-group">
                      <label><RiUser3Line /> Full Name</label>
                      <input type="text" placeholder="John Doe" value={fields.full_name} onChange={e => handleSetField("full_name")(e.target.value)} className={errors.full_name ? 'err' : ''} />
                      {errors.full_name && <span>{errors.full_name}</span>}
                    </div>
                    <div className="hwb-input-group">
                      <label>Business Email</label>
                      <input type="email" placeholder="john@company.com" value={fields.email} onChange={e => handleSetField("email")(e.target.value)} className={errors.email ? 'err' : ''} />
                      {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className="hwb-input-group">
                      <label><RiBuilding4Line /> Organization</label>
                      <input type="text" placeholder="Company Name" value={fields.org_name} onChange={e => handleSetField("org_name")(e.target.value)} />
                    </div>
                    <div className="hwb-input-group">
                      <label><RiPhoneLine /> Phone Number</label>
                      <input type="tel" placeholder="+1..." value={fields.phone} onChange={e => handleSetField("phone")(e.target.value)} className={errors.phone ? 'err' : ''} />
                      {errors.phone && <span>{errors.phone}</span>}
                    </div>
                    <div className="hwb-input-group">
                      <label><RiArchiveLine /> Part Number / Model</label>
                      <input type="text" placeholder="e.g. ST1000LM048" value={fields.part_number} onChange={e => handleSetField("part_number")(e.target.value)} className={errors.part_number ? 'err' : ''} />
                      {errors.part_number && <span>{errors.part_number}</span>}
                    </div>
                    <div className="hwb-input-group">
                      <label>Total Quantity</label>
                      <input type="number" placeholder="50" value={fields.quantity} onChange={e => handleSetField("quantity")(e.target.value)} className={errors.quantity ? 'err' : ''} />
                      {errors.quantity && <span>{errors.quantity}</span>}
                    </div>
                    <div className="hwb-input-group hwb-full">
                      <label>Required Timeline</label>
                      <select value={fields.urgency} onChange={e => handleSetField("urgency")(e.target.value)}>
                        {Object.entries(URGENCY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                    <div className="hwb-input-group hwb-full">
                      <label>Message / Specifications</label>
                      <textarea placeholder="Tell us more about your project needs..." value={fields.description} onChange={e => handleSetField("description")(e.target.value)} />
                    </div>
                  </div>

                  {globalErr && <div className="hwb-alert-err">{globalErr}</div>}

                  <div className="hwb-form-actions">
                    <button type="submit" className="hwb-btn-submit" disabled={loading}>
                      {loading ? <Spinner /> : <>Send Quote Request <RiSendPlaneLine /></>}
                    </button>
                    <p className="hwb-legal">By clicking send, you agree to our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hwb-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);
          z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 15px;
        }
        .hwb-modal-container {
          width: 100%; max-width: 1100px; background: #fff; border-radius: 20px;
          overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.4);
          animation: modal_pop 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
          max-height: 95vh; display: flex; flex-direction: column;
        }
        @keyframes modal_pop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .hwb-modal-wrap { display: flex; flex: 1; min-height: 0; }

        /* ASIDE WITH BANNER */
        .hwb-modal-aside {
          width: 38%; background: #0f172a url('/assets/images/newbannerimg.webp') no-repeat center center;
          background-size: cover; position: relative; color: #fff; display: flex; flex-direction: column;
        }
        .hwb-aside-bg-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85));
        }
        .hwb-aside-content { position: relative; z-index: 2; padding: 50px 40px; display: flex; flex-direction: column; height: 100%; }
        .hwb-badge { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #fb641b; font-weight: 800; margin-bottom: 20px; display: block; }
        .hwb-aside-title { font-size: 28px; font-weight: 900; line-height: 1.2; margin-bottom: 30px; }
        .hwb-aside-list { list-style: none; padding: 0; margin: 0; flex: 1; }
        .hwb-aside-list li { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; font-size: 14px; font-weight: 600; opacity: 0.9; }
        .hwb-aside-list li :global(svg) { color: #fb641b; font-size: 20px; }
        .hwb-help-pill { display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(255, 255, 255, 0.08); border-radius: 12px; margin-top: auto; }
        .hwb-help-pill :global(svg) { font-size: 26px; color: #fb641b; }
        .hwb-help-pill label { display: block; font-size: 10px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin: 0; }
        .hwb-help-pill strong { font-size: 15px; font-weight: 800; letter-spacing: 0.5px; }

        /* MAIN CONTENT - FORM */
        .hwb-modal-main { width: 62%; background: #fff; position: relative; padding: 50px 45px; overflow-y: auto; }
        .hwb-header-close { position: absolute; top: 20px; right: 20px; background: #f8fafc; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #0f172a; cursor: pointer; transition: 0.2s; z-index: 10; }
        .hwb-header-close:hover { background: #fb641b; color: #fff; transform: rotate(90deg); }

        .hwb-form-intro { margin-bottom: 30px; text-align: left; }
        .hwb-form-intro h3 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-align: left; }
        .hwb-form-intro p { font-size: 15px; color: #64748b; text-align: left; }

        .hwb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 25px; }
        .hwb-full { grid-column: span 2; }
        .hwb-input-group { display: flex; flex-direction: column; gap: 6px; position: relative; text-align: left; }
        .hwb-input-group label { font-size: 11px; font-weight: 800; color: #475569; display: flex; align-items: center; gap: 6px; margin: 0; text-align: left; text-transform: uppercase; }
        .hwb-input-group input, .hwb-input-group select, .hwb-input-group textarea {
          border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 11px 14px; font-size: 14px; color: #0f172a;
          background: #fcfdfe; transition: all 0.2s; width: 100%; text-align: left;
        }
        .hwb-input-group input:focus, .hwb-input-group select:focus, .hwb-input-group textarea:focus {
          outline: none; border-color: #fb641b; background: #fff; box-shadow: 0 0 0 4px rgba(251, 100, 27, 0.1);
        }
        .hwb-input-group input.err { border-color: #ef4444; background: #fef2f2; }
        .hwb-input-group span { font-size: 11px; color: #ef4444; font-weight: 700; margin-top: 2px; }
        .hwb-input-group textarea { height: 80px; resize: none; }

        .hwb-alert-err { padding: 12px; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 10px; color: #ef4444; font-size: 13px; text-align: center; margin-top: 15px; }

        .hwb-form-actions { margin-top: 30px; text-align: center; }
        .hwb-btn-submit {
          width: 100%; background: #fb641b; color: #fff; border: none; border-radius: 12px; padding: 16px;
          font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px;
          cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(251, 100, 27, 0.3);
        }
        .hwb-btn-submit:hover:not(:disabled) { background: #e55a18; transform: translateY(-2px); box-shadow: 0 15px 40px rgba(251, 100, 27, 0.4); }
        .hwb-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .hwb-legal { margin-top: 12px; font-size: 11px; color: #94a3b8; }
        .hwb-legal a { color: #fb641b; text-decoration: none; font-weight: 700; }

        .hwb-success-view { text-align: center; padding: 30px 0; }
        .hwb-success-icon { width: 80px; height: 80px; background: #fb641b; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 45px; margin: 0 auto 25px; }
        .hwb-success-view h3 { font-size: 24px; font-weight: 900; color: #0f172a; margin-bottom: 15px; }
        .hwb-success-view p { font-size: 16px; color: #64748b; line-height: 1.5; max-width: 360px; margin: 0 auto 30px; }
        .hwb-btn-primary { background: #0f172a; color: #fff; padding: 14px 40px; border-radius: 12px; border: none; font-size: 15px; font-weight: 800; cursor: pointer; transition: 0.3s; }

        @media (max-width: 900px) {
          .hwb-modal-overlay { padding: 10px; align-items: center; }
          .hwb-modal-container { border-radius: 15px; max-height: 98vh; }
          .hwb-modal-wrap { flex-direction: column; overflow-y: auto; }
          .hwb-modal-aside { 
            width: 100%; 
            background-size: cover;
            padding: 0;
            min-height: 160px; 
          }
          .hwb-aside-content { padding: 30px 20px; }
          .hwb-aside-title { font-size: 22px; margin-bottom: 15px; }
          .hwb-aside-list { display: none; } /* Hide list on mobile to save space */
          .hwb-badge { margin-bottom: 10px; }
          .hwb-help-pill { margin-top: 10px; padding: 10px; }
          
          .hwb-modal-main { width: 100%; padding: 25px 20px; }
          .hwb-grid { grid-template-columns: 1fr; gap: 15px; display: grid !important; }
          .hwb-input-group label { font-size: 11px; }
          .hwb-form-intro h3 { font-size: 20px; margin-bottom: 5px; }
          .hwb-form-intro p { font-size: 14px; }
          .hwb-modal-top-bar { display: none; } /* Use aside content instead */
          .hwb-header-close { top: 15px; right: 15px; width: 35px; height: 35px; background: rgba(255,255,255,0.2); color: #fff; }
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
        className="hwb-trigger-btn"
      >
        Request Bulk Quote
      </button>

      <style jsx>{`
        .hwb-trigger-btn {
          background: var(--theme-color, #ff5050); color: #fff; padding: 14px 32px; border: none;
          border-radius: 10px; font-size: 15px; font-weight: 900; text-transform: uppercase;
          cursor: pointer; letter-spacing: 1px; transition: 0.3s; 
          box-shadow: 0 8px 25px rgba(255, 80, 80, 0.35);
        }
        .hwb-trigger-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 35px rgba(251, 100, 27, 0.5);
          background: #e55a18;
        }
      `}</style>
      <BulkQuoteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BulkQuoteModal;
