import "./App.css";
import Dnd from "./components/Dnd";
import Slider from "./components/Slider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const images = [
    "/images/i0.jpg",
    "/images/i1.jpg",
    "/images/i2.jpg",
    "/images/i3.jpg",
    "/images/i4.jpg",
   
  ];

  return (
      <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Slider images={images}/>}/>
          <Route path="/Drag&Drop"  element={<Dnd/>}/>
        </Routes>
      </Router>
      
      </>

  );
}

export default App;
