import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const InputArea = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-2 sm:p-3 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2 sm:gap-3">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-[2px] rounded-lg bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89]">
        <input
          className="w-full px-3 py-2 text-sm sm:text-base md:text-lg rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
        />
      </div>
      <button
        onClick={handleSend}
        className="min-w-[42px] sm:min-w-[50px] h-10 sm:h-11 bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] text-white font-bold px-2 sm:px-4 py-2 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <IoMdSend size={18} />
      </button>
    </div>
  );
};

export default InputArea;
