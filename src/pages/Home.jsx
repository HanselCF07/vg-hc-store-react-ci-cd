import { useEffect, useState } from "react";
import "./Home.css";

import useAPI from "../hooks/useAPI";
import { getCover, getHighlight } from "../services/videoGameService";

import SliderHighlight from "../components/SliderHighlight/SliderHighlight.jsx";
import SliderProduct from "../components/SliderProduct/SliderProduct.jsx";
import SliderHighlightGrid from "../components/SliderHighlightGrid/SliderHighlightGrid.jsx";

const VITE_ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const {
    data: dataGames,
    loading: loadingGames,
    error: errorGames,
    executeFetch: executeFetchGames,
  } = useAPI(`${API_BASE_URL}`);

  const [games, setGames] = useState([]);

  useEffect(() => {
    executeFetchGames(
      "/api/v1/vg-hc-store/data/public/video-games?page=0&size=20",
      { method: "GET" }
    );
  }, []);

  useEffect(() => {
    const enrichGames = async () => {
      if (dataGames?.content?.length > 0) {
        const updatedGames = await Promise.all(
          dataGames.content.map(async (game) => {
            const [highlightUrl, coverUrl] = await Promise.all([
              getHighlight(game.publicId),
              getCover(game.publicId),
            ]);
            return { ...game, highlightUrl, coverUrl };
          })
        );
        setGames(updatedGames);
      }
    };

    enrichGames();
  }, [dataGames]);

  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "none",
      }}
    >
      <div style={{ width: "75%", maxWidth: "calc(100% - 20px)" }}>
        <h4 className="home-subtitle">{VITE_ENVIRONMENT}</h4>
        <br />
        <SliderHighlight dataGames={games} />
        <br />
        <br />
        <SliderProduct dataGames={games} />
        <br />
        <SliderHighlightGrid dataGames={games} />
      </div>
    </div>
  );

}
