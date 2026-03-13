import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import Link from "next/link";

const Breadcrumbs = ({ subNavigation }) => {
  const { t } = useTranslation("common");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="breadcrumb-section py-2 bg-white">
      <Container>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0, border: 'none' }}>
            <li className="breadcrumb-item">
              <Link href="/" className="text-secondary text-decoration-none small">{t("home")}</Link>
            </li>
            {subNavigation?.map((result, i) => {
              const safeName = String(result?.name || '');
              return (
                <li key={i} className={`breadcrumb-item ${result.link ? "" : "active"}`} aria-current={result.link ? undefined : "page"}>
                  {result.link ? (
                    <Link href={result.link} className="text-secondary text-decoration-none small">{t(safeName)}</Link>
                  ) : (
                    <span className="text-dark small fw-normal">{t(safeName)}</span>
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
