import "./styles/App.css";
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { SessionContext, destroySessionCookie, getSessionCookie } from "./contexts/session";
import { useState, useEffect, useContext } from "react";

export default function App() {
  const [session, setSession] = useState(getSessionCookie());
  const navigate = useNavigate();

  // Redirect to login if session is undefined
  useEffect(
    () => {
      setSession(getSessionCookie());
      if (session === undefined) {
        navigate("/login");
      }
    },
    [session, navigate]
  ); 

  return (
    <>
      <SessionContext.Provider value={session}>
          <Navbar />
          <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' , gap: 15}}>
            <Outlet />
          </div>
        </SessionContext.Provider>
    </>
  )
}
function Navbar() {
  const session = useContext(SessionContext);
  const logout = () => {
    destroySessionCookie();
    window.location.reload();
  }

  const links = session ? (
    <>
      <Link to="/">Home</Link>
      <a onClick={logout}>Logout</a>
    </>
  ): (
      <Link to="/login">Login</Link>
  )
  return (
    <nav>
     {links}
    </nav>
  );
}