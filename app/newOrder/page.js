"use client"
import SectionTitle from "../components/SectionTitle";
import SelectClient from "../components/SelectClient";
import ordersContext from "../context/orders/ordersContext";
import { useContext } from "react";
import ProductSelect from "../components/ProductSelect";
import SelectQuantity from "../components/SelectQuantity";
import Total from "../components/Total";

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
                    <Total />
                    <button
                        type="button"
                        className={`bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}
                    >
                        Submit order
                    </button>
                </div>
            </div>
        </>
    );
};

export default newOrder;