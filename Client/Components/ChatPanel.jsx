import {
  BotMessageSquareIcon,
  MoreVertical,
  UserIcon,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { useEffect, useRef } from "react";
import Promptinput from "../Components/Promptinput.jsx";


const ChatPanel = ({ messages, loading, onSend }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="shrink-0 h-[68px] px-4 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
        <div className="h-full flex items-center justify-between">
          {/* AI INFO */}
          <div className="flex items-center gap-3">
            {/* AI Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <Sparkles size={17} className="text-white" />
              </div>

              {/* Online Dot */}
              <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                AI Assistant
              </h2>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-emerald-600 font-medium">
                  Online
                </span>

                <span className="text-[11px] text-zinc-400">•</span>

                <span className="text-[11px] text-zinc-400">
                  Ready to build
                </span>
              </div>
            </div>
          </div>

          {/* MENU */}
          <button
            className="
              w-8 h-8
              flex items-center justify-center
              rounded-lg
              text-zinc-400
              hover:text-zinc-700
              hover:bg-zinc-100
              transition-all
              cursor-pointer
            "
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* MESSAGES */}
      {/* ================================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-4 py-5
          space-y-5
          scrollbar-thin
          scrollbar-thumb-zinc-200
          scrollbar-track-transparent
        "
      >
        {/* EMPTY STATE */}

        {(!messages || messages.length === 0) && !loading && (
          <div className="h-full flex items-center justify-center">
            <div className="max-w-[280px] text-center">
              <div
                className="
                mx-auto
                w-14 h-14
                rounded-2xl
                bg-gradient-to-br from-violet-50 to-indigo-50
                border border-violet-100
                flex items-center justify-center
                mb-4
              "
              >
                <MessageSquare size={24} className="text-violet-500" />
              </div>

              <h3 className="text-sm font-semibold text-zinc-800">
                Start building with AI
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-400">
                Tell the AI what you want to build or ask it to modify your
                website.
              </p>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* MESSAGE LIST */}
        {/* ================================================= */}

        {messages?.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-end gap-2 max-w-[88%] ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* AVATAR */}

                <div
                  className={`
                    shrink-0
                    w-7 h-7
                    rounded-lg
                    flex items-center justify-center
                    ${
                      isUser
                        ? "bg-zinc-900"
                        : "bg-gradient-to-br from-violet-500 to-indigo-600"
                    }
                  `}
                >
                  {isUser ? (
                    <UserIcon size={14} className="text-white" />
                  ) : (
                    <BotMessageSquareIcon size={14} className="text-white" />
                  )}
                </div>

                {/* MESSAGE CONTENT */}

                <div
                  className={`
                    min-w-0
                    ${isUser ? "items-end" : "items-start"}
                  `}
                >
                  {/* NAME */}

                  <p
                    className={`
                      mb-1
                      text-[10px]
                      font-medium
                      ${
                        isUser
                          ? "text-right text-zinc-400"
                          : "text-left text-zinc-500"
                      }
                    `}
                  >
                    {isUser ? "You" : "AI Assistant"}
                  </p>

                  {/* BUBBLE */}

                  <div
                    className={`
                      px-3.5 py-2.5
                      rounded-2xl
                      text-sm
                      leading-6
                      break-words
                      whitespace-pre-wrap

                      ${
                        isUser
                          ? `
                            bg-zinc-900
                            text-white
                            rounded-br-md
                          `
                          : `
                            bg-zinc-100
                            text-zinc-700
                            border border-zinc-200/70
                            rounded-bl-md
                          `
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ================================================= */}
        {/* AI LOADING */}
        {/* ================================================= */}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              {/* AI AVATAR */}

              <div
                className="
                shrink-0
                w-7 h-7
                rounded-lg
                bg-gradient-to-br
                from-violet-500
                to-indigo-600
                flex items-center justify-center
              "
              >
                <BotMessageSquareIcon size={14} className="text-white" />
              </div>

              {/* LOADING BUBBLE */}

              <div>
                <p className="mb-1 text-[10px] font-medium text-zinc-500">
                  AI Assistant
                </p>

                <div
                  className="
                  px-4 py-3
                  bg-zinc-100
                  border border-zinc-200/70
                  rounded-2xl
                  rounded-bl-md
                "
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />

                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />

                    <span
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCROLL TARGET */}

        <div ref={bottomRef} />
      </div>

      {/* ================================================= */}
      {/* INPUT */}
      {/* ================================================= */}

      <div className="shrink-0 p-3 border-t border-zinc-200/80 bg-white">
        <div
          className="
          rounded-2xl
          border border-zinc-200
          bg-zinc-50/80
          p-1
          shadow-sm
          focus-within:border-violet-300
          focus-within:ring-4
          focus-within:ring-violet-50
          transition-all
        "
        >
          <Promptinput
            onSubmit={onSend}
            loading={loading}
            placeholder="Ask AI to modify your website..."
            variant="glass"
          />
        </div>

        <p className="mt-2 text-center text-[10px] text-zinc-400">
          AI can make mistakes. Review generated code before publishing.
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
