"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GET_USER } from "../lib/queries";
import { useQuery } from "@apollo/client";

const Sidebar = () => {
    const { data, loading, error } = useQuery(GET_USER);
    const pathName = usePathname();
    const publicLinks = [
        { href: '/login', displayText: 'Log in' },
        { href: '/signin', displayText: 'Sign in' },
    ];
    const privateLinks = [
        { href: '/', displayText: 'Clients' },
        { href: '/orders', displayText: 'Orders' },
        { href: '/products', displayText: 'Products' },
    ]
    if(loading) return (
        <aside className="bg-gray-800 w-full sm:w-1/3 xl:w-1/5 min-h-screen p-5">
            <Link href="/">
                    <p className="text-white text-2xl font-black">CRM Clients</p>
            </Link>
        </aside>
    );

    return (
        <aside className="bg-gray-800 w-full sm:w-1/3 xl:w-1/5 min-h-screen p-5">
            <div>
                <Link href="/">
                    <p className="text-white text-2xl font-black">CRM Clients</p>
                </Link>
                <nav className="pt-3">
                    <ul>
                        { data.getUserFromToken ? 
                            privateLinks.map((link) => (
                                <li key={link.displayText} className={pathName == link.href ? 'bg-blue-700 p-2' : 'p-2'}>
                                    <Link href={link.href} className={`text-white my-3 block`}>
                                        {link.displayText}
                                    </Link>
                                </li>
                            ))
                            :
                            publicLinks.map((link) => (
                                <li key={link.displayText} className={pathName == link.href ? 'bg-blue-700 p-2' : 'p-2'}>
                                    <Link href={link.href} className={`text-white my-3 block`}>
                                        {link.displayText}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;