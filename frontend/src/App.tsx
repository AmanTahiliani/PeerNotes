import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainSearch from './components/MainSearch';
import Results from './components/Results';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100px', gap: 15 }}>
        </header>
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
