import ClientRootLayout from "./layoutClient";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata = {
    title: "Collab",
    description: "Collab is a forum to share knowledge and ideas with others.",
};

// Simulates fetching username from an API
async function fetchUsername(): Promise<string> {
    interface User {
        username: string;
    }

    try {
        const response = await fetch("http://localhost:8000/api/username");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json: User = await response.json();
        console.log(json.username)
        return json.username;
    } catch (err) {
        console.error("Failed to fetch username:", err);
        return "Not logged in";
    }
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const username = await fetchUsername();

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased` } style={{height: "100vh"}}>
        <ClientRootLayout username={username}>{children}</ClientRootLayout>
        </body>
        </html>
    );
}