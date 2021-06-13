import { createContext, useEffect, useState } from "react";
// import { data } from "../data";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/products"
                );
                if (response) {
                    setData(response.data.product);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);
    return (
        <DataContext.Provider value={{ data, isLoading }}>
            {children}
        </DataContext.Provider>
    );
};
