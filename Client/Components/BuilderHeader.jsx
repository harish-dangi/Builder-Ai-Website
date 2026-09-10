import {ArrowLeftIcon,Code2Icon,DownloadIcon,ExternalLinkIcon,EyeIcon,GlobeIcon,Loader2Icon,} from "lucide-react";

const BuilderHeader = ({
  onLogout,onBack,onDownload,onPublish,onOpenPreview,onToggleShowCode,publishing, showCode,version,projectName,}) => {
  return (
    <header className=" border-b shadow-[1px_1px_10px_1px]  h-12 flex items-center justify-between bg-linear-to-b to-amber-600 via-fuchsia-500 from-cyan-500 ">
      <div className="flex items-center ml-3">
        <button onClick={onBack} className="flex items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer ">
          <ArrowLeftIcon size={18}/>
        </button>
        <img src="/logo.svg" alt="" className="h-9 ml-3   "/>
        <span className="border rounded-lg px-1 ml-3 bg-amber-100  shadow-2xl text-xs py-1">{projectName}</span>
        <span className="border rounded-lg px-1 ml-3 bg-amber-100 shadow-2xl text-xs py-1">v{version}</span>
      </div>
      <div className=" flex items-center gap-6">
        <button onClick={onToggleShowCode} className="flex items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer ">
          {showCode ? (
            <>
              {" "}
              <EyeIcon size={15} /> Preview{" "}
            </>
          ) : (
            <>
              {" "}
              <Code2Icon size={15} /> Code{" "}
            </>
          )}
        </button>
        <button onClick={onOpenPreview} className="flex items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer ">
          <ExternalLinkIcon size={13}/> Open Preview
        </button>

        <button onClick={onPublish} disabled={publishing} className="flex items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer ">
          {publishing ? <Loader2Icon size={13} className="animate-spin"/> : <GlobeIcon size={13}/>} Publish
        </button>
        
        <button onClick={onDownload} className="flex items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer ">
          <DownloadIcon size={13}/> Export
        </button>

        <button onClick={onLogout} className="flex items-center gap-2 hover:shadow-[1px_1px_10px_1px] hover:rotate-3 transition-all duration-300 rounded-2xl px-3 bg-zinc-100 hover:bg-pink-400 cursor-pointer mr-3 ">
          Sign out
        </button>
      </div>
      
    </header>
  );
};

export default BuilderHeader;
