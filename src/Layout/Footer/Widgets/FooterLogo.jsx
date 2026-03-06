import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { ImagePath } from "@/Utils/Constants";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";

const FooterLogo = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { settingData } = useContext(SettingContext);
  const [logoAbc, setLogo] = useState("");
  const path = useSearchParams();
  const theme = path.get("theme");

  useEffect(() => {
    let logoObj = themeOption?.logo?.footer_logo;
    if (theme) {
      if (theme == "fashion_one" || theme == "full_page" || theme == "game" || theme == "tools" || theme == "left_sidebar" || theme == "video") {
        logoObj = { original_url: `${ImagePath}/icon/logo/1-light.png` };
      } else if (theme == "fashion_two") {
        logoObj = { original_url: `${ImagePath}/icon/logo/2-light.png` };
      } else if (theme == "fashion_three") {
        logoObj = { original_url: `${ImagePath}/icon/logo/3.png` };
      } else if (theme == "fashion_four") {
        logoObj = { original_url: `${ImagePath}/icon/logo/4.png` };
      } else if (theme == "yoga") {
        logoObj = { original_url: `${ImagePath}/icon/logo/23.png` };
      } else if (theme == "watch") {
        logoObj = { original_url: `${ImagePath}/icon/logo/20.png` };
      } else if (theme == "vegetables_one") {
        logoObj = { original_url: `${ImagePath}/icon/logo/15.png` };
      } else if (theme == "fashion_five") {
        logoObj = { original_url: `${ImagePath}/icon/logo/5.png` };
      } else if (theme == "jewellery_one") {
        logoObj = { original_url: `${ImagePath}/icon/logo/18-light.png` };
      } else if (theme == "fashion_six") {
        logoObj = { original_url: `${ImagePath}/icon/logo/6-light.png` };
      } else if (theme == "fashion_seven") {
        logoObj = { original_url: `${ImagePath}/icon/logo/7.png` };
      } else if (theme == "furniture_one" || theme == "furniture_two" || theme == "jewellery_two" || theme == "jewellery_three") {
        logoObj = { original_url: `${ImagePath}/icon/logo/9.png` };
      } else if (theme == "furniture_dark") {
        logoObj = { original_url: `${ImagePath}/icon/logo/9-light.png` };
      } else if (theme == "electronics_one") {
        logoObj = { original_url: `${ImagePath}/icon/logo/10.png` };
      } else if (theme == "electronics_two") {
        logoObj = { original_url: `${ImagePath}/icon/logo/11.png` };
      } else if (theme == "electronics_three" || theme == "marketplace_three") {
        logoObj = { original_url: `${ImagePath}/icon/logo/12-light.png` };
      } else if (theme == "marketplace_one") {
        logoObj = { original_url: `${ImagePath}/icon/logo/13.png` };
      } else if (theme == "marketplace_two") {
        logoObj = { original_url: `${ImagePath}/icon/logo/14-light.png` };
      } else if (theme == "marketplace_four") {
        logoObj = { original_url: `${ImagePath}/icon/logo/14.png` };
      } else if (theme == "vegetables_two" || theme == "vegetables_three") {
        logoObj = { original_url: `${ImagePath}/icon/logo/16.png` };
      } else if (theme == "vegetables_four") {
        logoObj = { original_url: `${ImagePath}/icon/logo/17.png` };
      } else if (theme == "bag") {
        logoObj = { original_url: `${ImagePath}/icon/logo/19-light.png` };
      } else if (theme == "medical") {
        logoObj = { original_url: `${ImagePath}/icon/logo/21.png` };
      } else if (theme == "perfume") {
        logoObj = { original_url: `${ImagePath}/icon/logo/22.png` };
      } else if (theme == "marijuana") {
        logoObj = { original_url: `${ImagePath}/icon/logo/25-light.png` };
      } else if (theme == "christmas" || theme == "bicycle") {
        logoObj = { original_url: `${ImagePath}/icon/logo/24-light.png` };
      } else if (theme == "shoes") {
        logoObj = { original_url: `${ImagePath}/icon/logo/27-light.png` };
      } else if (theme == "flower") {
        logoObj = { original_url: `${ImagePath}/icon/logo/33.png` };
      } else if (theme == "kids") {
        logoObj = { original_url: `${ImagePath}/icon/logo/29.png` };
      } else if (theme == "books") {
        logoObj = { original_url: `${ImagePath}/icon/logo/28.png` };
      } else if (theme == "beauty") {
        logoObj = { original_url: `${ImagePath}/icon/logo/19.png` };
      } else if (theme == "goggles") {
        logoObj = { original_url: `${ImagePath}/icon/logo/32.png` };
      } else if (theme == "gym") {
        logoObj = { original_url: `${ImagePath}/icon/logo/26-light.png` };
      } else if (theme == "video_slider") {
        logoObj = { original_url: `${ImagePath}/icon/logo/31.png` };
      } else if (theme == "pets") {
        logoObj = { original_url: `${ImagePath}/icon/logo/35-light.png` };
      }
      else if (theme == "nursery") {
        logoObj = { original_url: `${ImagePath}/icon/logo/34-light.png` };
      }
      else if (theme == "gradient") {
        logoObj = { original_url: `${ImagePath}/icon/logo/37.png` };
      } else if (theme == "parallax") {
        logoObj = { original_url: `${ImagePath}/icon/logo/36-light.png` };
      } else if (theme == "surfboard") {
        logoObj = { original_url: `${ImagePath}/icon/logo/30.png` };
      } else if (theme == "digital_download") {
        logoObj = { original_url: `${ImagePath}/icon/logo/38.png` };
      } else if (theme == "single_product") {
        logoObj = { original_url: `${ImagePath}/icon/logo/8-light.png` };
      }
    }
    setLogo(logoObj);
  }, [theme, themeOption?.logo?.footer_logo]);

  const logoUrl = getImageUrl(logoAbc);

  return (
    <div className="footer-logo">
      {logoAbc ? (
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src={logoUrl}
              height={34}
              width={180}
              alt={
                settingData?.general?.site_name
                  ? settingData.general.site_name
                  : "multikart-logo"
              }
            />
          </a>
        </Link>
      ) : settingData?.general?.site_name ? (
        <Link href="/" legacyBehavior>
          <span>
            <a>
              <h2 className="f-w-600">
                {settingData.general.site_name.split(" ")[0]}
              </h2>
            </a>
          </span>
        </Link>
      ) : null}
    </div>
  );
};

export default FooterLogo;
