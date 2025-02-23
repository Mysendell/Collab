"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import fetchData from "./fetchData";
import logout from "@/app/user/logout/logout";
import { UserProvider } from "@/app/UserContext";

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string>("Not logged in");
    const [description, setDescription] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [bannerPicture, setBannerPicture] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedData = await fetchData();
            if (fetchedData) {
                setUsername(fetchedData.username);
                setDescription(fetchedData.description);
                setProfilePicture(fetchedData.profilePicture);
                setBannerPicture(fetchedData.bannerPicture);
                setIsAdmin(fetchedData.isAdmin);
                setIsLoggedin(fetchedData.username !== "Not logged in");
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await logout(setUsername);
        setIsLoggedin(false);
    };

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <UserProvider value={{ username, setUsername, description, setDescription, profilePicture, setProfilePicture, bannerPicture, setBannerPicture,isAdmin, setIsAdmin }}>
            <div>
                <header
                    className="mx-6 flex gap-5 items-center justify-between border-b-2 border-foreground p-2"
                    style={{ height: "13vh", boxSizing: "border-box" }}
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
                            {username}
                        </button>

                        {menuOpen && (
                            <div
                                className="absolute mt-2 w-48 bg-background border-2 border-foreground rounded-md shadow-lg"
                                style={{ top: "3.5rem", right: "-0.1rem" }}
                            >
                                <ul className="flex flex-col p-2">
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
                <div className={"flex justify-center items-center"} style={{ height: "80vh" }}>
                    <main>{children}</main>
                </div>
            </div>
        </UserProvider>
    );
}