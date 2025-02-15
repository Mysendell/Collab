import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Collab",
    description: "Collab is a forum to share knowledge and ideas with others.",
};

async function fetchUsername() : Promise<string>{
    interface User {
        username: string;
    }

    try {
        const response = await fetch("http://localhost:8000/api/username");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json : User = await response.json();
        return json.username;
    } catch (err) {
        console.error("Failed to fetch username:", err);
        return "Not logged in";
    }
}

export default async function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    const username: string = await fetchUsername();
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <header className={`flex gap-5 items-center justify-between border-b-2 border-foreground p-2 h-20`}>
            <div className="flex gap-10 items-center mx-auto">
                <Link
                    className="hover:underline hover:scale-110 transition-all ease-in-out duration-300 text-4xl leading-none"
                    href="/">Collab</Link>
                <span className="border-r-2 border-foreground h-14"></span>
                <Link className="hover:underline leading-none hover:scale-110 transition-all ease-in-out duration-300"
                      href="/forums">Forums</Link>
                <input id="searchbar" type="text" placeholder="Search"
                       className="text-background placeholder-background pl-5"/>
                <Link className="hover:underline leading-none hover:scale-110 transition-all ease-in-out duration-300"
                      href="/about">About</Link>
            </div>

            <button className="hover:underline pr-5 border-l-2 border-foreground pl-4 h-20"
                    id={"usernameButton"}>{username}</button>

        </header>
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {children}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
        </body>
        </html>
    );
}
