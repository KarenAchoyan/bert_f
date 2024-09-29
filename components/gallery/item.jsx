import React from 'react';
import {Image} from "antd";
import styles from '@/styles/gallery.module.css'

const Item = ({image}) => {
    return (
        <div className={styles.image}>
            <Image src={image} alt=""/>
        </div>
    );
};

export default Item;