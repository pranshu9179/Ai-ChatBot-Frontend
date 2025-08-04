import React from "react";

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 px-2 py-1">
      <div className="animate-pulse bg-gray-400 dark:bg-gray-500 h-2 w-2 rounded-full"></div>
      <div className="animate-pulse bg-gray-400 dark:bg-gray-500 h-2 w-2 rounded-full delay-100"></div>
      <div className="animate-pulse bg-gray-400 dark:bg-gray-500 h-2 w-2 rounded-full delay-200"></div>
    </div>
  );
}

export default TypingIndicator;
