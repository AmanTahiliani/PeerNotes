import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"
import { FormEvent } from "react";
import { useSessionRedirect } from "../hooks/sessionRedirect";
export default function Signup() {
    const navigate = useNavigate();
    useSessionRedirect();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        fetch('http://localhost:8000/api/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        })
        .then(response => response.json())
        .then(() => {
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
        <main>
            <form className="login-container" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-input">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button className="submit-button">Sign up</button>
                <p>or <Link to="/login">Login</Link></p>
            </form>
        </main>
    );
}