import { useCallback, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useSocket } from "../context/SocketProvider";
export default function Lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  
  const navigate=useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleRoomJoin=useCallback((data)=>{
    const {email,room}=data;
    // console.log(email,room)
    navigate(`/room/${room}`)
  },[navigate]);

  useEffect(()=>{
    socket.on("room:join",handleRoomJoin)
    return ()=>{
      socket.off('room:join',handleRoomJoin)
    }
  },[handleRoomJoin, socket])
  
  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <br />
        <label htmlFor="room">Room No.</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="room"
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}
