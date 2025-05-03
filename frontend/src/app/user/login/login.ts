import {getCsrfTokenFromCookie} from "@/app/Utility";

export default async function login(username: string, password: string) : Promise<string> {
    try {
        interface answer{
            message: string;
        }

        const csrfToken: string | null = getCsrfTokenFromCookie();

        const response = await fetch('http://localhost:8000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && {'X-CSRFToken': csrfToken}),

            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });
        let json : answer = await response.json();
        if (response.ok) {
            console.log('Login successful:', json);
            return "successfully logged in";
        } else {
            console.error('Login failed:', response.status);
            return json.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
        return "error";
    }
}