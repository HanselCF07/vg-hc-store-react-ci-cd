import useAPI from "../../hooks/useAPI";
import styles from "./News.module.css";

export default function News() {
  const { data: dataNews, loading, error } = useAPI("");

  return (
    <div className={styles.newsPage}>
      <h2>News</h2>

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