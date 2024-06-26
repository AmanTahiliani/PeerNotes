import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import { FormEvent } from "react";
import { useSessionRedirect } from "../hooks/sessionRedirect";

export default function Login() {
  const navigate = useNavigate();
  
  useSessionRedirect();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username');
    const password = formData.get('password');
    fetch(`${import.meta.env.VITE_CENTRAL_SERVER}/api/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Login response data:", data);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        navigate('/search');
      } else {
          console.error('No token received:', data);
      }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }
  return (
      <main>
        <form className="login-container" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button className="submit-button">Login</button>
          <p>or <Link to="/signup">Sign up</Link></p>
        </form>
      </main>
  );
}