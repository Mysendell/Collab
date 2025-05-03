class User {
    username: string = "";
    description: string = "";
    profilePicture: string = "/defaultProfilePictures/Sigil1.png";
    bannerPicture: string = "/DefaultBanner/Banner.png";
    isAdmin: boolean = false;
}

export default async function fetchData(username: string): Promise<User> {
    try {
        const response = await fetch("http://localhost:8000/api/user/user_data?username="+username, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
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
        const user = new User();
        user.description = "Connection to the server couldn't be established";
        user.username = "Not logged in";
        return user;
    }
}

export async function FetchUsername():Promise<string>{
    return fetch("http://localhost:8000/api/user/username",
        {
            method: "GET",
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => data.username);
}