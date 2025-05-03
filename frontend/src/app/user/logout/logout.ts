import {getCsrfTokenFromCookie} from "@/app/Utility";

export default async function logout(setUsername?: (username: string) => void): Promise<string> {
    interface answer {
        message: string;
    }

    const csrfToken: string | null = getCsrfTokenFromCookie();

    try {
        const response = await fetch("http://localhost:8000/api/user/logout", {
            method: "DELETE",
            headers: {
                ...(csrfToken && { 'X-CSRFToken': csrfToken })
            },
            credentials: "include"
        });
        if (!response.ok) {
            if (response.status === 401) {
                return "User not logged in";
            }
            console.log(response.json());
            return "Failed to logout";
        }
        let json: answer = await response.json();
        setUsername!("Not logged in");
        return json.message;
    } catch (err) {
        console.error("Failed to logout:", err);
        return "Failed to logout";
    }
}