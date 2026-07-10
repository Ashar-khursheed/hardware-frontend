import NotFoundPageWrapper from "@/Components/Pages/404/NotFoundPageWrapper";
import MainLayout from "@/Layout";

export const metadata = {
  title: "404 - Page Not Found",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <MainLayout>
      <NotFoundPageWrapper />
    </MainLayout>
  );
}
