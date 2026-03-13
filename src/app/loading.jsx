"use client";
import SkeletonHomepage from "@/Components/Themes/Electronics/ElectronicsThree/SkeletonHomepage";
import Loader from "@/Layout/Loader";

const Loading = () => {
    return (
        <div className="loader-wrapper-page">
            <SkeletonHomepage />
            <Loader />
        </div>
    );
};

export default Loading;
