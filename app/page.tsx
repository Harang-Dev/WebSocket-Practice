"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`wss://${process.env.NEXT_PUBLIC_SERVER_URL}`);

function ChatClient() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("메세지", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>🟢 실시간 채팅</h2>
      <div style={{ height: "150px", overflowY: "auto", border: "1px solid #ccc", marginBottom: "1rem" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>💬 {msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default ChatClient;
