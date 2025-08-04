// import { useEffect, useState } from "react";
// import "./App.css";
// import Header from "./components/Header";
// import { RiRobot3Fill } from "react-icons/ri";
// import ChatWidget from "./components/ChatWidget";

import { RiRobot3Fill } from "react-icons/ri";
import ChatWidget from "./components/ChatWidget";
import { useState } from "react";

// const App = () => {
//   const [open, setOpen] = useState(false);
//   const [theme, setTheme] = useState(
//     () => localStorage.getItem("theme") || "light"
//   );

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, [theme]);

//   useEffect(() => {
//     const iframe = document.querySelector("iframe");
//     if (iframe) {
//       iframe.contentWindow?.postMessage({ theme }, "*");
//     }
//   }, [theme]);

//   return (
//     <div
//       className={`flex flex-col min-h-screen transition-all ease-in-out ${
//         theme === "dark" ? "dark" : ""
//       }`}
//     >
//       {/* <Header theme={theme} toggleTheme={toggleTheme} /> */}

//       <div
//         className="flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 flex-col gap-4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center
//   order-2 sm:order-1"
//       >
//         Gemini Chat Bot
//       </div>

//       {!open ? (
//         <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex justify-end">
//           <button onClick={() => setOpen(true)}>
//             <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] shadow-lg flex items-center justify-center mb-4 hover:opacity-90 transition-opacity">
//               <RiRobot3Fill className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
//             </div>
//           </button>
//         </div>
//       ) : (
//         <div className="fixed bottom-24 right-4 sm:bottom-20 sm:right-6 z-50 w-[90vw] max-w-md">
//           <div className="relative bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
//             {/* <iframe
//               src="/chatbot"
//               className="w-full h-[60vh] sm:h-[70vh]"
//               title="Chatbot"
//             ></iframe> */}
//             <ChatWidget />

//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-2 right-2 text-xl text-red-600 hover:text-red-400 bg-transparent"
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




// Demo App Component
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500 ${theme === "dark" ? "dark" : ""}`}>
      {/* Demo Page Content */}
      {/* <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            My Website
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Experience the future of AI conversations with our advanced chatbot. Get instant, intelligent responses to all your questions.
          </p>
          
          <div className="mb-8">
            <button
              onClick={toggleTheme}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                About Our Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our AI-powered chatbot provides instant, accurate responses to help solve your problems efficiently. Built with cutting-edge technology for the best user experience.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Features
              </h2>
              <ul className="text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                  Real-time streaming responses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                  Smart AI conversations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></span>
                  Beautiful dark/light themes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></span>
                  Fully responsive design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-18 h-18 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50 animate-pulse"
        >
          <RiRobot3Fill className="text-white text-3xl" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <ChatWidget 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
            theme={theme} 
          />
        </div>
      )}
    </div>
  );
};

export default App;
