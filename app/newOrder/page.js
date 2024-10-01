"use client"
import Select from "react-select";
import { useId, useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";

const options = [
    { value: 'b8fd3c46-0894-4ce4-b7fe-ae6872386841', label: 'Chocolate' },
    { value: '4b4378b7-5fd3-46d6-b35a-611802616d9c', label: 'Strawberry' },
    { value: '1dd5a0b5-6e5a-42a8-afaf-208191513462', label: 'Vanilla' }
]


const newOrder = () => {
    const [ isMounted, setIsMounted ] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    const id = useId();
    
    return isMounted ? (
        <>
            <SectionTitle>New order</SectionTitle>
            <Select
                isMulti 
                options={options}
                instanceId={id} 
            />
        </>
    ) : null;
};

export default newOrder;