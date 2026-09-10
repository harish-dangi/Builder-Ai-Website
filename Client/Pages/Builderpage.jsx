import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../Components/BuilderHeader";
import { useAppContext } from "../Context/AppContext";
import { FileEdit, MessagesSquareIcon } from "lucide-react";
import ChatPanel from "../Components/ChatPanel";
import FilePanel from "../Components/FilePanel";
import Loading from "../Components/Loading.jsx";
import PreviewPanel from "../Components/PreviewPanel.jsx";

const Builderpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);

  const {
    activeProject,
    loadProject,
    showCode,
    setshowCode,
    logout,
    chatLoading,
    handleChat,
    activeFile,
    setActiveFile,
  } = useAppContext();

  console.log(id);
  console.log(!activeProject);
  useEffect(() => {
    if (!id || !activeProject) return;
    if (
      activeProject.status === "pending" ||
      activeProject.status === "generating"
    ) {
      const interval = setInterval(() => {
        loadProject(id, true);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [id, activeProject]);

  const handleOpenPreview = () => {
    if (!id) return;
    window.open(`/preview/${id}`, "_blank");
  };
  const handleDownload = () => {
    return;
  };
  const handlePublish = async () => {
    return;
  };
  // if (loadingActiveProjects || !activeProject) {
  //   return <Loading />;
  // }

  return (
    <div className="h-screen  bg-amber-50  ">
      <BuilderHeader
        projectName={activeProject?.name || "AI Website Builder"}
        version={activeProject?.version || "1.0"}
        showCode={showCode}
        publishing={publishing}
        onToggleShowCode={() => setshowCode(!showCode)}
        onOpenPreview={handleOpenPreview}
        onBagout={logout}
        onDowck={() => navigate("/")}
        onLonload={handleDownload}
        onPublish={handlePublish}
      />
      {/* Main Layout */}
      <div className="gap-3 mt-3 flex">
        {/* Left Layout */}
        <div className="flex flex-col shrink-0 w-100 ">
          {/* Tabs Container */}

          <div className="flex items-center gap-1 p-1 rounded-xl w-full justify-between border border-zinc-200">
            {/* Chat Tab */}
            <button
              onClick={() => setLeftTab("chat")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
          ${
            leftTab === "chat"
              ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
          }`}
            >
              <MessagesSquareIcon size={18} />
              <span>Chat</span>
            </button>

            {/* Files Tab */}
            <button
              onClick={() => setLeftTab("files")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer${
                leftTab === "files"
                  ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
              }`}
            >
              <FileEdit size={18} />
              <span>Files</span>
            </button>
          </div>

          <div className="w-100 h-[calc(100vh-110px)] shrink-0  ">
            <div className="h-full border border-zinc-200 rounded-2xl bg-white shadow-sm overflow-hidden">
              {leftTab === "chat" ? (
                <ChatPanel
                  messages={activeProject?.messages || []}
                  loading={chatLoading}
                  onSend={handleChat}
                />
              ) : (
                <FilePanel
                  files={activeProject?.files || {}}
                  activeFile={activeFile}
                  onFileSelect={(path) => {
                    setActiveFile(path);
                    setshowCode(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {/* right layout */}
        {/* preview page / code area */}
        <div className="flex-1  overflow-hidden w-100 bg-amber-600/20">
          {activeProject?.status === "pending" ||
          activeProject?.status === "generating" ||
          activeProject?.status === "failed" ? (
            <Loading />
          ) : (
            <PreviewPanel project={activeProject} activeFile={activeFile} showcode={showCode}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builderpage;
