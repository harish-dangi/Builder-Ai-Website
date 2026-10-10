
import { useState } from "react";
import {ArrowLeftIcon,Code2Icon,DownloadIcon,ExternalLinkIcon,EyeIcon,GlobeIcon,Loader2Icon,MenuIcon,XIcon,
} from "lucide-react";

const BuilderHeader = ({onLogout,onBack,onDownload,onPublish,onOpenPreview,onToggleShowCode,publishing, showCode,version,projectName,}) => {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden sm:flex h-12 w-full shrink-0 overflow-hidden border-b shadow-[1px_1px_10px_1px] items-center justify-between bg-linear-to-b to-amber-600 via-fuchsia-500 from-cyan-500">
        <div className="flex min-w-0 shrink-0 items-center ml-2 sm:ml-3">
          <button
            onClick={onBack}
            className="flex shrink-0 items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-2 sm:px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer"
          >
            <ArrowLeftIcon size={18} />
          </button>

          <img
            src="/logo.svg"
            alt=""
            className="h-8 sm:h-9 ml-2 sm:ml-3 shrink-0"
          />

          <span className="max-w-30 sm:max-w-45 md:max-w-none truncate border rounded-lg px-1 ml-2 sm:ml-3 bg-amber-100 shadow-2xl text-xs py-1">
            {projectName}
          </span>

          <span className="shrink-0 border rounded-lg px-1 ml-2 sm:ml-3 bg-amber-100 shadow-2xl text-xs py-1">
            v{version}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto pl-2 pr-2 sm:pr-3 scrollbar-none">
          <button
            onClick={onToggleShowCode}
            className="flex shrink-0 items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-2 sm:px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer"
          >
            {showCode ? (
              <>
                <EyeIcon size={15} /> Preview
              </>
            ) : (
              <>
                <Code2Icon size={15} /> Code
              </>
            )}
          </button>

          <button
            onClick={onOpenPreview}
            className="flex shrink-0 items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-2 sm:px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer"
          >
            <ExternalLinkIcon size={13} /> Open Preview
          </button>

          <button
            onClick={onPublish}
            disabled={publishing}
            className="flex shrink-0 items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-2 sm:px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer"
          >
            {publishing ? (
              <Loader2Icon size={13} className="animate-spin" />
            ) : (
              <GlobeIcon size={13} />
            )}
            Publish
          </button>

          <button
            onClick={onDownload}
            className="flex shrink-0 items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-2 sm:px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer"
          >
            <DownloadIcon size={13} /> Export
          </button>

          <button
            onClick={onLogout}
            className="flex shrink-0 items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-2 sm:px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer mr-1 sm:mr-3"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ================= MOBILE HEADER ================= */}
      <header className="sm:hidden relative z-50 h-12 w-full shrink-0 border-b shadow-[1px_1px_10px_1px] flex items-center justify-between px-2 bg-linear-to-b to-amber-600 via-fuchsia-500 from-cyan-500">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-2xl bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer"
        >
          <ArrowLeftIcon size={18} />
        </button>

        <img
          src="/logo.svg"
          alt=""
          className="h-8 shrink-0"
        />

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer"
        >
          {mobileMenuOpen ? (
            <XIcon size={20} />
          ) : (
            <MenuIcon size={20} />
          )}
        </button>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="absolute right-2 top-13 w-[calc(100vw-1rem)] max-w-80 rounded-xl border border-zinc-200 bg-white p-3 shadow-2xl">
            {/* Project Info */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-200">
              <span className="min-w-0 flex-1 truncate border rounded-lg px-2 py-1 bg-amber-100 text-xs">
                {projectName}
              </span>

              <span className="shrink-0 border rounded-lg px-2 py-1 bg-amber-100 text-xs">
                v{version}
              </span>
            </div>

            {/* Code / Preview */}
            <button
              onClick={() => {
                onToggleShowCode();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer text-sm"
            >
              {showCode ? (
                <>
                  <EyeIcon size={16} />
                  Preview
                </>
              ) : (
                <>
                  <Code2Icon size={16} />
                  Code
                </>
              )}
            </button>

            {/* Open Preview */}
            <button
              onClick={() => {
                onOpenPreview();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer text-sm"
            >
              <ExternalLinkIcon size={16} />
              Open Preview
            </button>

            {/* Publish */}
            <button
              onClick={() => {
                onPublish();
                setMobileMenuOpen(false);
              }}
              disabled={publishing}
              className="w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer text-sm"
            >
              {publishing ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <GlobeIcon size={16} />
              )}
              Publish
            </button>

            {/* Export */}
            <button
              onClick={() => {
                onDownload();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer text-sm"
            >
              <DownloadIcon size={16} />
              Export
            </button>

            {/* Sign Out */}
            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 bg-zinc-100 hover:bg-pink-400 transition-all duration-300 cursor-pointer text-sm"
            >
              Sign out
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default BuilderHeader;