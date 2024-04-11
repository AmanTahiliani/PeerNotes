import "./styles/App.css";
import { Link } from 'react-router-dom';
import MainSearch from './components/MainSearch';

export default function App() {

  return (
    <>
      <Navbar />
      <h1>PeerNotes</h1>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img 
        src="/PeerNotes.png" 
        alt="PeerNotes Logo" 
        style={{ 
          height: "100px"
        }} 
      />
     <MainSearch />
    </div>
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