import React, {useEffect} from 'react';
import styles from '../../styles/gallery.module.css'
import {Image} from "antd";
import Item from "./item";
import {useDispatch, useSelector} from "react-redux";
import {getGalleriesLimit} from "../../store/gallery/actions";

const Gallery = () => {
    const galleries = useSelector(state => state.gallery.galleries);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGalleriesLimit.request());
    }, [dispatch])
    return (
        <>
            <div className={styles.heading}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h1>Պատկերասրահ</h1>
                    </div>
                    <div className={styles.imageContent}>
                        {galleries.map((item) => (
                            <Item key={item.id} image={process.env.IMAGE_URL2+item.image}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;