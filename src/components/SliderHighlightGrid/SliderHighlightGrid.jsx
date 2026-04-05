import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SliderHighlightGrid.module.css"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '@mui/material/Rating';

export function SliderHighlightGrid({dataGames}){
    const settingSlider = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        infinite: true,
        initialSlide: 0,
        // prevArrow: <PreviousBtn />,
        // nextArrow: <NextBtn />,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
            }
        }
        ],
    };

    const CardSlider = ({ item }) => {
        const navigate = useNavigate();
        
        const handleClick = () => {
            navigate(`/product-detail/${item.publicId}`);
        };

        return (
            <div className={styles.cardSliderGridContainer}>
                <img
                    onClick={handleClick}
                    className={styles.cardSliderGridImage}
                    src={item.highlightUrl}
                    alt="highlight_img"
                />
                <div className={styles.cardSliderGridTitle}>
                    <p> {item.title} </p>
                </div>
                <div className={styles.cardSliderGridContent}>
                    <p> {item.description} </p>
                </div>
            </div>
        );
    }

    return (
        <>
            { dataGames?.length > 0 && (
                <div className={styles.sliderGridContainer}>
                    <Slider  {...settingSlider} >
                        {dataGames.map((item) => (
                            <CardSlider item={item} key={item.publicId}/>
                        ))}
                    </Slider>
                </div>
            )}
        </>
    );
};

export default SliderHighlightGrid;