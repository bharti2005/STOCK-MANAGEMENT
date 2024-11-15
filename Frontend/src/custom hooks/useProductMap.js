import React, { useState, useEffect } from 'react';

export const useProductDropdown = () => {
  const [products, setProducts] = useState([]); // State to store products

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/productMapData");
        const data = await res.json();
        setProducts(data); // Store the products in state
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts
  return products;
};
