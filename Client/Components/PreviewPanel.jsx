import { useEffect, useRef } from "react";
import { amethyst } from "@codesandbox/sandpack-themes";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";

import { useAppContext } from "../Context/AppContext.jsx";

const emptyFunction = () => {};

// SANDBOX FILE WATCHER
const SandpackFileWatcher = ({ onLiveFilesChange = emptyFunction }) => {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const { activeProject } = useAppContext();
  const activeProjectRef = useRef(activeProject);
  const onLiveFilesChangeRef = useRef(onLiveFilesChange);
  const lastSentFilesRef = useRef("");
  useEffect(() => {
    activeProjectRef.current = activeProject;
    lastSentFilesRef.current = "";
  }, [activeProject]);

  useEffect(() => {
    onLiveFilesChangeRef.current = onLiveFilesChange;
  }, [onLiveFilesChange]);

  useEffect(() => {
    const project = activeProjectRef.current;

    if (!project || !files) {
      return;
    }
    const updatedFiles = {};
    let hasChanges = false;

    for (const [path, file] of Object.entries(files)) {
      const fileCode = file?.code ?? "";
      const originalFile = project.files?.[path];
      const originalContent =
        typeof originalFile === "string"
          ? originalFile
          : (originalFile?.code ?? originalFile?.content ?? "");

      if (originalContent !== fileCode) {
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return;
    }

    const filesSignature = JSON.stringify(updatedFiles);

    if (lastSentFilesRef.current === filesSignature) {
      return;
    }

    lastSentFilesRef.current = filesSignature;
    onLiveFilesChangeRef.current(updatedFiles);
  }, [files]);

  return null;
};

// ======================================================
// ACTIVE FILE
// ======================================================

const SandpackActiveFileSync = ({ activeFile }) => {
  const { sandpack } = useSandpack();
  const currentActiveFile = sandpack.activeFile;
  useEffect(() => {
    if (!activeFile) return;

    if (!sandpack.files?.[activeFile]) {
      return;
    }

    if (currentActiveFile === activeFile) {
      return;
    }

    sandpack.setActiveFile(activeFile);
  }, [activeFile, currentActiveFile, sandpack.files, sandpack.setActiveFile]);
  return null;
};


const PreviewPanel = ({
  projectData,
  sandpackFiles,
  activeFile,
  showcode,
  onLiveFilesChange = emptyFunction,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        // background: "red",
      }}
    >
      <SandpackProvider
        key={projectData?._id || projectData?.id}
        template="react"
        files={sandpackFiles}
        theme={amethyst}
        options={{
          activeFile,
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        {/* <SandpackScrollToTop/> */}
        <SandpackActiveFileSync activeFile={activeFile} />

        <SandpackFileWatcher onLiveFilesChange={onLiveFilesChange} />

        <SandpackLayout
          className="builder-sandpack"
          style={{
            width: "100%",
            height: "calc(100vh - 70px)",
            minHeight: 0,
            minWidth: 0,
            display: "flex",
            overflow: "hidden",
          }}
        >
          {showcode && (
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              style={{
                height: "100%",
                minHeight: 0,
                minWidth: 0,
                flex: "1 1 50%",
              }}
            />
          )}
          <SandpackPreview
            showNavigator={false}
            showRefreshButton
            showOpenInCodeSandbox={false}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 0,
              minWidth: 0,
              flex: "1 1 100%",
            }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default PreviewPanel;
