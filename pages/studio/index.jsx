import React, {useEffect} from 'react';
import App from "../../components/layout/app";
import PageBanner from "../../components/pageBanner/pageBanner";
import styles from "../../styles/studio.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {getStudioImages} from "../../store/studio/actions";
import {getContent} from "../../store/content/actions";
import {Image, Skeleton} from "antd";

const Index = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992, // Below 992px width
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768, // Below 768px width
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576, // Below 576px width
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    const studioImages = useSelector(state => state.studio.studioImages);
    const content = useSelector(state => state.content.content);
    const isFetching = useSelector(state => state.content.isFetching);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudioImages.request());
        dispatch(getContent.request({id: 2}));
    }, [dispatch])
    return (
        <>
            <App>
                <PageBanner title={""}/>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.section}>
                            <Skeleton loading={isFetching} active>
                                <h1>Մեր ստուդիան</h1>
                                <p dangerouslySetInnerHTML={{__html: content?.content}}></p>
                            </Skeleton>

                        </div>
                        <div className={styles.section}>
                            <Skeleton loading={isFetching} active>
                                {content?.image ?
                                    <img src={process.env.IMAGE_URL+content?.image} alt=""/>
                                    : null
                                }
                            </Skeleton>
                        </div>
                    </div>
                    <div className={styles.studioGallery}>
                        <Skeleton loading={isFetching} active>
                            <Slider {...settings}>
                                {studioImages.map((item) => (
                                    <div key={item.id}>
                                        <Image preview={true} src={process.env.IMAGE_URL2 + item.image}
                                               alt="Studio image"/>
                                    </div>
                                ))}
                            </Slider>
                        </Skeleton>
                    </div>
                </div>
            </App>
        </>
    );
};

export default Index;