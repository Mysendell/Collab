"use client"

import { useUser } from "@/app/UserContext";

export default function Page() {
    const { username } = useUser();

    return <div>Username: {username}</div>;
}