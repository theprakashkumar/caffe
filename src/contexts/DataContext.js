import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("/products");
                if (response.data.success) {
                    setData(response.data.product);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
