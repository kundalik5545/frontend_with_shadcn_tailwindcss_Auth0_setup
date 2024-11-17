import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//Navbar page
// import NavbarMain from "./components/Navbar/NavbarMain";
// Basic Pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        {/* <NavbarMain /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
