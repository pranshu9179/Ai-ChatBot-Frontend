import { FaSun, FaMoon } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 sm:p-4 flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-2 sm:gap-0">
      <div className="flex-1"></div>

      <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">
        Gemini Chatbot
      </h1>

      <div className="flex-1 flex justify-end">
        <button
          onClick={toggleTheme}
          className="text-sm sm:text-base font-semibold bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer flex items-center gap-2"
        >
          {theme === "light" ? (
            <>
              <FaMoon /> Dark Mode
            </>
          ) : (
            <>
              <FaSun /> Light Mode
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
