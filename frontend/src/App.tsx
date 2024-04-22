import "./styles/App.css";
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { SessionContext, destroySessionCookie, getSessionCookie } from "./contexts/session";
import { useState, useEffect, useContext } from "react";
import { usePoll } from "./hooks/usePoll";

export default function App() {
  const [session, setSession] = useState(getSessionCookie());
  const navigate = useNavigate();
  usePoll();
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
          <div className="App">
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
    // margin: '0 5px' 
  };
  const session = useContext(SessionContext);
  const logout = () => {
    destroySessionCookie();
    window.location.reload();
  }

  const links = session ? (
    <>
      <div>
        <img src="/PeerNotes.png" alt="PeerNotes Logo" style={{ height: '60px' }} />
        <Link to="/register" style={linkStyle}>Upload</Link>
        <Link to="/search" style={linkStyle}>Search</Link>
      </div>
      <div>
        <a onClick={logout} style={linkStyle}>Logout</a>
      </div>
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