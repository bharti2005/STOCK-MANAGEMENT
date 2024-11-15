import { useState,useEffect } from "react";

export function useViewBills(){
    const [bills, setBills] = useState([])
    useEffect(()=>{
            const fetchData = async ()=>{
                try {
                const res = await fetch(`http://localhost:5000/api/get-bills`)
                const data = await res.json()
                setBills(data);
        }catch(err){
            throw new Error({message: err})
        };
       }
        fetchData();
    },[])
    return bills;
}