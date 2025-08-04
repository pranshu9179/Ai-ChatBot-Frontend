import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { RiRobot3Fill } from "react-icons/ri";

const App = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow?.postMessage({ theme }, "*");
    }
  }, [theme]);

  return (
    <div
      className={`flex flex-col min-h-screen transition-all ease-in-out ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div
        className="flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 flex-col gap-4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center
  order-2 sm:order-1"
      >
        Gemini Chat Bot
      </div>

      {!open ? (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex justify-end">
          <button onClick={() => setOpen(true)}>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] shadow-lg flex items-center justify-center mb-4 hover:opacity-90 transition-opacity">
              <RiRobot3Fill className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
          </button>
        </div>
      ) : (
        <div className="fixed bottom-24 right-4 sm:bottom-20 sm:right-6 z-50 w-[90vw] max-w-md">
          <div className="relative bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <iframe
              src="/chatbot"
              className="w-full h-[60vh] sm:h-[70vh]"
              title="Chatbot"
            ></iframe>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-xl text-red-600 hover:text-red-400 bg-transparent"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
