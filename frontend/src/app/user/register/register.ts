export default async function register(username: string, password: string) {
    try {
        const csrfToken : string | null = getCsrfTokenFromCookie();

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRFToken': csrfToken }),
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Register successful:', data);
        } else {
            console.error('Register failed:', response.status);
        }
    } catch (error) {
        console.error('Error during Register:', error);
    }
}

function getCsrfTokenFromCookie(): string | null{
    let cookieValue = null;
    const name : string = "csrftoken";
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

}
