"use client";

import {useState} from "react";
import Link from "next/link";

export default function ClientRootLayout({
                                             username,
                                             children,
                                         }: {
    username: string;
    children: React.ReactNode;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedin : boolean = username !== "Not Logged in";
    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div>
            <header className="flex gap-5 items-center justify-between border-b-2 border-foreground p-2" style={{height: "12vh", boxSizing: "border-box"}}>
                <div className="flex gap-10 items-center mx-auto">
                    <Link
                        className="hover:underline hover:scale-110 transition-all ease-in-out duration-300 text-4xl leading-none"
                        href="/"
                    >
                        Collab
                    </Link>
                    <span className="border-r-2 border-foreground h-14"></span>
                    <Link
                        className="hover:underline leading-none hover:scale-110 transition-all ease-in-out duration-300"
                        href="/forums"
                    >
                        Forums
                    </Link>
                    <input
                        id="searchbar"
                        type="text"
                        placeholder="Search"
                        className="text-background placeholder-background pl-5"
                    />
                    <Link
                        className="hover:underline leading-none hover:scale-110 transition-all ease-in-out duration-300"
                        href="/about"
                    >
                        About
                    </Link>
                </div>

                <div className="relative">
                    <button
                        className="hover:underline pr-5 border-l-2 border-foreground pl-4 h-14"
                        onClick={handleMenuToggle}>
                        {username}
                    </button>

                    {menuOpen && (
                        <div
                            className="absolute mt-2 w-48 bg-background border-2 border-foreground rounded-md shadow-lg"
                            style={{ top: "3.5rem", right:"-0.1rem"}}>
                            <ul className="flex flex-col p-2">
                                <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                    <Link href="/profile">Profile</Link>
                                </li>
                                <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                    <Link href="/settings">Settings</Link>
                                </li>
                                {isLoggedin &&(
                                <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                    <a href="/user/logout">Logout</a>
                                </li>)}
                                {!isLoggedin &&(
                                    <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                        <a href="/user/login">Login</a>
                                    </li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className={"flex justify-center items-center"} style={{"height": "80vh"}}>
                <main>{children}</main>
                <footer></footer>
            </div>
        </div>
    );
}