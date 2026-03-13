import { Href } from "@/Utils/Constants";
import { useTranslation } from "react-i18next";
import { Breadcrumb, Container } from "reactstrap";
import { useEffect, useState } from "react";
import Link from "next/link";

const Breadcrumbs = ({ mainHeading, subNavigation, subTitle, title }) => {
  const { t } = useTranslation("common");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safely convert title to string
  const safeTitle = String(title || '');

  if (!isMounted) {
    return (
      <div className="breadcrumb-section">
        <Container><div style={{ height: '100px' }}></div></Container>
      </div>
    );
  }

  return (
    <div className="breadcrumb-section">
      <Container>
        <h2>{t(safeTitle.replaceAll("-", " "))}</h2>
        <nav className="theme-breadcrumb">
          <Breadcrumb>
            <div className="breadcrumb-item">
              <Link href="/"> {t("home")} </Link>
            </div>
            {subNavigation?.map((result, i) => {
              const safeName = String(result?.name || '');
              return (
                <div key={i} className={`breadcrumb-item ${!result.link ? "active" : ""}`}>
                  {result.link ? (
                    <Link href={result.link}>{t(safeName.replaceAll("-", " "))}</Link>
                  ) : (
                    <span>{t(safeName.replaceAll("-", " "))}</span>
                  )}
                </div>
              );
            })}
          </Breadcrumb>
        </nav>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
