"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoutAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import AccountContext from "@/Context/AccountContext";
import Cookies from "js-cookie";

const LogoutComponent = () => {
    const router = useRouter();
    const { setAccountData } = useContext(AccountContext);

    const { mutate } = useCreate(LogoutAPI, false, false, "No", () => {
        setAccountData();
        Cookies.remove("uat_multikart", { path: "/" });
        Cookies.remove("ue_multikart");
        Cookies.remove("account");
        Cookies.remove("CookieAccept");
        localStorage.clear();
        router.push("/");
    });

    useEffect(() => {
        const isAuthenticated = Cookies.get("uat_multikart");
        if (!isAuthenticated) {
            router.push("/");
        } else {
            mutate({});
        }
    }, [mutate, router]);

    return (
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutComponent;
