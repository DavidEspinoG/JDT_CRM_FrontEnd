"use client"
import SectionTitle from "../components/SectionTitle";
import SelectClient from "../components/SelectClient";
import ordersContext from "../context/orders/ordersContext";
import { useContext } from "react";
import ProductSelect from "../components/ProductSelect";
import SelectQuantity from "../components/SelectQuantity";

const newOrder = () => {
    const context = useContext(ordersContext);
    
    return (
        <>
            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <SectionTitle>New order</SectionTitle>
                    <SelectClient/>
                    <ProductSelect />
                    <SelectQuantity />
                </div>
            </div>
        </>
    );
};

export default newOrder;