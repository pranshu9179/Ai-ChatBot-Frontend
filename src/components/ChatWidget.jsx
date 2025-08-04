// import { useState, useEffect, useRef } from "react";
// import Message from "./Message";
// import InputArea from "./InputArea";
// import TypingIndicator from "./TypingIndicator";
// import { RiRobot3Fill } from "react-icons/ri";

// const ChatWidget = ({ theme }) => {
//   const [messages, setMessages] = useState([{ type: "info" }]);
//   const [isTyping, setIsTyping] = useState(false);
//   const chatRef = useRef(null);

//   useEffect(() => {
//     const handleMessage = (event) => {
//       const { theme } = event.data;
//       if (theme) {
//         document.documentElement.classList.toggle("dark", theme === "dark");
//       }
//     };

//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, []);

//   useEffect(() => {
//     chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
//   }, [messages, isTyping]);

//   const sendMessage = async (userInput) => {
//     if (!userInput.trim()) return;

//     setMessages((prev) => [
//       ...prev,
//       { type: "text", text: userInput, from: "user" },
//     ]);
//     setIsTyping(true);

//     const eventSource = new EventSource(
//       `https://ai-chatbot-5ji7.onrender.com/chat?message=${encodeURIComponent(
//         userInput
//       )}`
//     );

//     let botText = "";

//     eventSource.onmessage = (event) => {
//       if (event.data === "[DONE]") {
//         setMessages((prev) => [
//           ...prev,
//           { type: "text", text: botText, from: "bot" },
//         ]);
//         setIsTyping(false);
//         eventSource.close();
//       } else {
//         botText += event.data;
//       }
//     };

//     eventSource.onerror = () => {
//       setMessages((prev) => [
//         ...prev,
//         { type: "error", text: "Error receiving response." },
//       ]);
//       setIsTyping(false);
//       eventSource.close();
//     };
//   };

//   return (
//     <div
//       className={`w-full max-w-md h-[100vh] max-h-[100vh] bg-gray-200 dark:bg-gray-900 rounded-sm shadow-lg flex flex-col text-gray-900 dark:text-white ${
//         theme === "dark" ? "dark" : ""
//       }`}
//     >
//       <div className="bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] dark:bg-gray-800 text-white p-3 flex justify-between items-center">
//         <span className="text-2xl font-bold text-black dark:text-white">
//           Gemini Chat
//         </span>
//       </div>

//       <div
//         ref={chatRef}
//         className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-200 dark:bg-gray-900"
//       >
//         {messages.length === 1 && !isTyping ? (
//           <div className="text-center py-6 flex flex-col items-center justify-center h-full">
//             <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] shadow-lg flex items-center justify-center mb-4 hover:opacity-90 transition-opacity">
//               <RiRobot3Fill className="text-white w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12" />
//             </div>

//             <div className="text-3xl font-semibold">Welcome</div>
//           </div>
//         ) : (
//           messages.map((msg, i) => <Message key={i} {...msg} />)
//         )}
//         {isTyping && <TypingIndicator />}
//       </div>

//       <InputArea onSend={sendMessage} />
//     </div>
//   );
// };

// export default ChatWidget;

import { useState, useEffect, useRef } from "react";
import {
  RiRobot3Fill,
  RiUser3Fill,
  RiSendPlaneFill,
  RiCloseFill,
} from "react-icons/ri";

// Message Component
const Message = ({ type, text, from }) => {
  if (type === "info") return null;

  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        from === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {from === "bot" && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
          <RiRobot3Fill className="text-white text-lg" />
        </div>
      )}

      <div
        className={`max-w-[75%] p-4 rounded-2xl shadow-md ${
          from === "user"
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-md"
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-md border border-gray-100 dark:border-gray-700"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
      </div>

      {from === "user" && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <RiUser3Fill className="text-white text-lg" />
        </div>
      )}
    </div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => (
  <div className="flex items-start gap-3 mb-4">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
      <RiRobot3Fill className="text-white text-lg" />
    </div>
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-md shadow-md border border-gray-100 dark:border-gray-700">
      <div className="flex space-x-1">
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
        <div
          className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  </div>
);

// Input Area Component
const InputArea = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-4 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-md"
        >
          <RiSendPlaneFill className="text-lg" />
        </button>
      </div>
    </div>
  );
};

// Main ChatWidget Component
const ChatWidget = ({ isOpen = true, onClose, theme = "light" }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

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

    // Your existing API call code here
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

  if (!isOpen) return null;

  return (
    <div
      style={{ height: "100%" }}
      className={`w-full bg-transparent rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-sm ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-6 flex justify-between items-center rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <RiRobot3Fill className="text-white text-xl" />
          </div>
          <div>
            <span className="text-xl font-bold">Gemini Chat</span>
            <div className="text-sm opacity-90">AI Assistant</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <RiCloseFill className="text-xl" />
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
          `,
        }}
      >
        {messages.length === 0 && !isTyping ? (
          <div className="text-center py-12 flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center mb-6 animate-pulse">
              <RiRobot3Fill className="text-white text-3xl" />
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Welcome to Gemini Chat
            </div>
            <div className="text-base text-gray-600 dark:text-gray-400 max-w-xs">
              I'm your AI assistant. How can I help you today?
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg, i) => (
              <Message key={i} {...msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input Area */}
      <InputArea onSend={sendMessage} />
    </div>
  );
};

export default ChatWidget;
