import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { ImagePath } from "@/Utils/Constants";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiAlignLeft } from "react-icons/ri";

const HeaderLogo = ({ extraClass }) => {
  const { settingData } = useContext(SettingContext);
  const { themeOption, mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const [logo, setLogo] = useState("");
  const path = useSearchParams();
  const theme = path.get("theme");

  useEffect(() => {
    let logo = themeOption?.logo?.header_logo;
    if (theme) {
      if (theme == "fashion_one" || theme == "full_page" || theme == "tools" || theme == "game" || theme == "left_sidebar" || theme == "video") {
        logo = { original_url: `${ImagePath}/icon/logo/1.png` };
      }
      else if (theme == "fashion_two") {
        logo = { original_url: `${ImagePath}/icon/logo/2.png` };
      }
      else if (theme == "fashion_three") {
        logo = { original_url: `${ImagePath}/icon/logo/3.png` };
      }
      else if (theme == "yoga") {
        logo = { original_url: `${ImagePath}/icon/logo/23.png` };
      }
      else if (theme == "watch") {
        logo = { original_url: `${ImagePath}/icon/logo/20.png` };
      }
      else if (theme == "vegetables_one") {
        logo = { original_url: `${ImagePath}/icon/logo/15.png` };
      }
      else if (theme == "fashion_four") {
        logo = { original_url: `${ImagePath}/icon/logo/4.png` };
      }
      else if (theme == "fashion_five") {
        logo = { original_url: `${ImagePath}/icon/logo/5.png` };
      }
      else if (theme == "jewellery_one") {
        logo = { original_url: `${ImagePath}/icon/logo/18-light.png` };
      }
      else if (theme == "fashion_six") {
        logo = { original_url: `${ImagePath}/icon/logo/6.png` };
      }
      else if (theme == "fashion_seven") {
        logo = { original_url: `${ImagePath}/icon/logo/7.png` };
      }
      else if (theme == "furniture_one" || theme == "furniture_two" || theme == "jewellery_two" || theme == "jewellery_three") {
        logo = { original_url: `${ImagePath}/icon/logo/9.png` };
      }
      else if (theme == "furniture_dark") {
        logo = { original_url: `${ImagePath}/icon/logo/9-light.png` };
      }
      else if (theme == "electronics_one") {
        logo = { original_url: `${ImagePath}/icon/logo/10.png` };
      }
      else if (theme == "electronics_two") {
        logo = { original_url: `${ImagePath}/icon/logo/11.png` };
      }
      else if (theme == "electronics_three" || theme == "marketplace_three") {
        logo = { original_url: `${ImagePath}/icon/logo/12.png` };
      }
      else if (theme == "marketplace_one") {
        logo = { original_url: `${ImagePath}/icon/logo/13.png` };
      }
      else if (theme == "marketplace_two" || theme == "marketplace_four") {
        logo = { original_url: `${ImagePath}/icon/logo/14-light.png` };
      }
      else if (theme == "vegetables_two" || theme == "vegetables_three") {
        logo = { original_url: `${ImagePath}/icon/logo/16.png` };
      }
      else if (theme == "vegetables_four") {
        logo = { original_url: `${ImagePath}/icon/logo/17.png` };
      }
      else if (theme == "bag" || theme == "beauty") {
        logo = { original_url: `${ImagePath}/icon/logo/19.png` };
      }
      else if (theme == "medical") {
        logo = { original_url: `${ImagePath}/icon/logo/21.png` };
      }
      else if (theme == "perfume") {
        logo = { original_url: `${ImagePath}/icon/logo/22.png` };
      }
      else if (theme == "marijuana") {
        logo = { original_url: `${ImagePath}/icon/logo/25.png` };
      }
      else if (theme == "christmas") {
        logo = { original_url: `${ImagePath}/icon/logo/24-light.png` };
      }
      else if (theme == "bicycle") {
        logo = { original_url: `${ImagePath}/icon/logo/24.png` };
      }
      else if (theme == "shoes") {
        logo = { original_url: `${ImagePath}/icon/logo/27.png` };
      }
      else if (theme == "flower") {
        logo = { original_url: `${ImagePath}/icon/logo/33.png` };
      }
      else if (theme == "kids") {
        logo = { original_url: `${ImagePath}/icon/logo/29.png` };
      }
      else if (theme == "books") {
        logo = { original_url: `${ImagePath}/icon/logo/28.png` };
      }
      else if (theme == "goggles") {
        logo = { original_url: `${ImagePath}/icon/logo/32.png` };
      }
      else if (theme == "gym") {
        logo = { original_url: `${ImagePath}/icon/logo/26.png` };
      }
      else if (theme == "video_slider") {
        logo = { original_url: `${ImagePath}/icon/logo/31.png` };
      }
      else if (theme == "pets") {
        logo = { original_url: `${ImagePath}/icon/logo/35.png` };
      }
      else if (theme == "nursery") {
        logo = { original_url: `${ImagePath}/icon/logo/34.png` };
      }
      else if (theme == "gradient") {
        logo = { original_url: `${ImagePath}/icon/logo/37.png` };
      }
      else if (theme == "parallax") {
        logo = { original_url: `${ImagePath}/icon/logo/36.png` };
      }
      else if (theme == "digital_download") {
        logo = { original_url: `${ImagePath}/icon/logo/38.png` };
      }
      else if (theme == "surfboard") {
        logo = { original_url: `${ImagePath}/icon/logo/30.png` };
      }
      else if (theme == "single_product") {
        logo = { original_url: `${ImagePath}/icon/logo/8-light.png` };
      }
    }
    setLogo(logo);
  }, [theme, themeOption?.logo?.header_logo]);
  return (
    <>
      <Link href="/" legacyBehavior><span>
<a className={`${extraClass ? extraClass : ""}`}>
          {logo?.original_url ? (
            <Image
              className="img-fluid"
              src={logo.original_url}
              height={34}
              width={173}
              alt={settingData?.general?.site_name || 'multikart-logo'}
            />
          ) : settingData?.general?.site_name ? (
            <h2 className="f-w-600 m-0">
              {settingData.general.site_name.split(" ")[0]}
            </h2>
          ) : (
            <h2 className="f-w-600 m-0">Logo Here</h2>
          )}
        </a>
</span></Link>

    </>
  );
};

export default HeaderLogo;
