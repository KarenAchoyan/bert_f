import React, {useEffect} from 'react';
import styles from '../../../styles/banner.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../ui/button/button";
import Item from "./item";
import {useDispatch, useSelector} from "react-redux";
import {getSlides} from "../../../store/slides/actions";

const Banner = () => {
    const slides = useSelector(state => state?.slide?.slides)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSlides.request())
    }, [dispatch])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <div className={styles.banner}>
                {slides?.map((item) => (
                    <Item item={item} key={item.id}/>
                ))}
            </div>

        </>
    );
};

export default Banner;