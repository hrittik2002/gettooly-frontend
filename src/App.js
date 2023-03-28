import './App.css';
import Login from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import AfterLoginHomePage from './pages/AfterLoginHomePage/AfterLoginHomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeforeLoginHomePage from './pages/BeforeLoginHomePage/BeforeLoginHomePage';
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ConductUser/:userId" exact element={<AfterLoginHomePage/>}/> 
        <Route path="/ConductUser/:userId/about" exact element={<AboutPage/>}/>
        <Route path="/" exact element={<BeforeLoginHomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
