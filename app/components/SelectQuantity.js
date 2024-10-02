import { useContext } from "react";
import ordersContext from "../context/orders/ordersContext";

const SelectQuantity = () => {
    const { state, updateQuantity } = useContext(ordersContext);
    const { products } = state;
    return (
        <>
            <p className="bg-white text-gray-700 py-2 px-3 border-l-4 border-l-blue-500 mb-3 mt-3">Select quantity</p>
            { products.map((product) => (
                <div className="flex justify-between gap-3 p-2" key={product.id}>
                    <h3>{product.name} ${product.price}</h3>
                    <input 
                        type="number" 
                        min={0} 
                        className="px-2 rounded"
                        onChange={(e) => updateQuantity({
                            id: product.id,
                            quantity: parseInt(e.target.value) 
                        })}
                    />
                </div>
            ))}
        </>
    )
    
};

export default SelectQuantity;