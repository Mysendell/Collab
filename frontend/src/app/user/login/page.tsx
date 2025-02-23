"use client"

import login from "@/app/user/login/login";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {useRef} from "react";

export default function Page() {
    const router = useRouter();
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const detailRef = useRef<HTMLParagraphElement>(null);
    const passwordDetailRef = useRef<HTMLParagraphElement>(null);
    const usernameDetailRef = useRef<HTMLParagraphElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        let cantHave = /[\s"'<>]/;

        passwordRef.current!.classList.remove("border-red-500");
        usernameRef.current!.classList.remove("border-red-500");
        detailRef.current!.innerText = "​"
        passwordDetailRef.current!.innerText = "​"
        usernameDetailRef.current!.innerText = "​"

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if(cantHave.test(username)){
            usernameRef.current!.classList.add("border-red-500");
            usernameDetailRef.current!.innerText = `Names can't have spaces, ", ', < or >`;
            return
        }
        if(cantHave.test(password)){
            passwordRef.current!.classList.add("border-red-500");
            passwordDetailRef.current!.innerText = `Passwords can't have spaces, ", ', < or >`;
            return
        }

        let response: string = await login(username, password);

        switch (response) {
            case "successfully logged in":
                router.push('/user/dashboard');
                break;
            case "Already logged in":
                passwordRef.current!.classList.add("border-red-500");
                usernameRef.current!.classList.add("border-red-500");
                detailRef.current!.innerText = "A user is already logged in"
                break;
            case "Username and password are required.":
                passwordRef.current!.classList.add("border-red-500");
                usernameRef.current!.classList.add("border-red-500");
                detailRef.current!.innerText = "Username and password are required";
                break;
            case "Invalid password":
                passwordRef.current!.classList.add("border-red-500");
                passwordDetailRef.current!.innerText = "Invalid password";
                break;
            case "User does not exist":
                usernameRef.current!.classList.add("border-red-500");
                usernameDetailRef.current!.innerText = "User does not exist";
                break;
        }
    };

    return <div>
        <form className={"grid grid-cols-1 gap-4"} onSubmit={handleSubmit}>
            <label htmlFor={"username"}>Username: </label>
            <input ref={usernameRef} id={"username"} name="username" type="text"
                   placeholder="Username" className={"pl-2 text-background border-2"}/>
            <p ref={usernameDetailRef} className={"text-red-500"}>​</p>
            <label htmlFor={"password"}>Password: </label>
            <input ref={passwordRef} id={"password"} name="password" type="password"
                   placeholder="Password" className={"pl-2 text-background border-2"}/>
            <p ref={passwordDetailRef} className={"text-red-500"}>​</p>
            <button type="submit" className={"bg-violet text-white"}>Login</button>
            <p ref={detailRef} className={"text-red-500"}>​</p>
        </form>
        <p className={"scale-75"}>Don't have an account? <Link className="underline hover:text-violet" href={"../user/register"}>Register</Link></p>
    </div>
}