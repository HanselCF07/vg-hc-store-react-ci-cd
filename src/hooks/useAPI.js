import { useState, useEffect } from "react";

/**
 * Generic hook to consume any endpoint.
 * @param {string} baseUrl - Server to query.
 * @param {string} endPoint - Endpoint to query.
 * @param {object} options - Additional options (headers, params).
 */

export default function useFetch(baseUrl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = async (endPoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}${endPoint}`, options);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const jsonData = await res.json();
      const headersObj = Object.fromEntries(res.headers.entries());

      const responseData = {
        data: jsonData,
        headers: headersObj,
      };

      setData(jsonData);

      return responseData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, executeFetch };
}
