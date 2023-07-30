import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const data = await fetch(`https://pc-builder-express.vercel.app/get-categories`);
        if (data.ok) {
            const result = await data.json();
            setCategories(result);
        } else {
            console.log('something went wrong')
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="navbar bg-purple-500 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 z-20">
                        <li>
                            <a>Categories</a>
                            <ul className="p-2">
                                {
                                    categories?.map(item => <li key={item._id}><Link href={`/categories/${item._id}`} className="w-[50px] text-center">{item.name}</Link></li>)
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">PC Builder</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 z-20">
                    <li tabIndex={0}>
                        <details>
                            <summary>Categories</summary>
                            <ul className="p-2">
                                {
                                    categories?.map(item => <li key={item._id}><Link href={`/category/${item._id}`} className="w-[150px] text-center">{item.name}</Link></li>)
                                }
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Build PC</a>
            </div>
        </div>
    );
};

export default Navbar;