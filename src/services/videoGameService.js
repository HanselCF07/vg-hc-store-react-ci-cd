import apiClient from "../api/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_VIDEO_GAMES_PUBLIC = "/api/v1/vg-hc-store/data/public/video-games";
const API_VIDEO_GAMES_STATIC_RESOURCE_PUBLIC = "/api/v1/vg-hc-store/static-resources/public/gfs/"

import defaultCoverImg from "../assets/images/DefaultCoverImg.png";
import defaultHighlightImg from "../assets/images/DefaultHighlightImg.png";


export const getCover = async (publicId) => {
  try {
    const res = await apiClient.get(
      `${API_VIDEO_GAMES_STATIC_RESOURCE_PUBLIC}${publicId}`,
      {
        params: {
          product_type: "video_game",
          resource_location: "cover", // resolution: 360*480
        },
      }
    );

    if (res.data?.files?.length > 0) {
      const url = `${API_BASE_URL}${res.data.files[0].url}`;
      return url;
    } else {
      return defaultCoverImg;
    }
  } catch (error) {
    console.error("Error obteniendo highlight:", error);
    return defaultCoverImg;
  }
};


export const getHighlight = async (publicId) => {
  try {
    const res = await apiClient.get(
      `${API_VIDEO_GAMES_STATIC_RESOURCE_PUBLIC}${publicId}`,
      {
        params: {
          product_type: "video_game",
          resource_location: "highlight", // resolution: 2560*1440
        },
      }
    );

    if (res.data?.files?.length > 0) {
      const url = `${API_BASE_URL}${res.data.files[0].url}`;
      return url;
    } else {
      return defaultHighlightImg;
    }
  } catch (error) {
    console.error("Error obteniendo highlight:", error);
    return defaultHighlightImg;
  }
};

