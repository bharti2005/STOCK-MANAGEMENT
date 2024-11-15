import { useState, useEffect } from "react";

export function useStocks(){
    const [products, setProducts] = useState([]);
  

  useEffect(()=>{
    async function fetchData(){
       try { const response = await fetch("http://localhost:5000/api/stocks");
             const data = await response.json();
             setProducts(data);
         }
         catch(err){
             console.error('Error receiving the data', err);
         }}
         fetchData();
    },[]);
    return products;
}