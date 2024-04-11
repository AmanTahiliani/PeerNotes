import { Link } from "react-router-dom";
import "../styles/Login.css"
export default function Signup() {
    return (
        <main>
            <form className="login-container">
                <h1>Sign Up</h1>
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