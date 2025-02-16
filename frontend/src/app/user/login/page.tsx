"use client"

import login from "@/app/user/login/login";
import Link from "next/link";

export default function Page() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        login(username, password);
    };

    return <div>
        <form className={"grid grid-cols-1 gap-4"} onSubmit={handleSubmit}>
            <label htmlFor={"username"}>Username: </label>
            <input
                id={"username"} name="username" type="text" placeholder="Username" className={"pl-2 text-background"}/>
            <label htmlFor={"password"}>Password: </label>
            <input
                id={"password"} name="password" type="password" placeholder="Password" className={"pl-2 text-background"}/>
            <button type="submit" className={"bg-violet text-white"}>Login</button>
        </form>
        <p className={"scale-75"}>Don't have an account? <Link className="underline hover:text-violet" href={"../user/register"}>Register</Link></p>
    </div>
}