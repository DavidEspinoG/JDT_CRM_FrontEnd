"use client"
import Select from "react-select";
import SectionTitle from "../components/SectionTitle";
import SelectClient from "../components/SelectClient";

const newOrder = () => {
    
    return (
        <>
            <SectionTitle>New order</SectionTitle>
            <SelectClient/>
        </>
    );
};

export default newOrder;