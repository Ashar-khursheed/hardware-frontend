
import React from 'react';
import styles from './SkeletonLoader.module.css';

const SkeletonLoader = ({ className = '', width, height, borderRadius, style = {} }) => {
  const customStyle = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    ...style,
  };

  return (
    <div 
      className={`${styles.skeleton} ${className}`} 
      style={customStyle}
    />
  );
};

export default SkeletonLoader;
