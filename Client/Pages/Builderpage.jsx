// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import BuilderHeader from "../Components/BuilderHeader";
// import { useAppContext } from "../Context/AppContext";
// import { FileEdit, MessagesSquareIcon } from "lucide-react";
// import ChatPanel from "../Components/ChatPanel";
// import FilePanel from "../Components/FilePanel";
// import PreviewPanel from "../Components/PreviewPanel.jsx";
// import AgentProgressDashboard from "../Components/AgentProgressDashboard.jsx";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { exportProjectZip } from "../utils/exportProject.js";
// import PublishModel from "../Components/PublishModel.jsx";

// const Builderpage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [leftTab, setLeftTab] = useState("chat");
//   const [publishing, setPublishing] = useState(false);
//   const [publishUrl, setPublishUrl] = useState(null);
//   const [showPublishUrl, setShowPublishUrl] = useState(false);

//   const {
//     activeProject,
//     loadProject,
//     showCode,
//     setshowCode,
//     logout,
//     chatLoading,
//     handleChat,
//     activeFile,
//     setActiveFile,
//     user,
//   } = useAppContext();

//   // console.log("id:", id);
//   useEffect(() => {
//     if (!id || !user) return;

//     loadProject(id);
//   }, [id, user]);

//   const handleOpenPreview = () => {
//     if (!id) return;
//     window.open(`/preview/${id}`, "_blank");
//   };

//   const handleDownload = () => {
//     if (!activeProject) return;
//     exportProjectZip(activeProject.project);
//   };

//   const handlePublish = async () => {
//     if (!id) return;
//     setPublishing(true);
//     try {
//       const response = await axios.post(
//         `https://builder-ai-website.onrender.com/api/projects/${id}/publish`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );
//       console.log("🔥 PUBLISH RESPONSE:", response.data);
//       const url = `${window.location.origin}/publish/${id}`;
//       setPublishUrl(url);
//       setShowPublishUrl(true);
//       toast.success("Website published successfully!");
//     } catch (err) {
//       console.log("🔥 PUBLISH ERROR:", err);
//       console.log("🔥 STATUS:", err.response?.status);
//       console.log("🔥 DATA:", err.response?.data);

//       toast.error(
//         err.response?.data?.message ||
//           err.response?.data?.error ||
//           "Publish failed",
//       );
//     } finally {
//       setPublishing(false);
//     }
//   };
//   // if (loadingActiveProjects || activeProject.project) {
//   //   return <Loading />;
//   // }

//   return (
//     <div className="flex h-screen flex-col overflow-hidden bg-amber-800">
//       <BuilderHeader
//         projectName={activeProject?.project.name || "AI Website Builder"}
//         version={activeProject?.project.version || "1.0"}
//         showCode={showCode}
//         publishing={publishing}
//         onToggleShowCode={() => setshowCode(!showCode)}
//         onOpenPreview={handleOpenPreview}
//         onLogout={logout}
//         onBack={() => navigate("/")}
//         onDownload={handleDownload}
//         onPublish={handlePublish}
//       />
//       {/* Main Layout */}
//       <div className="mt-2 flex min-h-0 flex-1 gap-3 overflow-hidden">
//         {/* Left Layout */}
//         {/* Left Layout */}
//         <div className="flex h-full min-h-0 w-98.75 min-w-98.75 max-w-98.75 shrink-0 flex-col overflow-hidden">
//           {/* Tabs Container */}

//           <div className="flex w-full shrink-0 items-center justify-between gap-1 rounded-xl border border-zinc-200 p-1">
//             {/* Chat Tab */}
//             <button
//               onClick={() => setLeftTab("chat")}
//               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
//           ${
//             leftTab === "chat"
//               ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
//               : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
//           }`}
//             >
//               <MessagesSquareIcon size={18} />
//               <span>Chat</span>
//             </button>

//             {/* Files Tab */}
//             <button
//               onClick={() => setLeftTab("files")}
//               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer${
//                 leftTab === "files"
//                   ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
//                   : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
//               }`}
//             >
//               <FileEdit size={18} />
//               <span>Files</span>
//             </button>
//           </div>

