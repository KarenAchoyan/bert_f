import React from 'react';
import styles from "../../styles/news.module.css";
import Image from "next/image";
import {ArrowRightOutlined} from "@ant-design/icons";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {truncateContent} from "../../utils/utils";
const Item = ({item}) => {
    return (
        <div className={styles.item}>
                <div className={styles.avatar}>
                    <Image width={500} height={500} src={process.env.IMAGE_URL+item?.image}/>
                </div>
                <div className={styles.content}>
                    <div>
                        <p>{new Date(item?.created_at).toLocaleDateString('en-CA')}</p>
                        <h2>What Should You Wear in Winter? Check Out Our Tips for Winter</h2>
                        <p>{truncateContent(item?.content,200)}</p>
                        <span>
                        <ArrowRightOutlined />
                    </span>
                    </div>
                </div>
        </div>
    );
};

export default Item;