// import { Href } from "@/Utils/Constants";
// import { useTranslation } from "react-i18next";
// import { Breadcrumb, Container } from "reactstrap";

// const Breadcrumbs = ({ mainHeading, subNavigation, subTitle, title }) => {
//   const { t } = useTranslation("common");
//   return (
//     <div className="breadcrumb-section">
//       <Container>
//         <h2>{t(title?.replaceAll("-", " "))}</h2>
//         <nav className="theme-breadcrumb">
//           <Breadcrumb>
//             <div className="breadcrumb-item active">
//               <a href={Href}> {t("home")} </a>
//             </div>
//             {subNavigation?.map((result, i) => (
//               <div key={i} className="breadcrumb-item active ">
//                 <a href={Href}> {t(result?.name?.replaceAll("-", " "))} </a>
//               </div>
//             ))}
//           </Breadcrumb>
//         </nav>
//       </Container>
//     </div>
//   );
// };

// export default Breadcrumbs;
import { useRouter } from "next/router";
import { Href } from "@/Utils/Constants";
import { useTranslation } from "react-i18next";
import { Breadcrumb, Container } from "reactstrap";

const Breadcrumbs = ({ mainHeading, subNavigation, subTitle, title }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  // ✅ Hide breadcrumbs on product detail pages
  if (router.pathname.startsWith("/product/") || router.asPath.startsWith("/product/")) {
    return null;
  }

  return (
    <div className="breadcrumb-section">
      <Container>
        <h2>{t(title?.replaceAll("-", " "))}</h2>
        <nav className="theme-breadcrumb">
          <Breadcrumb>
            <div className="breadcrumb-item active">
              <a href={Href}> {t("home")} </a>
            </div>
            {subNavigation?.map((result, i) => (
              <div key={i} className="breadcrumb-item active">
                <a href={Href}> {t(result?.name?.replaceAll("-", " "))} </a>
              </div>
            ))}
          </Breadcrumb>
        </nav>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
