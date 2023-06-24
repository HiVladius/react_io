import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: message,
      from: "me: ",
    };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  const reciveMessage = (message) =>
    setMessages((state) => [...state, message]);
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-10">
        <h1 className="text-3xl text-blue-300 font-bold mb-10">Chat</h1>
        <input
          type="text"
          placeholder="white your message..."
          className="bourder-2 border-gray-500 p-2 w-full text-black"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="my-3 bg-teal-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-color duration-300 cursor-pointer " >
        Send
        </button>
        <ul>
        {messages.map((message, index) => (
          <li key={index} className= {
            `my-2 p-2 table text-sm rounded-md text-black ${message.from === "me: " ? "bg-teal-200 ml-auto" : "bg-blue-200 mr-auto"}`
          }>
            <span className="text-tx text-black mr-3 block">{message.from}</span>
            <span className="text-sm">{message.body}</span>
          </li>
        ))}
      </ul>
      </form>
     
    </div>
  );
}

export default App;
