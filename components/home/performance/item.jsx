import React, {useState} from 'react';
import styles from '../../../styles/performance.module.css'
import {PlayCircleOutlined} from "@ant-design/icons";
import Modal from "./modal";

const ItemVideo = ({openModal, item, setVideo}) => {
    function op(){
        openModal();
        setVideo(item.video)
    }
    return (
        <>
            <div className={`${styles.secondImage}`}>
                {item?.image ?
                    <img src={process.env.IMAGE_URL2+item?.image} alt=""/> : null
                }
                <div className={styles.overline} onClick={op}>
                    <PlayCircleOutlined />
                </div>
            </div>
        </>

    );
};

export default ItemVideo;