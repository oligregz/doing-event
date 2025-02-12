import "./styles/styles.css";
import Signin from "./components/signin/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Events from "./components/events/Events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
