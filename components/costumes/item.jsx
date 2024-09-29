import React from 'react';
import styles from "../../styles/costumes.module.css";
import {Image} from "antd";

const Item = () => {
    return (
        <div className={styles.item}>
            <Image src="./gallery2.png" alt=""/>
        </div>
    );
};

export default Item;