"use client"

import {useState, useEffect} from "react";
import Link from "next/link";
import fetchData, {FetchUsername} from "./fetchData";
import logout from "@/app/user/logout/logout";
import {UserProvider, useUser} from "@/app/UserContext";
import {usePathname} from "next/navigation";

export default function ClientRootLayout({children}: { children: React.ReactNode, noMargin?: boolean }) {
    const {updateUserData} = useUser();

    useEffect(() => {
        const fetchUserData = async () => {
            const loggedInUsername: string = await FetchUsername();
            if (loggedInUsername != "Not Logged in") {
                const fetchedData = await fetchData(loggedInUsername);
                if (fetchedData) {
                    updateUserData({
                        username: fetchedData.username,
                        description: fetchedData.description,
                        profilePicture: fetchedData.profilePicture,
                        bannerPicture: fetchedData.bannerPicture,
                    });
                }
            }
        };
        fetchUserData();
    }, []);

    const {username, setUsername} = useUser();
    const isLoggedin = username !== "Not logged in";
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout(setUsername);
        updateUserData({
            username: "Not logged in",
            description: "",
            profilePicture: "",
            bannerPicture: "",
        })
    };

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const pathname = usePathname();
    const noMargin = pathname === '/user/dashboard';


    return (
        <div>
            <header
                className={`relative flex gap-5 items-center justify-between border-b-2 border-foreground p-2 ${noMargin ? '' : 'mx-6'}`}
                style={{height: "13vh", boxSizing: "border-box", zIndex: 1000}}
            >
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
                        onClick={handleMenuToggle}
                    >
                        {username} {/* Use username from UserContext */}
                    </button>

                    {menuOpen && (
                        <div
                            className="absolute mt-2 w-48 bg-background border-2 border-foreground rounded-md shadow-lg"
                            style={{top: "3.5rem", right: "-0.1rem"}}
                        >
                            <ul className="flex flex-col p-0">
                                <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                    <Link href="/user/dashboard">Dashboard</Link>
                                </li>
                                <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                    <Link href="/user/settings">Settings</Link>
                                </li>
                                {isLoggedin && (
                                    <li
                                        className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300"
                                        onClick={handleLogout}
                                    >
                                        <a href="#">Logout</a>
                                    </li>
                                )}
                                {!isLoggedin && (
                                    <li className="p-2 hover:underline hover:scale-110 transition-all ease-in-out duration-300">
                                        <a href="/user/login">Login</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className={"flex justify-center items-center"} style={{height: "80vh"}}>
                <main>{children}</main>
            </div>
        </div>
    );
}