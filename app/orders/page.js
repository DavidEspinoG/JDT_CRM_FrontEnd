import SectionTitle from "../components/SectionTitle";
import Link from "next/link";

const Orders = () => {
    return (
        <>
            <SectionTitle>
                Orders
            </SectionTitle>
            <Link
                href="/newOrder"
                className="bg-slate-700 text-white uppercase text-sm py-2 px-3 rounded hover:bg-slate-900 inline-block mt-3"
            > 
                Add new Order
            </Link>
        </>
    )
};

export default Orders;