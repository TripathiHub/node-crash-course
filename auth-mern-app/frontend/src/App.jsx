import {Routes,Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
function App() {
  return (
    <>
    <section id="center">
        <Routes>
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/home" element={<Home/>}/>
           <Route path="/" element={<Navigate to="/Signup"/>}/>
        </Routes>
    </section>  
    </>
  )
}

export default App;
