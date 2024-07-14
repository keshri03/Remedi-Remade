import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import SignIn from "./Pages/SignIn"
import User from "./Pages/User"; // Adjust the import paths as necessary
import Ngo from "./Pages/Ngo"; // Adjust the import paths as necessary
import About from "./Pages/About";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user" element={<User />} />
      <Route path="/ngo" element={<Ngo/>} /> // Dynamic route for
      <Route path="/about" element={<About />} /> // Dynamic route for
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}


export default App;
