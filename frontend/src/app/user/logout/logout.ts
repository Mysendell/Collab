export default async function logout(setUsername?: (username: string) => void): Promise<string> {
    interface answer {
        message: string;
    }

    const csrfToken: string | null = getCsrfTokenFromCookie();

    try {
        const response = await fetch("http://localhost:8000/api/logout", {
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

function getCsrfTokenFromCookie(): string | null {
    let cookieValue = null;
    const name: string = "csrftoken";
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

}