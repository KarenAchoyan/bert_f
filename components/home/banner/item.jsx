import React from 'react';
import styles from "../../../styles/banner.module.css";
import Image from "next/image";

const Item = ({item}) => {
    return (
        <div className={styles.main}>
            <div className={styles.media}>
                <video width={1500} height={1000} autoPlay loop muted controls={false}>
                    <source src={'berd_banner.mp4'} type="video/mp4"/>
                </video>
            </div>
        </div>
    );
};

export default Item;