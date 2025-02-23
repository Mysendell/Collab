export default async function fetchUser(): Promise<string> {
    interface User {
        username: string | boolean;
    }

    try {
        const response = await fetch("http://localhost:8000/api/username",
            {
                method: "GET",
                credentials: "include"
            });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json: User = await response.json();
        console.log(json);
        if(typeof json.username === "string") {
            return json.username;
        }
        else
            return "Not logged in";
    } catch (err) {
        console.error("Failed to fetch username:", err);
        return "Not logged in";
    }
}