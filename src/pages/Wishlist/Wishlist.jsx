import useAPI from "../../hooks/useAPI";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const { data: dataNews, loading, error } = useAPI("");

  return (
    <div className={styles.wishlistPage}>
      <h2>Wishlist</h2>

      <section>
        <h3>Section Loremp Ipsum</h3>
        <ul>
          <li>Loremp Ipsum 1</li>
          <li>Loremp Ipsum 2</li>
        </ul>
      </section>

    </div>
  );
}