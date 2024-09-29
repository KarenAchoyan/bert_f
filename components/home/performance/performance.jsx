import React, {useEffect, useState} from 'react';
import styles from '@/styles/performance.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "./item";
import Modal from "./modal";
import ItemVideo from "./item";
import {useDispatch, useSelector} from "react-redux";
import {getSpeeches} from "../../../store/speech/actions";

const Performance = () => {
    const [showModal, setShowModal] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [video, setVideo] = useState(null)

    const speeches = useSelector(state => state?.speech?.speeches);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpeeches.request());
    }, [dispatch])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // tablet
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // mobile landscape
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480, // mobile portrait
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    function openModal() {
        setShowModal(!showModal);
        setVideoStarted(!videoStarted);
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1>Ելույթներ</h1>
                    </div>
                    <div className={styles.imageContent}>
                        <Slider {...settings}>
                            {speeches.map((item) => (
                                <ItemVideo item={item} setVideo={setVideo} key={item.id} openModal={openModal}/>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            {showModal ? <Modal openModal={openModal} video={video} videoStarted={videoStarted}/> : null}
        </>
    );
};

export default Performance;
