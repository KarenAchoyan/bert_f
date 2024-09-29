import React, {useEffect} from 'react';
import PageBanner from "../../components/pageBanner/pageBanner";
import App from "../../components/layout/app";
import styles from "../../styles/about.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getManagers} from "../../store/manager/actions";

const Managers = () => {
    const managers = useSelector(state => state.manager.managers);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getManagers.request())
    },[dispatch])
    return (
        <>
            <App>
                <PageBanner title={''}/>
                <div className={styles.header}>
                    <h1>«Բերդ» պարային անսամբլ </h1>
                </div>
                <div className={styles.container}>
                    {managers.map((item)=>(
                        <div key={item.id} className={styles.row}>
                        <h2>{item.fullname}</h2>
                        <div className={styles.avatar}>
                            <img src={process.env.IMAGE_URL+item.image} alt=""/>
                        </div>
                        <div className={styles.content}>
                            <p dangerouslySetInnerHTML={{__html: item?.content}}></p>
                        </div>
                    </div>
                    ))}
                </div>
            </App>
        </>
    );
};

export default Managers;