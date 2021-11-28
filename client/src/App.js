import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import CharacterCreate from "./components/CharacterCreate"
import Detail from "./components/Detail"

function App() {
  return (           

    <Router>
      <div className="App">
      <Routes>
          <Route exact path="/" element={ <LandingPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path = "/character" element={<CharacterCreate/>} />
          <Route path = "/home/:id" element={<Detail/>} />
      </Routes>
      </div>
    </Router>   

  );
}

export default App;
