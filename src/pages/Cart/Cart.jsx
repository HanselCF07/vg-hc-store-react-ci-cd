import useCart from "../../hooks/useCart";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, clearCart, removeFromCart, subtotal, discount, shipping, total } = useCart();

  return (
    <div className={`container ${styles.cartWrapper}`}>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-white fw-bold mb-0">Shopping Cart</h4>
            <span className="text-light">{cart.length} items</span>
          </div>

          <div className="d-flex flex-column gap-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.publicId} className={`${styles.productCard} p-4`}>
                  <div className="row align-items-center">

                    <div className="d-flex justify-content-center col-md-2">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className={`${styles.productImage}`}
                      />
                    </div>

                    <div className="col-md-7">
                      <div className={`${styles.badgeRow}`}>
                        <span className={`${styles.addInformationBadge}`}>
                          Base Game
                        </span>
                        
                        {item.discount ? (
                          <span className={`${styles.discountBadge}`}>
                            {item.discount}% OFF
                          </span>
                        ) : (
                          <span className={`${styles.discountBadge}`}>
                            0% OFF
                          </span>
                        )}
                      </div>
                      <h6 className="my-2 text-white fw-bold">{item.title}</h6>
                      <p className="my-1 text-light small">{item.description}</p>
                    </div>

                    <div className="col-md-2 d-flex flex-column align-items-center">
                      {item.discount ? (
                        <>
                          <span className="text-muted text-decoration-line-through">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-success fw-bold">
                            ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-white fw-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="col-md-1 d-flex flex-column gap-2 align-items-center">
                      <div className={`${styles.wishlistBtn}`}>
                        <i className={`bi bi-bookmark-star ${styles.wishlistImg}`}></i>
                      </div>
                      <div
                        className={`${styles.removeBtn}`}
                        onClick={() => removeFromCart(item.publicId)}
                      >
                        <i className={`bi bi-trash ${styles.removeImg}`}></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-light">Tu carrito está vacío</p>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className={`${styles.summaryCard} p-4 shadow-sm`}>
            <h5 className="text-white fw-bold mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-white">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-white">Discount</span>
              <span className="text-success">-${discount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-white">Shipping</span>
              <span className="text-white">${shipping.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="text-white fw-bold">Total</span>
              <span className="text-white fw-bold">${total.toFixed(2)}</span>
            </div>

            <div className="mb-4">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo code"/>
                    <button className="btn btn-success" type="button">Apply</button>
                </div>
            </div>

            <button className={`btn btn-primary ${styles.checkoutBtn} w-100 mb-3`}>
              Proceed to Checkout
            </button>
            <div className="d-flex justify-content-center gap-2">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-white">Secure checkout</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}