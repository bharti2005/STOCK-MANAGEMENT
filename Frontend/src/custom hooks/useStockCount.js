import { useRef, useEffect, useState } from "react";

export const useStockCount = () => {
  const [stockCount, setStockCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stocks-length");
        const data = await res.json();
        setStockCount(data);  // Set state to trigger re-render
      } catch (error) {
        console.error("Error fetching bills length:", error);
      }
    };

    fetchData();
  }, []);

  return stockCount;
};
