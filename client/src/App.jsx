
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Lobby />} />
        <Route exact path="/room/:roomId" element={<Room/>} />
      </Routes>
    </>
  );
}

export default App;
