import styles from "./ProductDetail.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAPI from "../../hooks/useAPI";
import useCart from "../../hooks/useCart";

import { getCover, getHighlight } from "../../services/videoGameService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDetail = () => {
  const { publicId } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const {
    data: productData,
    loading: loadingProductData,
    error: errorProductData,
    executeFetch,
  } = useAPI(API_BASE_URL);


  useEffect(() => {
    if (publicId) {
      executeFetch(`/api/v1/vg-hc-store/data/public/video-games/${publicId}`, {
        method: "GET",
      });
    }
  }, [publicId]);


  const [enrichedProduct, setEnrichedProduct] = useState(null);
  useEffect(() => {
    const enrichProduct = async () => {
      if (productData?.publicId) {
        const [highlightUrl, coverUrl] = await Promise.all([
          getHighlight(productData.publicId),
          getCover(productData.publicId),
        ]);

        setMainImage(coverUrl || highlightUrl);

        setEnrichedProduct({
          ...productData,
          coverUrl,
          highlightUrl,
        });
      }
    };
    enrichProduct();
  }, [productData]);


  const { cart, addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!productData) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    addToCart(enrichedProduct);
    setLoading(false);
  };

  const isInCart = productData
    ? cart.some((p) => p.publicId === productData.publicId)
    : false;

  if (loadingProductData) return <p>Cargando...</p>;
  if (errorProductData) return <p>Error al cargar el producto</p>;
  if (!productData) return <p>No se encontró el producto</p>;

  return (
    <div className="container">
      <div className={`${styles.productDetailCard}`}>
        <div className={`${styles.productDetailCardImage}`}>
          {mainImage && (
            <img
              src={mainImage}
              alt={productData.title}
              className={styles.productDetailImage}
            />
          )}
        </div>

        <div className={`${styles.productDetailContent}`}>
          <h2 className={styles.productDetailTitle}>
            {productData.title}
          </h2>
          <p className={styles.productDetailDescription}>
            {productData.description}
          </p>

          <div className={styles.productDetailSection}>
            <h5 className={styles.productDetailSectionTitle}>
              Developer:
            </h5>
            <div className={styles.productDetailDeveloperBody}>
              <p className={styles.productDetailDeveloperName}>
                {productData.videoGameDeveloper?.name}
              </p>
              <span className={styles.productDetailDeveloperCountry}>
                {productData.videoGameDeveloper?.country}
              </span>
            </div>
          </div>

          {/* <div className={styles.productDetailSection}>
            <h5 className={styles.productDetailSectionTitle}>
              Platform:
            </h5>
            <div className={styles.productDetailPlatformGroup}>
              {["PC", "PS5", "PS4", "XBOX SERIES", "XBOX ONE"].map((platform) => (
                <React.Fragment key={platform}>
                  <input
                    type="radio"
                    className={styles.productDetailPlatformRadio}
                    name="platform"
                    id={platform}
                    autoComplete="off"
                    checked={selectedPlatform === platform}
                    onChange={() => setSelectedPlatform(platform)}
                  />
                  <label className={styles.productDetailPlatformLabel} htmlFor={platform}>
                    {platform}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div> */}

          <div className={styles.productDetailSection}>
            <span className={styles.productDetailPrice}>
              $ {productData.price.toFixed(2)}
            </span>
            {productData.oldPrice && (
              <span className={styles.productDetailOldPrice}>
                <s>${productData.oldPrice.toFixed(2)}</s>
              </span>
            )}
          </div>

          <div className={styles.productDetailButtons}>
            <button
              className={`${styles.productDetailBtnAddShoppingCart} ${
                isInCart ? styles.disabledBtn : ""
              }`}
              onClick={!isInCart && !loading ? handleAddToCart : undefined}
            >
              {loading ? (
                <i className="bi bi-hourglass-split"></i>
              ) : (
                <i className="bi bi-cart-plus"></i>
              )}{" "}
              {isInCart ? "Already in Cart" : "Add to Cart"}
            </button>

            <button className={styles.productDetailBtnAddWishlist}>
              <i className="bi bi-bookmark-star-fill"></i> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
