import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { getCover } from "../../services/videoGameService";
import styles from "./BrowseGames.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function BrowseGames() {
  const {
    data: dataGames,
    loading: loadingGames,
    error: errorGames,
    executeFetch: executeFetchGames
  } = useAPI(`${API_BASE_URL}`);

  const {
    data: dataCategories,
    executeFetch: executeFetchCategories
  } = useAPI(`${API_BASE_URL}`);

  const {
    data: dataDevelopers,
    executeFetch: executeFetchDevelopers
  } = useAPI(`${API_BASE_URL}`);

  const [games, setGames] = useState([]);
  const [covers, setCovers] = useState({});
  const [categories, setCategories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [filters, setFilters] = useState({
    developerId: "",
    videoGameCategoryId: ""
  });

  const navigate = useNavigate();

  // Initial Fetch
  useEffect(() => {
    executeFetchCategories("/api/v1/vg-hc-store/data/public/video-game-categories", { method: "GET" });
    executeFetchDevelopers("/api/v1/vg-hc-store/data/public/video-game-developers", { method: "GET" });
  }, []);

  // Fetch games with filters
  useEffect(() => {
    let url = `/api/v1/vg-hc-store/data/public/video-games?page=${page}&size=${size}&sortBy=title&sortDir=asc`;
    if (filters.developerId) url += `&developerId=${filters.developerId}`;
    if (filters.videoGameCategoryId) url += `&videoGameCategoryId=${filters.videoGameCategoryId}`;

    executeFetchGames(url, { method: "GET" });
  }, [page, size, filters]);

  useEffect(() => {
    if (dataGames?.content) {
      setGames(dataGames.content);
    }
  }, [dataGames]);

  useEffect(() => {
    if (dataCategories) setCategories(dataCategories);
    if (dataDevelopers) setDevelopers(dataDevelopers);
  }, [dataCategories, dataDevelopers]);

  useEffect(() => {
    const fetchCovers = async () => {
      const newCovers = {};
      for (const game of games) {
        const url = await getCover(game.publicId);
        newCovers[game.publicId] = url;
      }
      setCovers(newCovers);
    };
    if (games.length > 0) {
      fetchCovers();
    }
  }, [games]);

  // Function to clear filters and reset view
  const clearFilters = () => {
    setFilters({ developerId: "", videoGameCategoryId: "" });
    setPage(0);
    setSize(5);
  };


  return (
    <div className={styles.browseGamesContainer}>
      <h2 className={styles.browseGamesTitle}>🎮 Browse Games</h2>

      {/* Filtros */}
      <div className={styles.browseGamesFilterBar}>
        <select
          className={styles.browseGamesFilterSelect}
          value={filters.videoGameCategoryId}
          onChange={(e) =>
            setFilters({ ...filters, videoGameCategoryId: e.target.value })
          }
        >
          <option key={0} value="">Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className={styles.browseGamesFilterSelect}
          value={filters.developerId}
          onChange={(e) =>
            setFilters({ ...filters, developerId: e.target.value })
          }
        >
          <option key={0} value="">Developer</option>
          {developers.map((dev) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))}
        </select>

        <select
          className={styles.browseGamesFilterSelect}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        >
          <option key={1} value={5}>5</option>
          <option key={2} value={10}>10</option>
          <option key={3} value={20}>20</option>
        </select>

        <div className={styles.browseGamesClearFilters} onClick={clearFilters}>
          <i className="bi bi-arrow-counterclockwise"></i>
        </div>
      </div>


      {loadingGames && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}


      {!loadingGames && games.length === 0 && (
        <div className="alert alert-warning text-center">
          No se encontraron juegos con los filtros seleccionados.
        </div>
      )}


      <div className={styles.browseGamesGrid}>
        {games.map((game) => (
          <div key={game.publicId} className={styles.browseGamesGridCard}>
            <img
              src={covers[game.publicId]}
              alt={game.title}
              className={styles.cardGameCover}
            />
            <div className={styles.cardGameInfo}>
              <h5 className={styles.cardGameTitle}>{game.title}</h5>
              <p className={styles.cardGamePrice}>COP {game.price.toFixed(2)}</p>
              <button
                className={styles.cardGameDetailBtn}
                onClick={() => navigate(`/product-detail/${game.publicId}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

        {!loadingGames && games.length > 0 && (
          <nav aria-label="Page navigation">
            <ul className={`pagination justify-content-center ${styles.gridPaginationCustom}`}>
              
              <li
                className={`${styles.pageItemCustom} ${
                  dataGames?.first ? styles.pageItemDisabled : ""
                }`}
              >
                <button
                  className={styles.pageLinkCustom}
                  onClick={() => !dataGames?.first && setPage(page - 1)}
                  disabled={dataGames?.first}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: dataGames?.totalPages || 0 }, (_, i) => (
                <li
                  key={i}
                  className={`${styles.pageItemCustom} ${
                    i === page ? styles.pageItemActive : ""
                  }`}
                >
                  <button
                    className={styles.pageLinkCustom}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`${styles.pageItemCustom} ${
                  dataGames?.last ? styles.pageItemDisabled : ""
                }`}
              >
                <button
                  className={styles.pageLinkCustom}
                  onClick={() => !dataGames?.last && setPage(page + 1)}
                  disabled={dataGames?.last}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
    </div>
  );

}
