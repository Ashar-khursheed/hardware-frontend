import React from 'react';
import SkeletonHomepage from '@/Components/Themes/Electronics/ElectronicsThree/SkeletonHomepage';

const Loading = () => {
    return (
        <div className="loader-wrapper">
            <SkeletonHomepage />
            <div className="loader" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}></div>
        </div>
    );
};

export default Loading;
