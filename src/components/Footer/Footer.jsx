import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} pt-5`}>
        <div className="container">
            <div className="row g-4">
 
                <div className="col-lg-4 col-md-6">
                    <h3 className={`${styles.footerTitle}`}>About Company</h3>
                    <p className="mb-4">We're dedicated to delivering innovative solutions that empower businesses to thrive in the digital age.</p>
                    <div className={`${styles.socialLinks} mb-4`}>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-youtube"></i>
                        </a>
                        <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-twitch"></i>
                        </a>
                    </div>
                </div>

          
                <div className="col-lg-2 col-md-6">
                    <h3 className={`${styles.footerTitle}`}>Quick Links</h3>
                    <ul className={`${styles.footerLinks}`}>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

              
                <div className="col-lg-2 col-md-6">
                    <h3 className={`${styles.footerTitle}`}>Support</h3>
                    <ul className={`${styles.footerLinks}`}>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>

                
                <div className="col-lg-4 col-md-6">
                    <h3 className={`${styles.footerTitle}`}>Newsletter</h3>
                    <p className="mb-4">Subscribe to our newsletter for updates, news, and exclusive offers.</p>
                    <form className="mb-4">
                      <div className="input-group">
                        <input
                          type="email"
                          className={`${styles.newsletterInput} form-control`}
                          placeholder="Enter your email"
                        />
                        <button className={`${styles.subscribeBtn} btn text-white`} type="submit">
                          Subscribe
                        </button>
                      </div>
                    </form>
                    <p className="small">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
                </div>
            </div>
        </div>

        <div className={`${styles.footerBottom} mt-5`}>
            <div className="container">
                <div className="row py-3">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="mb-0">Designed with <i className="bi bi-heart-fill text-danger"></i> by <a href="#">YourBrand</a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
