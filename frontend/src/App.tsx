import './App.css'
import MainSearch from './components/MainSearch';

function App() {

  return (
    <>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' , gap: 15}}>
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

export default App
