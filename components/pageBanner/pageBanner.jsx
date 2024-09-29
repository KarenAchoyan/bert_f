import React from 'react';
import styles from "../../styles/pageBanner.module.css"
const PageBanner = ({title}) => {
    return (
        <div className={styles.banner}>
            <div className={styles.overlay}>
                <h2>{title}</h2>
            </div>
        </div>
    );
};

export default PageBanner;