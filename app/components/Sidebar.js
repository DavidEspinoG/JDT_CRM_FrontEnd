"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathName = usePathname();
    const links = [
        { href: '/orders', displayText: 'Orders' },
        { href: '/', displayText: 'Clients' },
        { href: '/products', displayText: 'Products' },
        { href: '/login', displayText: 'Log in' }
    ]
    return (
        <aside className="bg-gray-800 w-full sm:w-1/3 xl:w-1/5 min-h-screen p-5">
            <div>
                <Link href="/">
                    <p className="text-white text-2xl font-black">CRM Clients</p>
                </Link>
                <nav className="pt-3">
                    <ul>
                        {links.map((link) => (
                            <li key={link.displayText} className={pathName == link.href ? 'bg-blue-700 p-2' : 'p-2'}>
                                <Link href={link.href} className={`text-white my-3 block`}>
                                    {link.displayText}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;