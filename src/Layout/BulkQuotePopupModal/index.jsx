"use client";

import SettingContext from "@/Context/SettingContext";
import { BulkQuoteAPI } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import { getRecaptchaConfig, recaptchaRequiredMessage } from "@/Utils/CustomFunctions/RecaptchaUtils";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import RecaptchaField from "@/Components/Widgets/RecaptchaField";
import Cookies from "js-cookie";
import { useContext, useEffect, useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const BulkQuotePopupModal = () => {
  const { settingData } = useContext(SettingContext);
  const reCaptchaRef = useRef();
  const { enabled: recaptchaEnabled } = getRecaptchaConfig(settingData);
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    full_name: "",
    email: "",
    phone: "",
    part_number: "",
    quantity: "",
    recaptcha: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeenPopup = Cookies.get("bulk_quote_popup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    Cookies.set("bulk_quote_popup", "true", { expires: 30 });
    setIsOpen(false);
  };

  const validate = () => {
    const e = {};
    if (!fields.full_name?.trim()) e.full_name = "Full Name is required";
    if (!fields.email?.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email address";
    if (!fields.phone?.trim()) e.phone = "Phone is required";
    if (!fields.part_number?.trim()) e.part_number = "Part # is required";
    if (!fields.quantity?.trim() || isNaN(fields.quantity)) e.quantity = "Valid quantity is required";
    if (recaptchaEnabled && !fields.recaptcha) e.recaptcha = recaptchaRequiredMessage;
    return e;
  };

  const handleChange = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await request({
        url: BulkQuoteAPI,
        method: "POST",
        data: { ...fields, urgency: "immediate" },
      });
      if (res?.status === 200 || res?.status === 201) {
        ToastNotification("success", "Your bulk quote request has been submitted successfully.");
        handleClose();
        setFields({ full_name: "", email: "", phone: "", part_number: "", quantity: "", recaptcha: "" });
        reCaptchaRef.current?.reset();
      } else {
        ToastNotification("error", res?.data?.message || "Something went wrong. Please try again.");
      }
    } catch {
      ToastNotification("error", "Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bulk-quote-popup-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="bulk-quote-popup">
        <button type="button" className="bulk-quote-popup__close" onClick={handleClose} aria-label="Close">
          <RiCloseLine />
        </button>

        <h2 className="bulk-quote-popup__title">REQUEST BULK QUOTE</h2>
        <p className="bulk-quote-popup__subtitle">
          We accept purchase orders from all business entities, corporations, school systems (private &amp; public),
          government agencies, colleges, universities, and libraries.
        </p>

        <form className="bulk-quote-popup__form" onSubmit={handleSubmit}>
          <div className="bulk-quote-popup__field">
            <input
              type="text"
              placeholder="Full Name"
              value={fields.full_name}
              onChange={handleChange("full_name")}
              className={errors.full_name ? "is-invalid" : ""}
            />
            {errors.full_name && <span className="bulk-quote-popup__error">{errors.full_name}</span>}
          </div>

          <div className="bulk-quote-popup__field">
            <input
              type="email"
              placeholder="Email"
              value={fields.email}
              onChange={handleChange("email")}
              className={errors.email ? "is-invalid" : ""}
            />
            {errors.email && <span className="bulk-quote-popup__error">{errors.email}</span>}
          </div>

          <div className="bulk-quote-popup__field">
            <input
              type="tel"
              placeholder="Phone"
              value={fields.phone}
              onChange={handleChange("phone")}
              className={errors.phone ? "is-invalid" : ""}
            />
            {errors.phone && <span className="bulk-quote-popup__error">{errors.phone}</span>}
          </div>

          <div className="bulk-quote-popup__field">
            <input
              type="text"
              placeholder="Part #"
              value={fields.part_number}
              onChange={handleChange("part_number")}
              className={errors.part_number ? "is-invalid" : ""}
            />
            {errors.part_number && <span className="bulk-quote-popup__error">{errors.part_number}</span>}
          </div>

          <div className="bulk-quote-popup__field">
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              value={fields.quantity}
              onChange={handleChange("quantity")}
              className={errors.quantity ? "is-invalid" : ""}
            />
            {errors.quantity && <span className="bulk-quote-popup__error">{errors.quantity}</span>}
          </div>

          <RecaptchaField
            ref={reCaptchaRef}
            className="bulk-quote-popup__recaptcha"
            error={errors.recaptcha}
            onChange={(token) => {
              setFields((prev) => ({ ...prev, recaptcha: token }));
              setErrors((prev) => ({ ...prev, recaptcha: "" }));
            }}
          />

          <button type="submit" className="bulk-quote-popup__submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .bulk-quote-popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.55);
        }

        .bulk-quote-popup {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: #f5f5f5;
          border-radius: 12px;
          padding: 32px 28px 28px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          animation: bulkQuotePopIn 0.35s ease;
        }

        @keyframes bulkQuotePopIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .bulk-quote-popup__close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: 22px;
          color: #222;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
        }

        .bulk-quote-popup__title {
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #111;
          margin: 0 0 12px;
          padding-right: 24px;
        }

        .bulk-quote-popup__subtitle {
          text-align: center;
          font-size: 13px;
          line-height: 1.55;
          color: #555;
          margin: 0 0 22px;
        }

        .bulk-quote-popup__form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bulk-quote-popup__field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bulk-quote-popup__field input {
          width: 100%;
          padding: 11px 14px;
          font-size: 14px;
          color: #222;
          background: #fff;
          border: 1px solid #c5d4e8;
          border-radius: 6px;
          outline: none;
          transition: border-color 0.2s;
        }

        .bulk-quote-popup__field input:focus {
          border-color: #ff5050;
        }

        .bulk-quote-popup__field input.is-invalid {
          border-color: #ef4444;
        }

        .bulk-quote-popup__error {
          font-size: 11px;
          color: #ef4444;
          font-weight: 600;
        }

        .bulk-quote-popup :global(.bulk-quote-popup__recaptcha) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .bulk-quote-popup :global(.bulk-quote-popup__recaptcha iframe) {
          max-width: 100%;
        }

        .bulk-quote-popup__submit {
          width: 100%;
          margin-top: 6px;
          padding: 13px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          background: #ff5050;
          border: 1px solid #ff5050;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }

        .bulk-quote-popup__submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .bulk-quote-popup__submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BulkQuotePopupModal;
