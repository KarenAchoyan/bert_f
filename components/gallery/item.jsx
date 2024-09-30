import React from 'react';
import styles from '@/styles/gallery.module.css'
import Image from "next/image";

const Item = ({image}) => {
    return (
        <div className={styles.image}>
            <Image width={500} height={500} src={image} alt=""/>
        </div>
    );
};

export default Item;