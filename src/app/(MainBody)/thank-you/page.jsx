import ThankYouContent from "@/Components/Pages/ThankYou";
import { Suspense } from "react";

export const metadata = {
  title: "Thank You | Hardware Box",
  description: "Thank you for reaching out. We have received your submission and will be in touch soon.",
  robots: { index: false, follow: false },
};

const ThankYouPage = () => {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYouPage;
