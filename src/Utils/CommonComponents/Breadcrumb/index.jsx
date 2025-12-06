import { Href } from "@/Utils/Constants";
import { useTranslation } from "react-i18next";
import { Breadcrumb, Container } from "reactstrap";

const Breadcrumbs = ({ mainHeading, subNavigation, subTitle, title }) => {
  const { t } = useTranslation("common");
  
  // Safely convert title to string
  const safeTitle = String(title || '');
  
  return (
    <div className="breadcrumb-section">
      <Container>
        <h2>{t(safeTitle.replaceAll("-", " "))}</h2>
        <nav className="theme-breadcrumb">
          <Breadcrumb>
            <div className="breadcrumb-item active">
              <a href={Href}> {t("home")} </a>
            </div>
            {subNavigation?.map((result, i) => {
              // Safely convert name to string
              const safeName = String(result?.name || '');
              return (
                <div key={i} className="breadcrumb-item active ">
                  <a href={Href}> {t(safeName.replaceAll("-", " "))} </a>
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
