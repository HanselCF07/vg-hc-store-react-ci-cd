import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SliderHighlight.module.css";
import useCart from "../../hooks/useCart";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export function SliderHighlight({dataGames}){

    const settingSlider = {
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      infinite: true,
      initialSlide: 0,
      // prevArrow: <PreviousBtn />,
      // nextArrow: <NextBtn />,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
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
        const { cart, addToCart } = useCart();
        const [loading, setLoading] = useState(false);

        const handleClick = () => {
            navigate(`/product-detail/${item.publicId}`);
        };

        const handleAddToCart = async () => {
            setLoading(true);
            // It simulates a small delay to show the effect.
            await new Promise((resolve) => setTimeout(resolve, 1000));
            addToCart(item);
            setLoading(false);
        };

        const isInCart = cart.some((p) => p.publicId === item.publicId);

        return (
            <div className={styles.cardSliderContainer}>
                <img
                    onClick={handleClick}
                    className={styles.cardSliderImage}
                    src={item.highlightUrl}
                    alt="highlight_img"
                />

                <div className={`${styles.cardContainer}`}>
                    <div className={`${styles.cardContainerBtn}`}>
                        <div
                            className={`${styles.cardContainerShoppingCartBtn} ${
                                isInCart ? styles.disabledBtn : ""
                            }`}
                            onClick={!isInCart && !loading ? handleAddToCart : undefined}
                        >
                            {loading ? (
                                <i className="bi bi-hourglass-split"></i>
                            ) : (
                                <i className="bi bi-cart-plus"></i>
                            )}
                        </div>
                        <div className={styles.cardContainerWishlistBtn}>
                            <i className="bi bi-bookmark-star-fill"></i>
                        </div>
                    </div>
                    <div className={styles.cardSliderTitle}>
                        <p>{item.title}</p>
                    </div>
                    <div className={styles.cardSliderContent}>
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            { dataGames?.length > 0 && (
                <div className={styles.sliderContainer}>
                    <Slider {...settingSlider} >
                        {dataGames.map((item) => (
                            <CardSlider item={item} key={item.publicId}/>
                        ))}
                    </Slider>
                </div>
            )}
        </>
    );
};

export default SliderHighlight;
