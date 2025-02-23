"use client"

import {useRef, useEffect} from "react";
import register from "@/app/user/register/register";
import Link from "next/link";
import login from "@/app/user/login/login";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    const usernameRef = useRef<HTMLInputElement>(null);
    const usernameDivRef = useRef<HTMLDivElement>(null);
    const passwordDivRef = useRef<HTMLDivElement>(null);
    const password1Ref = useRef<HTMLInputElement>(null);
    const password2Ref = useRef<HTMLInputElement>(null);
    const li1 = useRef<HTMLLIElement>(null);
    const li2 = useRef<HTMLLIElement>(null);
    const li3 = useRef<HTMLLIElement>(null);
    const li4 = useRef<HTMLLIElement>(null);
    const li5 = useRef<HTMLLIElement>(null);
    const li6 = useRef<HTMLLIElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const username = formData.get("username") as string;
            const password = formData.get("password") as string;
            const passwordConfirmation = formData.get("passwordConfirmation") as string;

            password1Ref.current!.classList.remove("border-red-500");
            password2Ref.current!.classList.remove("border-red-500");
            passwordDivRef.current!.innerText = "​";
            usernameRef.current!.classList.remove("border-red-500");
            usernameDivRef.current!.innerText = "​";

            li1.current!.classList.remove("text-red-500");
            li2.current!.classList.remove("text-red-500");
            li3.current!.classList.remove("text-red-500");
            li4.current!.classList.remove("text-red-500");
            li5.current!.classList.remove("text-red-500");
            li6.current!.classList.remove("text-red-500");

            let error: boolean = false
            let cantHave = /[\s"'<>,]/;
            let mustHave1 = /[!@#$%^&*()_+\-=\[\]{};:\\|.\/?]/;
            let mustHave2 = /[A-Z]/;
            let mustHave3 = /[a-z]/;
            let mustHave4 = /[0-9]/;
            let mustHave5 = /01|12|23|34|45|56|67|78|89|98|87|76|65|54|43|32|21|10/;
            let mustHave6 = /^.{8,}$/;


            if (!mustHave1.test(password)) {
                li4.current!.classList.add("text-red-500");
                error = true
            }
            if (!mustHave2.test(password)) {
                li2.current!.classList.add("text-red-500");
                error = true
            }
            if (!mustHave3.test(password)) {
                li3.current!.classList.add("text-red-500");
                error = true
            }
            if (!mustHave4.test(password)) {
                li5.current!.classList.add("text-red-500");
                error = true
            }
            if (mustHave5.test(password)) {
                li6.current!.classList.add("text-red-500");
                error = true
            }
            if (!mustHave6.test(password)) {
                li1.current!.classList.add("text-red-500");
                error = true
            }

            if (error) {
                password1Ref.current!.classList.add("border-red-500");
                passwordDivRef.current!.innerText = "Password doesn't match the requirements";
            }

            if (cantHave.test(username)) {
                usernameRef.current!.classList.add("border-red-500");
                usernameDivRef.current!.innerText = `Names can't have spaces, ", ', < or >`;
                error = true;
            }
            if (cantHave.test(password)) {
                password1Ref.current!.classList.add("border-red-500");
                passwordDivRef.current!.innerText = `Passwords can't have spaces, ", ', < or >`;
                error = true;
            }

            if (password !== passwordConfirmation) {
                password1Ref.current!.classList.add("border-red-500");
                password2Ref.current!.classList.add("border-red-500");
                passwordDivRef.current!.innerText = "Passwords do not match.";
                error = true;
            }

            if (error) return;

            var response: string = await register(username, password);
            if (response === "Username already exists.") {
                usernameRef.current!.classList.add("border-red-500");
                usernameDivRef.current!.innerText = response;
            }
            if (response === "") {
                await login(username, password);
                router.push('/user/dashboard'); // Redirect to the dashboard or any other route
            }

        }
    ;

    return <div className={"flex gap-5 items-center justify-between"}>
        <form className={"grid grid-cols-1 gap-4 w-[30rem]"} onSubmit={handleSubmit}>
            <label htmlFor={"username"}>Username: </label>
            <input id={"username"} name="username" type="text" placeholder="Username"
                   className={"pl-2 text-background border-2"} ref={usernameRef}/>
            <div ref={usernameDivRef} className={"h-3 text-red-500"}>​</div>
            <label htmlFor={"password"}>Password: </label>
            <input ref={password1Ref}
                   id={"password"} name="password" type="password" placeholder="Password"
                   className={"pl-2 text-background border-2"}/>
            <label htmlFor={"passwordConfirmation"}>Confirm password: </label>
            <input ref={password2Ref}
                   id={"passwordConfirmation"} name="passwordConfirmation" type="password"
                   placeholder="Confirm Password"
                   className={"pl-2 text-background border-2"}/>
            <div ref={passwordDivRef} className={"h-3 text-red-500"}>​</div>
            <button type="submit" className={"bg-violet text-white"}>Register</button>
            <p className={"scale-75"}>Already have an account? <Link className="underline hover:text-violet"
                                                                     href={"../user/login"}>Login</Link></p>
        </form>
        <div>
            Password Requirements:
            <ul className={"list-disc list-inside"}>
                <li ref={li1}>Must have at least 8 characters</li>
                <li ref={li2}>Must contain at least one uppercase character</li>
                <li ref={li3}>Must contain at least one lowercase letter</li>
                <li ref={li4}>Must contain at least one special character</li>
                <li ref={li5}>Must contain at least one number</li>
                <li ref={li6}>Must not contain a number sequence</li>
            </ul>
        </div>
    </div>
}