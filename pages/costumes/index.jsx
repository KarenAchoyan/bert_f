import React, {useEffect} from 'react';
import App from "../../components/layout/app";
import PageBanner from "../../components/pageBanner/pageBanner";
import styles from "../../styles/studio.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {getContent} from "../../store/content/actions";
import {Image, Skeleton} from "antd";
import {getCostumes} from "../../store/costume/actions";

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
    const costumes = useSelector(state => state.costume.costumes);
    const content = useSelector(state => state.content.content);
    const isFetching = useSelector(state => state.content.isFetching);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCostumes.request());
        dispatch(getContent.request({id: 1}));
    }, [dispatch])
    const youtubeEmbedLink = content?.video ? `https://www.youtube.com/embed/${content.video}` : '';

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
                                {content?.video ?
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={ youtubeEmbedLink}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="YouTube Video"
                                    />
                                    : null
                                }
                            </Skeleton>
                        </div>
                    </div>
                    <div className={styles.studioGallery}>
                        <Skeleton loading={isFetching} active>
                            <Slider {...settings}>
                                {costumes.map((item) => (
                                    <div key={item.id}>
                                        <Image preview={true} src={process.env.IMAGE_URL2 + item.image} alt="Studio image"/>
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