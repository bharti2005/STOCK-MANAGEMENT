import { useRef, useEffect, useState } from "react";

export const useBillNums = () => {
  const num = useRef(null);
  const [billCount, setBillCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/get-bills-length");
        const data = await res.json();
        num.current = data;
        setBillCount(data);  // Set state to trigger re-render
        console.log(num.current);  // num.current holds the data, but won't trigger a re-render
      } catch (error) {
        console.error("Error fetching bills length:", error);
      }
    };

    fetchData();
  }, []);

  return billCount;
};
