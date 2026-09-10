import React, { useRef, useState } from 'react'
import {SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider,useSandpack} from "@codesandbox/sandpack-react"
import { useAppContext } from '../Context/AppContext.jsx';
import { detectDependencies } from '../utils/sandpackUtils.js';
import SandpackErrorMonitor from './SandpackErrorMonitor.jsx';

// watches for file edits inside snadpack editor and saves and saves changes to db & live state.
  const SandpackFileWatcher = ({onLiveFilesChange}) => {
   const {sandpack} = useSandpack();
   const {files} = sandpack;
   const {activeProject,updateProjectFiles} = useAppContext();
   const activeProjectRef = useRef(activeProject);
 
   useEffect(() => {
     activeProjectRef.current = activeProject;
   }, [activeProject]);
 
 
   useEffect(() => {
     const project = activeProjectRef.current;
     if (!project) return;
     const updatedFiles = {};
     let hasChanges = false;
 
     for (const [path, file] of Object.entries(files)) {
       const fileCode = file.code;
       updatedFiles[path] = fileCode;
       const originalContent = typeof project.files[path] === 'string' ? project.files[path] : project.files[path]?.content || " ";
 
       if (originalContent !== undefined && originalContent !== fileCode) {
         hasChanges = true;
       }
     }
     //sync live files to parent
     onLiveFilesChange(updatedFiles);
     //save changes to db if there are any changes
     if (hasChanges) {
       updateProjectFiles(updatedFiles);
     }
     
   }, [files])
   return null;
  };

const PreviewPanel = ({showcode,activeFile,project}) => {
  const [liveFiles, setLiveFiles] = useState(project?.files || []);
  const [showErrorOverlay, setShowErrorOverlay] = useState(true);

  const [prevProjectKey, setPrevProjectKey] = useState(`${project.id}-${project.version}`);
  
  const currentKey = `${project.id}-${project.version}`;
  if(prevProjectKey !== currentKey){
    setPrevProjectKey(currentKey);
    setLiveFiles(project?.files || []);
  }

  const handleLiveFilesChange = (newFiles) => {
    setLiveFiles((prevFiles) => {
      let changed = false;
      for (const [path, code] of Object.entries(newFiles)) {
        if (prevFiles[path] !== code) {
          changed = true;
          break;
        } 
      }
      return changed ? newFiles : prevFiles; 
    })
  }

  //convert live files to sandpack format
  const sandpackFiles = useMemo(() => {
    const spfiles = {};
    for (const [path, content] of Object.entries(liveFiles)) {
      const fileCode = typeof content === 'string' ? content : content?.content || " ";
      spfiles[path] = {
        code:fileCode,
        active: path === activeFile,
      };
    }
    return spfiles;
  }, [liveFiles,activeFile]);

  // Detect dependencies from import statements using liveFiles
  const Dependencies = useMemo(() => {
    return detectDependencies(liveFiles);
  }, [liveFiles]);

  return (
  
    <div className="w-full h-full">
      <SandpackProvider  
      key={project._id} 
      template="react"
      files={sandpackFiles}
      customSetup={{dependencies: Dependencies}}
      options={{
        externalResources: [
          "https://cdn.tailwindcss.com",
          "https://cdn.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ],
        classes: {
          "sp-wrapper": "sp-wrapper",
          "sp-preview": "sp-preview",
          "sp-layout": "sp-layout",
        },
        logLevel: 0
      }}
      theme={{
        colors: {
          surface1: "#f8fafc",
          surface2: "#f1f5f9",
          surface3: "#e2e8f0",
          clickable: "#1e293b",
          base: "#0f172a",  
          disabled: "#94a3b8",
          hover: "#1e293b",
          accent: "#3b82f6",
          error: "#ef4444",
          errorSurface: "#fef2f2",
        },
        font: {
          body: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
          mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
          size: "14px",
          lineHeight: "20px",
        }
      }}>
      <SandpackFileWatcher onLiveFilesChange={handleLiveFilesChange} />
      <SandpackErrorMonitor onErrorChange={setShowErrorOverlay}/>
      <SandpackLayout 
      style={{
        height:"100%",
        border:"none",
        borderRadius:0,
        background:"transparent"
      }}/>
      {showcode &&(
        <SandpackCodeEditor showTabs showInlineErrors showLineNumbers wrapContent style={{height:"100%",flex:1,minWidth:0}}/>
      )}
      <SandpackPreview showNavigator={false} showRefreshButton showOpenInCodeSandbox={false} showSandpackErrorOverlay={showErrorOverlay}
      style={{height:"100%",flex:showcode ? 1 : 2, maxWidth:0 }} />
      </SandpackProvider>
    </div>
  )
}

export default PreviewPanel