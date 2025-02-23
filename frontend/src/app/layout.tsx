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

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased` } style={{height: "100vh"}}>
        <ClientRootLayout>{children}</ClientRootLayout>
        </body>
        </html>
    );
}