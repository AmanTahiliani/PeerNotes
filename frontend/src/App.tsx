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
  const linkStyle = {
    textDecoration: 'none', 
    color: 'black',
    background: '#B1D4E0', 
    padding: '8px 16px', 
    borderRadius: '5px',
    margin: '0 5px' 
  };
  const session = useContext(SessionContext);
  const logout = () => {
    destroySessionCookie();
    window.location.reload();
  }

  const links = session ? (
    <>
      <img src="/PeerNotes.png" alt="PeerNotes Logo" style={{ height: '60px', marginRight: '10px' }} />
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/search" style={linkStyle}>Search</Link>
      <a onClick={logout} style={linkStyle}>Logout</a>
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