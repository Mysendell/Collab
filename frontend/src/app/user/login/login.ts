export default async function login(username: string, password: string) {
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
        } else {
            console.error('Login failed:', response.status);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}