import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

import styles from "./SliderProduct.module.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//import Rating from '@mui/material/Rating';

export function SliderProduct({dataGames}) {
  const sliderRef = useRef(null);

  const settingSlider = {
    arrows: false,
    autoplay: false,
    dots: false,
    infinite: false,
    initialSlide: 0,
    slidesToShow: 5, // Math.min(5, dataGames.length),
    slidesToScroll: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: false,
          infinite: false,
          initialSlide: 0,
          slidesToShow: 3, //Math.min(3, dataGames.length),
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          dots: false,
          infinite: false,
          initialSlide: 0,
          slidesToShow: 2, // Math.min(2, dataGames.length),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          autoplay: false,
          dots: false,
          infinite: false,
          initialSlide: 0,
          slidesToShow: 2, // Math.min(2, dataGames.length),
          slidesToScroll: 2,
        }
      }
    ],
  };

  const SliderCard = ({ item }) => {
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

    const isInCart = cart.some((product) => product.publicId === item.publicId);

    return (
      <div className={styles.sliderCard}>
        <div className={styles.imageWrapper}>
          <img 
            className={styles.cardImage}
            src={item.coverUrl}
            alt={item.title}
            onClick={handleClick}
          />
          <div
            className={`${styles.containerAddCircleOutlineIcon} ${
              isInCart ? styles.disabledBtn : ""
            }`}
            onClick={!isInCart && !loading ? handleAddToCart : undefined}
          >
            {loading ? (
              <i className="bi bi-hourglass-split"></i>
            ) : (
              <IconButton aria-label="add to cart">
                <AddCircleOutlineIcon className={styles.addCircleOutlineIcon}/>
              </IconButton>
            )}
          </div>
        </div>
        <span className={`${styles.addInformationBadge}`}> Base Game </span>
        <span className={styles.cardTitle}> {item.title} </span>
        {item.discount ? (
          <>
            <span className={styles.discountBadge}>-{item.discount_percentage}%</span>
            <span className={styles.oldPrice}>${ item.price.toFixed(2) }</span>
            <span className={styles.newPrice}>${ item.discount_price.toFixed(2) }</span>
          </>
        ) : (
          <span className={styles.newPrice}> ${item.price.toFixed(2)} </span>
        )}
        {/* <Rating name="read-only" value={4.5} precision={1} readOnly size="small" /> */}
      </div>
    );
  };


  return (
    <>
      { dataGames?.length > 0 && (
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderContainer}>

            <Slider ref={sliderRef} {...settingSlider}>
              {dataGames.map((item) => (
                <SliderCard item={item} key={item.publicId} />
              ))}
            </Slider>

            <button 
              className={`${styles.arrowButton} ${styles.arrowLeft}`} 
              onClick={() => sliderRef.current.slickPrev()}
            >
              <ArrowBackIosNew className={styles.arrowIcon}/>
            </button>
            <button 
              className={`${styles.arrowButton} ${styles.arrowRight}`} 
              onClick={() => sliderRef.current.slickNext()}
            >
              <ArrowForwardIosIcon className={styles.arrowIcon}/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderProduct;