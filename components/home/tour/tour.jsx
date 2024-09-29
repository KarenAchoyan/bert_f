import React, {useEffect} from 'react';
import styles from '../../../styles/tour.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from "react-redux";
import {getTickets} from "../../../store/ticket/actions";
import Item from "./item";

const Tour = () => {
    const tickets = useSelector(state => state?.ticket?.tickets);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTickets.request())
    }, [dispatch])
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

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>Համերգներ և տոմսեր</h1>
                </div>
                <div>
                    {tickets.length > 3 ?
                        <Slider {...settings}>
                            {tickets.map((item) => (
                                <Item item={item} key={item.id}/>
                            ))}
                        </Slider>
                        :
                        <div className={styles.rowItems}>
                            {tickets.map((item) => (
                                <Item item={item} key={item.id}/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Tour;