import { FileCode, FileText } from "lucide-react";
import {useMemo} from "react";

function buildTree(paths) {
  const root = [];
  for (const filePath of paths.sort()) {
    const parts = filePath.split("/").filter(Boolean);
    let currentLevel = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const fullpath = parts.slice(0, i + 1).join("/");
      let existingNode = currentLevel.find((node) => node.name === part);
      if (!existingNode) {
        existingNode = {
          name: part,
          children: [],
          path: fullpath,
          isDir: !isFile,
        };
        currentLevel.push(existingNode);
      }
      currentLevel = existingNode.children;
    }
  }
  return root;
}

const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop();
  switch (extension) {  
    case "js":
    case "jsx":
      return <FileCode size={16} className="text-blue-500" />;
    case "json":
      return <FileText size={16} className="text-green-500" />;
    case "html":
      return <FileText size={16} className="text-orange-500" />;
    case "css":
      return <FileText size={16} className="text-purple-500" />;
    default:
      return <FileText size={16} className="text-gray-500" />;
  }
};

function TreeItem({ node, activeFile, onFileSelect, depth = 0 }) {
const isActive = node.path === activeFile;
 
if(node.isDir){
  return (
    <div key={node.path} className="ml-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 cursor-pointer">
        <Folder size={17} />
        <span className=" truncate">{node.name}</span>
      </div>
      <div className="ml-5">
        {node.children.map((child) => 
        <TreeItem key={child.path} node={child} activeFile={activeFile} onFileSelect={onFileSelect} depth={depth + 1} />)}
      </div>
    </div>
  );
}
return (
  <button
    key={node.path}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 cursor-pointer ${isActive ? "bg-zinc-200" : ""}`}
    onClick={() => onFileSelect(node.path)}
  >
    {getFileIcon(node.name)}
    <span className="truncate">{node.name}</span>
  </button>
);
}
const FilePanel = ({ files, activeFile, onFileSelect }) => {
  const tree = useMemo(() => {
    return buildTree(Object.keys(files));
  }, [files]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">Files</h2>
          {tree?.map((node) => (
            <TreeItem key={node.path} node={node} activeFile={activeFile} onFileSelect={onFileSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilePanel;
