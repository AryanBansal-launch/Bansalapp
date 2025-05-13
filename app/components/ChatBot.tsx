"use client";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react"; // Or use any icon
import styles from "./ChatBot.module.css";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className={styles.chatButton} onClick={toggleChat}>
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span>💬 Launch Assistant</span>
            <button onClick={toggleChat} className={styles.closeButton}>×</button>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/gyEv2082AsoBEbIqNnuzn"
            width="100%"
            style={{ height: "100%", border: "none" }}
            title="Chatbot"
          />
        </div>
      )}
    </>
  );
}
