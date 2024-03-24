import "./styles/App.css";
import { Link } from 'react-router-dom';

export default function App() {

  return (
    <>
      <Navbar />
      <h1>PeerNotes</h1>
    </>
  )
}

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
}