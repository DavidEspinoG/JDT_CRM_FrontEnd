"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <aside className="bg-gray-800 w-full sm:w-1/3 xl:w-1/5 min-h-screen p-5">
            <div>
                <Link href="/">
                    <p className="text-white text-2xl font-black">CRM Clients</p>
                </Link>
                <nav className="pt-3">
                    <ul>
                        <li className={pathName == '/orders' ? 'bg-blue-700 p-2' : 'p-2'}>
                            <Link href="/orders" className={`text-white my-3 block`}>
                                Orders
                            </Link>
                        </li>
                        <li className={pathName == '/' ? 'bg-blue-700 p-2' : 'p-2'}>
                            <Link href="/" className={`text-white my-3 block`}>
                                Clients
                            </Link>
                        </li>
                        <li className={pathName == '/products' ? 'bg-blue-700 p-2' : 'p-2'}>
                            <Link href="/products" className={`text-white my-3 block`}>
                                Products
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;