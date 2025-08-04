import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
const Message = ({ type, text, from }) => {
  const baseStyle =
    "p-3 rounded-lg text-sm sm:text-base max-w-[80%] sm:max-w-xs break-words";

  const classes = {
    text:
      from === "user"
        ? "bg-gradient-to-r from-[#4285F4] via-[#7F4FF9] to-[#EA4C89] text-black self-end"
        : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white",
    info: "text-gray-500 italic text-center w-full",
    error:
      "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-center w-full",
  };

  return (
    <div
      className={`flex ${
        from === "user" ? "justify-end" : "justify-start"
      } w-full px-2`}
    >
      <div className={`${baseStyle} ${classes[type] || ""}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
