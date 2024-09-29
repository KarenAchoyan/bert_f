import React, {useEffect, useState} from 'react';
import App from "../../components/layout/app";
import PageBanner from "../../components/pageBanner/pageBanner";
import styles from "../../styles/gallery.module.css"
import Item from "../../components/gallery/item";
import SectionImages from "../../components/gallery/sectionImages";
import SectionVideo from "../../components/gallery/sectionVideo";
import Modal from "../../components/home/performance/modal";
import ItemVideo from "../../components/home/performance/item";
import {useDispatch, useSelector} from "react-redux";
import {getGalleries} from "../../store/gallery/actions";
import {getSpeeches} from "../../store/speech/actions";
import {Skeleton} from "antd";

const Index = () => {
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [videoStarted, setVideoStarted] = useState(false);
    const galleries = useSelector(state => state.gallery.galleries);
    const speeches = useSelector(state => state?.speech?.speeches);
    const [video, setVideo] = useState(null)
    const isFetching = useSelector(state => state?.gallery.isFetching)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGalleries.request());
        dispatch(getSpeeches.request());
    }, [dispatch])

    function openModal() {
        setShowModal(!showModal)
        setVideoStarted(!videoStarted);
    }

    return (
        <>
            <App>
                <PageBanner title={''}/>

                <div className={styles.content}>
                    <div className={styles.buttons}>
                        <ul>
                            <li onClick={() => setPage(0)} className={page === 0 ? styles.active : null}>Տեսանյութեր</li>
                            <li onClick={() => setPage(1)} className={page === 1 ? styles.active : null}>Նկարներ</li>
                        </ul>
                    </div>
                    <Skeleton loading={!isFetching} active>

                        {page === 1 ?
                            <SectionImages>
                                <div className={styles.imageContent}>
                                    {galleries.map((item) => (
                                        <Item image={process.env.IMAGE_URL2 + item?.image} key={item.id}/>
                                    ))}
                                </div>
                            </SectionImages>
                            :
                            <SectionVideo>
                                <div className={styles.imageContent}>
                                    {speeches.map((item) => (
                                        <ItemVideo item={item} setVideo={setVideo} key={item.id} openModal={openModal}/>
                                    ))}
                                </div>
                            </SectionVideo>
                        }
                    </Skeleton>
                </div>
                {showModal ? <Modal openModal={openModal} video={video} videoStarted={videoStarted}/> : null}
            </App>
        </>
    );
};

export default Index;