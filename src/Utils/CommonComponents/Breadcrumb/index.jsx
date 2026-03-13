import { Href } from "@/Utils/Constants";
import { useTranslation } from "react-i18next";
import { Breadcrumb, Container } from "reactstrap";
import { useEffect, useState } from "react";
import Link from "next/link";

const Breadcrumbs = ({ subNavigation, title }) => {
  const { t } = useTranslation("common");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="breadcrumb-section py-3 bg-light border-bottom">
      <Container>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
            <li className="breadcrumb-item">
              <Link href="/" className="text-dark text-decoration-none">{t("home")}</Link>
            </li>
            {subNavigation?.map((result, i) => {
              const safeName = String(result?.name || '');
              return (
                <li key={i} className={`breadcrumb-item ${!result.link ? "active" : ""}`} aria-current={!result.link ? "page" : undefined}>
                  {result.link ? (
                    <Link href={result.link} className="text-dark text-decoration-none">{t(safeName)}</Link>
                  ) : (
                    <span className="text-primary fw-bold">{t(safeName)}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
