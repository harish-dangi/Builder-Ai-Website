import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../Components/BuilderHeader";
import { useAppContext } from "../Context/AppContext";
import { FileEdit, MessagesSquareIcon } from "lucide-react";
import ChatPanel from "../Components/ChatPanel";
import FilePanel from "../Components/FilePanel";
import PreviewPanel from "../Components/PreviewPanel.jsx";
import AgentProgressDashboard from "../Components/AgentProgressDashboard.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { exportProjectZip } from "../utils/exportProject.js";
import PublishModel from "../Components/PublishModel.jsx";

const Builderpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);
  const [showPublishUrl, setShowPublishUrl] = useState(false);

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
    user,
  } = useAppContext();

  // console.log("id:", id);
  useEffect(() => {
    if (!id || !user) return;

    loadProject(id);
  }, [id, user]);

  const handleOpenPreview = () => {
    if (!id) return;
    window.open(`/preview/${id}`, "_blank");
  };

  const handleDownload = () => {
    if (!activeProject) return;
    exportProjectZip(activeProject.project);
  };

  const handlePublish = async () => {
    if (!id) return;
    setPublishing(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/projects/${id}/publish`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log("🔥 PUBLISH RESPONSE:", response.data);
      const url = `${window.location.origin}/publish/${id}`;
      setPublishUrl(url);
      setShowPublishUrl(true);
      toast.success("Website published successfully!");
    } catch (err) {
      console.log("🔥 PUBLISH ERROR:", err);
      console.log("🔥 STATUS:", err.response?.status);
      console.log("🔥 DATA:", err.response?.data);

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Publish failed",
      );
    } finally {
      setPublishing(false);
    }
  };
  // if (loadingActiveProjects || activeProject.project) {
  //   return <Loading />;
  // }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-amber-800">
      <BuilderHeader
        projectName={activeProject?.project.name || "AI Website Builder"}
        version={activeProject?.project.version || "1.0"}
        showCode={showCode}
        publishing={publishing}
        onToggleShowCode={() => setshowCode(!showCode)}
        onOpenPreview={handleOpenPreview}
        onBagout={logout}
        onDowck={() => navigate("/")}
        onDownload={handleDownload}
        onPublish={handlePublish}
      />
      {/* Main Layout */}
      <div className="mt-2 flex gap-3 overflow-hidden ">
        {/* Left Layout */}
        <div className="flex  min-h-0 shrink-0 flex-col">
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

          <div className="flex-1 ">
            <div className="h-full border border-zinc-200 rounded-2xl bg-white shadow-sm overflow-hidden">
              {leftTab === "chat" ? (
                <ChatPanel
                  messages={activeProject?.project.messages || []}
                  loading={chatLoading}
                  onSend={handleChat}
                />
              ) : (
                <FilePanel
                  files={activeProject?.project.files || {}}
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
        <div className="flex  min-h-0 min-w-0 w-full overflow-hidden  ">
          {activeProject?.project.status === "pending" ||
          activeProject?.project.status === "generating" ||
          activeProject?.project.status === "failed" ? (
            <AgentProgressDashboard />
          ) : (
            <PreviewPanel 
              projectData={activeProject?.project}
              sandpackFiles={activeProject?.project?.files || {}}
              activeFile={activeFile}
              showcode={showCode}
            />
          )}
        </div>
      </div>
      {showPublishUrl && (
        <PublishModel
          publishUrl={publishUrl}
          onClose={() => setShowPublishUrl(false)}
        />
      )}
    </div>
  );
};

export default Builderpage;
