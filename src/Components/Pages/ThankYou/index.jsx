"use client";

import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RiCheckLine, RiHome4Line, RiMailLine, RiShoppingBag3Line } from "react-icons/ri";
import "./ThankYou.css";

const MESSAGES = {
  default: {
    title: "Thank You!",
    subtitle: "Your submission has been received successfully.",
    description: "We appreciate you reaching out. Our team will review your message and get back to you as soon as possible.",
  },
  contact: {
    title: "Message Sent!",
    subtitle: "Thank you for contacting us.",
    description: "We have received your message and one of our team members will respond within 1–2 business days.",
  },
  quote: {
    title: "Quote Request Received!",
    subtitle: "Thank you for your bulk quote inquiry.",
    description: "Our procurement team has received your request and will contact you shortly with pricing details.",
  },
  order: {
    title: "Order Confirmed!",
    subtitle: "Thank you for your purchase.",
    description: "Your order has been placed successfully. You will receive a confirmation email with order details shortly.",
  },
};

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "default";
  const content = MESSAGES[from] || MESSAGES.default;

  return (
    <>
      <Breadcrumbs subNavigation={[{ name: "Thank You" }]} />
      <section className="thankyou-page">
        <div className="container">
          <div className="thankyou-card">
            <div className="thankyou-icon">
              <RiCheckLine />
            </div>
            <h1 className="thankyou-title">{content.title}</h1>
            <p className="thankyou-subtitle">{content.subtitle}</p>
            <p className="thankyou-description">{content.description}</p>

            <div className="thankyou-actions">
              <Link href="/" className="thankyou-btn thankyou-btn-primary">
                <RiHome4Line />
                Back to Home
              </Link>
              <Link href="/collections" className="thankyou-btn thankyou-btn-outline">
                <RiShoppingBag3Line />
                Continue Shopping
              </Link>
              {from !== "contact" && (
                <Link href="/contact-us" className="thankyou-btn thankyou-btn-outline">
                  <RiMailLine />
                  Contact Us
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouContent;
