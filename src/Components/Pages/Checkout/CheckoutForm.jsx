import AccountContext from "@/Context/AccountContext";
import request from "@/Utils/AxiosUtils";
import { CountryAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import ShippingAddressSection from "./CheckoutFormData/ShippingAddressSection";
import AddressSelection from "./CheckoutFormData/AddressSelection";
import PaymentMethodSection from "./CheckoutFormData/PaymentMethodSection";

const CheckoutForm = ({ values, setFieldValue, errors, addToCartData }) => {
  const { accountData, refetch } = useContext(AccountContext);
  const { t } = useTranslation("common");
  const [address, setAddress] = useState([]);
  const router = useRouter();
  const access_token = Cookies.get("uat_multikart");

  useEffect(() => {
    accountData?.address.length > 0 && setAddress((prev) => [...accountData?.address]);
  }, [accountData]);

  const { data } = useQuery([CountryAPI], () => request({ url: CountryAPI }, router), {
    refetchOnWindowFocus: false,
    select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })),
  });

  return (
    <div className="hbx-checkout-steps-wrapper">
      <div className="hbx-checkout-step-item">
        {access_token ? (
          <AddressSelection
            values={values}
            setFieldValue={setFieldValue}
            accountData={accountData}
            errors={errors}
          />
        ) : (
          <ShippingAddressSection
            setFieldValue={setFieldValue}
            errors={errors}
            data={data}
            values={values}
          />
        )}
      </div>

      <div className="hbx-checkout-step-item">
        <PaymentMethodSection
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
