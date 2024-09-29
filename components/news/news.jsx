import React, {useEffect} from 'react';
import styles from "../../styles/news.module.css"
import Item from "./item";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../../store/blog/actions";

const News = () => {
    const news = useSelector(state => state?.blog?.blogs);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBlogs.request())
    },[dispatch])
    return (
        <div className={styles.container}>
            <h1>Նորություններ</h1>
            <div className={styles.row}>
                {news.map((item)=>(
                    <Item item={item} key={item.id}/>
                ))}
            </div>
        </div>
    );
};

export default News;