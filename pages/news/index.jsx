import React, {useEffect} from 'react';
import App from "../../components/layout/app";
import PageBanner from "../../components/pageBanner/pageBanner";
import styles from "../../styles/news.module.css"
import Item from "../../components/news/item";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../../store/blog/actions";
import {Skeleton} from "antd";

const Index = () => {
    const news = useSelector(state => state.blog.blogs);
    const isFetching = useSelector(state => state.blog.isFetching);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs.request());
    }, [])
    return (
        <>
            <App>
                <PageBanner title={""}/>
                <div className={styles.container}>
                   <Skeleton active loading={isFetching}>
                       <div className={styles.row}>
                           {news.map((item) => (
                               <Item isFetching={isFetching} key={item.id} item={item}/>
                           ))}
                       </div>
                   </Skeleton>
                </div>
            </App>
        </>
    );
};

export default Index;