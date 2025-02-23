export async function uploadProfilePicture(file: File) : Promise<string> {
    try {
        let csrfToken : string | null = getCsrfTokenFromCookie();

        const formData = new FormData();
        formData.append("profilePicture", file);
        const response = await fetch("http://localhost:8000/api/profilePicture", {
            method: "POST",
            headers: {
                ...(csrfToken && {"X-CSRFToken": csrfToken}),
            },
            body: formData,
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to upload profile picture");
        }
        const data = await response.json();
        return "http://localhost:8000" + data.message;
    } catch (error) {
        console.error("Error during profile picture upload:", error);
        return "http://localhost:8000";
    }
}

export async function uploadBannerPicture(file: File) : Promise<string> {
    try {
        let csrfToken : string | null = getCsrfTokenFromCookie();

        const formData = new FormData();
        formData.append("bannerPicture", file);
        const response = await fetch("http://localhost:8000/api/bannerPicture", {
            method: "POST",
            headers: {
                ...(csrfToken && {"X-CSRFToken": csrfToken}),
            },
            body: formData,
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to upload banner picture");
        }
        const data = await response.json();
        return "http://localhost:8000" + data.message;
    } catch (error) {
        console.error("Error during banner picture upload:", error);
        return "http://localhost:8000";
    }
}

export async function updateDescription(newDescription: string): Promise<void> {
    try {
        let csrfToken: string | null = getCsrfTokenFromCookie();
        const response = await fetch("http://localhost:8000/api/description", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(csrfToken && { "X-CSRFToken": csrfToken }),
            },
            body: JSON.stringify({ description: newDescription }),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to update description");
        }
    } catch (error) {
        console.error("Error updating description:", error);
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