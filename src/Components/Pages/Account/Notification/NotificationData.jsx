import NoDataFound from "@/Components/Widgets/NoDataFound";
import request from "@/Utils/AxiosUtils";
import { MarkAsReadAPI, NotificationAPI } from "@/Utils/AxiosUtils/API";
import { ImagePath } from "@/Utils/Constants";
import { showMonthWiseDateAndTime } from "@/Utils/CustomFunctions/DateFormate";
import useCreate from "@/Utils/Hooks/useCreate";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiTimeLine } from "react-icons/ri";
import { Card, CardBody } from "reactstrap";
import AccountHeading from "../Common/AccountHeading";
import Loader from "@/Layout/Loader";

const NotificationData = () => {
  const { t } = useTranslation("common");
  const [isRead, setIsRead] = useState("");
  const { data, isLoading } = useQuery([NotificationAPI], () => request({ url: NotificationAPI }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  const { mutate } = useCreate(MarkAsReadAPI, false, false, "No", (resDta) => {
    if (resDta.status === 200 || resDta.status === 201) {
      setIsRead("read");
    }
  });
  useEffect(() => {
    return () => {
      mutate({ _method: "PUT" });
    };
  }, []);

  if (isLoading)
    return (
      <div className="box-loader">
        <Loader classes={"blur-bg"} />
      </div>
    );
  return (
    <Card className="mt-0">
      <CardBody>
        <AccountHeading title="Notifications" classes={"top-sec"} />
        {data?.length > 0 ? (
          <>
            <ul className="notification-list">
              {data?.map((elem, i) => (
                <li key={i} className={!elem?.read_at && isRead !== 'read' ? 'unread' : ''}>
                  <h4>{elem?.data?.message}</h4>
                  <h5>
                    <RiTimeLine /> {showMonthWiseDateAndTime(elem?.created_at)}
                  </h5>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <NoDataFound imageUrl={`/assets/svg/empty-items.svg`} customClass="no-data-added" title="no_notification" description="no_notification_description" height="300" width="300" />
        )}
      </CardBody>
    </Card>
  );
};

export default NotificationData;
