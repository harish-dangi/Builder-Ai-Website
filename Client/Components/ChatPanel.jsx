import { BotIcon, BotMessageSquareIcon, MoreVertical, User, UserIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import Promptinput from "../Components/Promptinput.jsx";
const ChatPanel = ({messages,loading,onSend}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages,loading]);
  return (
    <div className="h-full flex flex-col">

      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-zinc-200">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-sm font-semibold text-zinc-900">
              AI Assistant
            </h2>

            <p className="text-xs text-zinc-400">
              Build your website with AI
            </p>
          </div>

          <button className="p-2 rounded-lg hover:bg-zinc-100 cursor-pointer">
            <MoreVertical size={18} />
          </button>

        </div>
      </div>


      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && !loading && (
          <div className="flex justify-center items-center h-full text-zinc-400">
            No messages yet. Start the conversation!
          </div>
        )}

        {messages && messages.map((msg, index) => (
          <div
            key={index}
          >
            <div className="max-w-[85%] flex gap-2 items-start">
              <div className="bg-zinc-100 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-zinc-700">
                
                {msg.role === "user" ? (
                  <UserIcon size={16} className="inline ml-1" />
                ) : (<BotMessageSquareIcon size={16} className="inline ml-1" /> )
                }
                {msg}
              </div>
              <div className="flex-1 min-w-0">
                <p>{msg.role === "user" ? "You" : "AI"}</p>
                <p>
                  {msg.content.split("- `/").map((text, i) => (
                    <span key={i} className="block mt-2">
                      <span className={i===0 ? "hidden" : ""}>- `/</span>
                        {text}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-center items-center h-full text-zinc-400">
            <div className="shrink-0 bg-zinc-100 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-zinc-700 flex items-center gap-2">
              <BotIcon size={16} />
            </div>
            <div className="flex-1 min-w-0" >
              <p className="font-medium text-zinc-500 ">AI</p>
              <div className="dot-loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
        {/* <div className="flex justify-end">
          <div className="max-w-[85%] bg-zinc-900 text-white rounded-2xl rounded-tr-md px-4 py-3 text-sm">
            Create a portfolio website.
          </div>
        </div> */}

      </div>


      {/* Input */}
      <div className="shrink-0 p-3 border-t border-zinc-200">
        <Promptinput onSubmit={onSend} loading={loading} placeholder="Ask Ai to modify..." variant="glass" />
      </div>

    </div>
  );
};

export default ChatPanel;