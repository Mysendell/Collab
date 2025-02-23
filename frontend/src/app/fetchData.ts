class User {
    username: string = "";
    description: string = "";
    profilePicture: string = "";
    bannerPicture: string = "";
    isAdmin: boolean = false;
}

export default async function fetchData(): Promise<User | null> {
    try {
        const response = await fetch("http://localhost:8000/api/user_data", {
            method: "GET",
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json: User = await response.json();
        json.profilePicture = "http://localhost:8000" + json.profilePicture;
        json.bannerPicture = "http://localhost:8000" + json.bannerPicture;
        return json;
    } catch (err) {
        console.error("Failed to fetch user data:", err);
        return null;
    }
}