"use client"
import Select from "react-select";
import SectionTitle from "../components/SectionTitle";
import SelectClient from "../components/SelectClient";
import ordersContext from "../context/orders/ordersContext";
import { useContext } from "react";
import ProductSelect from "../components/ProductSelect";

const newOrder = () => {
    const context = useContext(ordersContext);
    
    return (
        <>
            <SectionTitle>New order</SectionTitle>
            <SelectClient/>
            <ProductSelect />
        </>
    );
};

export default newOrder;