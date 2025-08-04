import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputArea from "./InputArea";
import TypingIndicator from "./TypingIndicator";
import { RiRobot3Fill } from "react-icons/ri";

const ChatWidget = ({ theme }) => {
  const [messages, setMessages] = useState([{ type: "info" }]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      const { theme } = event.data;
      if (theme) {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, isTyping]);

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "text", text: userInput, from: "user" },
    ]);
    setIsTyping(true);

    const eventSource = new EventSource(
      `https://ai-chatbot-5ji7.onrender.com/chat?message=${encodeURIComponent(
        userInput
      )}`
    );

    let botText = "";

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setMessages((prev) => [
          ...prev,
          { type: "text", text: botText, from: "bot" },
        ]);
        setIsTyping(false);
        eventSource.close();
      } else {
        botText += event.data;
      }
    };

    eventSource.onerror = () => {
      setMessages((prev) => [
        ...prev,
        { type: "error", text: "Error receiving response." },
      ]);
      setIsTyping(false);
      eventSource.close();
    };
  };

  return (
    <div
      className={`w-full max-w-md h-[100vh] max-h-[100vh] bg-gray-200 dark:bg-gray-900 rounded-sm shadow-lg flex flex-col text-gray-900 dark:text-white ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] dark:bg-gray-800 text-white p-3 flex justify-between items-center">
        <span className="text-2xl font-bold text-black dark:text-white">
          Gemini Chat
        </span>
      </div>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-200 dark:bg-gray-900"
      >
        {messages.length === 1 && !isTyping ? (
          <div className="text-center py-6 flex flex-col items-center justify-center h-full">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] shadow-lg flex items-center justify-center mb-4 hover:opacity-90 transition-opacity">
              <RiRobot3Fill className="text-white w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>

            <div className="text-3xl font-semibold">Welcome</div>
          </div>
        ) : (
          messages.map((msg, i) => <Message key={i} {...msg} />)
        )}
        {isTyping && <TypingIndicator />}
      </div>

      <InputArea onSend={sendMessage} />
    </div>
  );
};

export default ChatWidget;