//           <div className="min-h-0 flex-1 overflow-hidden">
//             <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
//               {leftTab === "chat" ? (
//                 <ChatPanel
//                   messages={activeProject?.project.messages || []}
//                   loading={chatLoading}
//                   onSend={handleChat}
//                 />
//               ) : (
//                 <FilePanel
//                   files={activeProject?.project.files || {}}
//                   activeFile={activeFile}
//                   onFileSelect={(path) => {
//                     setActiveFile(path);
//                     setshowCode(true);
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         {/* right layout */}
//         {/* preview page / code area */}
//         <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
//           {activeProject?.project.status === "pending" ||
//           activeProject?.project.status === "generating" ||
//           activeProject?.project.status === "failed" ? (
//             <AgentProgressDashboard />
//           ) : (
//             <PreviewPanel
//               projectData={activeProject?.project}
//               sandpackFiles={activeProject?.project?.files || {}}
//               activeFile={activeFile}
//               showcode={showCode}
//               onActiveFileChange={setActiveFile}
//             />
//           )}
//         </div>
//       </div>
//       {showPublishUrl && (
//         <PublishModel
//           publishUrl={publishUrl}
//           onClose={() => setShowPublishUrl(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Builderpage;



// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import BuilderHeader from "../Components/BuilderHeader";
// import { useAppContext } from "../Context/AppContext";
// import { FileEdit, MessagesSquareIcon } from "lucide-react";
// import ChatPanel from "../Components/ChatPanel";
// import FilePanel from "../Components/FilePanel";
// import PreviewPanel from "../Components/PreviewPanel.jsx";
// import AgentProgressDashboard from "../Components/AgentProgressDashboard.jsx";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { exportProjectZip } from "../utils/exportProject.js";
// import PublishModel from "../Components/PublishModel.jsx";

// const Builderpage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [leftTab, setLeftTab] = useState("chat");
//   const [publishing, setPublishing] = useState(false);
//   const [publishUrl, setPublishUrl] = useState(null);
//   const [showPublishUrl, setShowPublishUrl] = useState(false);

//   const {
//     activeProject,
//     loadProject,
//     showCode,
//     setshowCode,
//     logout,
//     chatLoading,
//     handleChat,
//     activeFile,
//     setActiveFile,
//     user,
//   } = useAppContext();

//   useEffect(() => {
//     if (!id || !user) return;

//     loadProject(id);
//   }, [id, user]);

//   const handleOpenPreview = () => {
//     if (!id) return;
//     window.open(`/preview/${id}`, "_blank");
//   };

//   const handleDownload = () => {
//     if (!activeProject) return;
//     exportProjectZip(activeProject.project);
//   };

//   const handlePublish = async () => {
//     if (!id) return;
//     setPublishing(true);
//     try {
//       const response = await axios.post(
//         `https://builder-ai-website.onrender.com/api/projects/${id}/publish`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );
//       console.log("🔥 PUBLISH RESPONSE:", response.data);
//       const url = `${window.location.origin}/publish/${id}`;
//       setPublishUrl(url);
//       setShowPublishUrl(true);
//       toast.success("Website published successfully!");
//     } catch (err) {
//       console.log("🔥 PUBLISH ERROR:", err);
//       console.log("🔥 STATUS:", err.response?.status);
//       console.log("🔥 DATA:", err.response?.data);

//       toast.error(
//         err.response?.data?.message ||
//           err.response?.data?.error ||
//           "Publish failed",
//       );
//     } finally {
//       setPublishing(false);
//     }
//   };

//   return (
//     <div className="flex h-screen flex-col overflow-hidden bg-amber-800">
//       <BuilderHeader
//         projectName={activeProject?.project.name || "AI Website Builder"}
//         version={activeProject?.project.version || "1.0"}
//         showCode={showCode}
//         publishing={publishing}
//         onToggleShowCode={() => setshowCode(!showCode)}
//         onOpenPreview={handleOpenPreview}
//         onLogout={logout}
//         onBack={() => navigate("/")}
//         onDownload={handleDownload}
//         onPublish={handlePublish}
//       />

//       {/* Main Layout */}
//       <div className="mt-2 flex min-h-0 flex-1 flex-col gap-3 overflow-auto px-1 sm:px-2 lg:flex-row lg:overflow-hidden">

//         {/* Left Layout */}
//         <div className="flex h-[45vh] min-h-0 w-full min-w-0 shrink-0 flex-col overflow-hidden lg:h-full lg:w-98.75 lg:min-w-98.75 lg:max-w-98.75">

//           {/* Tabs Container */}
//           <div className="flex w-full shrink-0 items-center justify-between gap-1 rounded-xl border border-zinc-200 p-1">

//             {/* Chat Tab */}
//             <button
//               onClick={() => setLeftTab("chat")}
//               className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer sm:flex-none sm:px-5
//                 ${
//                   leftTab === "chat"
//                     ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
//                     : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
//                 }`}
//             >
//               <MessagesSquareIcon size={18} />
//               <span>Chat</span>
//             </button>

