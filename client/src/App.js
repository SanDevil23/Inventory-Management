import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// import Masters from './pages/Masters';
import Customers from './components/Customers';
import Items from './components/Items';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/items" element={<Items/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

