import React, {useEffect, useState} from 'react';
import PageBanner from "../../components/pageBanner/pageBanner";
import App from "../../components/layout/app";
import {useRouter} from "next/dist/client/compat/router";
import {useDispatch, useSelector} from "react-redux";
import {getSpeechesWithCategoriesFilter} from "../../store/speechWithCategory/actions";
import styles from "../../styles/gallery.module.css";
import ItemVideo from "../../components/home/performance/item";
import Modal from "../../components/home/performance/modal";
import {Skeleton} from "antd";

const Id = () => {
    const router = useRouter();
    const {id} = router.query;
    const [showModal, setShowModal] = useState(false)
    const [videoStarted, setVideoStarted] = useState(false);
    const events = useSelector(state => state.speechWithCategory.speechesWithCategories);
    const isFetching = useSelector(state => state.speechWithCategory.isFetching);
    const dispatch = useDispatch();
    const [video, setVideo] = useState(null)

    useEffect(() => {
        dispatch(getSpeechesWithCategoriesFilter.request({id}))
    }, [dispatch, id])

    function openModal() {
        setShowModal(!showModal)
        setVideoStarted(!videoStarted);
    }

    return (
        <>
            <App>
                <PageBanner title={''}/>
                {events.length > 0 ?
                    <Skeleton loading={isFetching} active>
                        <div>
                            <div className={styles.imageContent}>
                                {events.map((item) => (
                                    <ItemVideo item={item} setVideo={setVideo} key={item.id} openModal={openModal}/>
                                ))}
                            </div>
                            {showModal ?
                                <Modal openModal={openModal} video={video} videoStarted={videoStarted}/> : null}


                        </div>
                    </Skeleton>

                    :
                    <h2 className={styles.error}>Այս էջում դեռ միջոցառում տեղադրված չէ</h2>

                }
            </App>
        </>
    );
};

export default Id;