//             {/* Files Tab */}
//             <button
//               onClick={() => setLeftTab("files")}
//               className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer sm:flex-none sm:px-5 ${
//                 leftTab === "files"
//                   ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
//                   : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
//               }`}
//             >
//               <FileEdit size={18} />
//               <span>Files</span>
//             </button>
//           </div>

//           <div className="min-h-0 flex-1 overflow-hidden">
//             <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
//               {leftTab === "chat" ? (
//                 <ChatPanel
//                   messages={activeProject?.project.messages || []}
//                   loading={chatLoading}
//                   onSend={handleChat}
//                 />
//               ) : (
//                 <FilePanel
//                   files={activeProject?.project.files || {}}
//                   activeFile={activeFile}
//                   onFileSelect={(path) => {
//                     setActiveFile(path);
//                     setshowCode(true);
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Layout */}
//         <div className="flex min-h-[55vh] min-w-0 flex-1 overflow-hidden lg:min-h-0">
//           {activeProject?.project.status === "pending" ||
//           activeProject?.project.status === "generating" ||
//           activeProject?.project.status === "failed" ? (
//             <AgentProgressDashboard />
//           ) : (
//             <PreviewPanel
//               projectData={activeProject?.project}
//               sandpackFiles={activeProject?.project?.files || {}}
//               activeFile={activeFile}
//               showcode={showCode}
//               onActiveFileChange={setActiveFile}
//             />
//           )}
//         </div>
//       </div>

//       {showPublishUrl && (
//         <PublishModel
//           publishUrl={publishUrl}
//           onClose={() => setShowPublishUrl(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Builderpage;



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
        `https://builder-ai-website.onrender.com/api/projects/${id}/publish`,
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

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-amber-800">
      <BuilderHeader
        projectName={activeProject?.project.name || "AI Website Builder"}
        version={activeProject?.project.version || "1.0"}
        showCode={showCode}
        publishing={publishing}
        onToggleShowCode={() => setshowCode(!showCode)}
        onOpenPreview={handleOpenPreview}
        onLogout={logout}
        onBack={() => navigate("/")}
        onDownload={handleDownload}
        onPublish={handlePublish}
      />

      {/* ========================================================= */}
      {/* MAIN LAYOUT */}
      {/* ========================================================= */}

      <div
        className="
          mt-2
          flex
          min-h-0
          flex-1
          flex-col
          gap-3
          overflow-y-auto
          overflow-x-hidden
          px-1
          sm:px-2
          lg:flex-row
          lg:overflow-hidden
        "
      >
        {/* ========================================================= */}
        {/* LEFT LAYOUT - CHAT / FILES */}
        {/* ========================================================= */}

        <div
          className="
            flex
            h-[calc(100vh-3.5rem)]
            min-h-0
            w-full
            min-w-0
            shrink-0
            flex-col
            overflow-hidden

            lg:h-full
            lg:w-98.75
            lg:min-w-98.75
            lg:max-w-98.75
          "
        >
          {/* ===================================================== */}
          {/* TABS */}
          {/* ===================================================== */}

          <div
            className="
              flex
              w-full
              shrink-0
              items-center
              justify-between
              gap-1
              rounded-xl
              border
              border-zinc-200
              p-1
            "
          >
            {/* CHAT TAB */}
            <button
              onClick={() => setLeftTab("chat")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer sm:flex-none sm:px-5 ${
                leftTab === "chat"
                  ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
              }`}
            >
              <MessagesSquareIcon size={18} />
              <span>Chat</span>
            </button>

            {/* FILES TAB */}
            <button
              onClick={() => setLeftTab("files")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer sm:flex-none sm:px-5 ${
                leftTab === "files"
                  ? "bg-white text-zinc-900 shadow-lg border border-zinc-200"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
              }`}
            >
              <FileEdit size={18} />
              <span>Files</span>
            </button>
          </div>

          {/* ===================================================== */}
          {/* CHAT / FILES CONTENT */}
          {/* ===================================================== */}

          <div className="min-h-0 flex-1 overflow-hidden">
            <div
              className="
                h-full
                min-h-0
                overflow-hidden
                rounded-2xl
                border
                border-zinc-200
                bg-white
                shadow-sm
              "
            >
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

        {/* ========================================================= */}
        {/* RIGHT LAYOUT - WEBSITE PREVIEW */}
        {/* ========================================================= */}

        <div
          className="
            flex
            min-h-screen
            min-w-0
            w-full
            shrink-0
            overflow-hidden

            lg:min-h-0
            lg:flex-1
            lg:w-auto
            lg:shrink
          "
        >
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
              onActiveFileChange={setActiveFile}
            />
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* PUBLISH MODAL */}
      {/* ========================================================= */}

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