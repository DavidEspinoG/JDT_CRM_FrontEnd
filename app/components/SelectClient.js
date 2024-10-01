import { useEffect, useState, useId } from "react";
import Select from "react-select";

const options = [
    { value: 'b8fd3c46-0894-4ce4-b7fe-ae6872386841', label: 'Chocolate' },
    { value: '4b4378b7-5fd3-46d6-b35a-611802616d9c', label: 'Strawberry' },
    { value: '1dd5a0b5-6e5a-42a8-afaf-208191513462', label: 'Vanilla' }
]

const SelectClient = () => {
    const [ isMounted, setIsMounted ] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    const id = useId();
    
    return isMounted ? (
        <>
            <Select
                isMulti 
                options={options}
                instanceId={id}
                onChange={(e) => console.log(e)} 
            />
        </>
    ) : null;
};

export default SelectClient;