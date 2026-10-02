// import { FileCode, FileText,Folder,Files } from "lucide-react";
// import {useMemo} from "react";

// function buildTree(paths) {
//   const root = [];
//   for (const filePath of [...paths].sort()) {
//     const parts = filePath.split("/").filter(Boolean);
//     let currentLevel = root;
//     for (let i = 0; i < parts.length; i++) {
//       const part = parts[i];
//       const isFile = i === parts.length - 1;
//       const fullpath = parts.slice(0, i + 1).join("/");
//       let existingNode = currentLevel.find((node) => node.name === part);
//       if (!existingNode) {
//         existingNode = {
//           name: part,
//           children: [],
//           // Directories use their display path. Files must retain the exact
//           // Sandpack key (including its leading slash) when selected.
//           path: isFile ? filePath : fullpath,
//           isDir: !isFile,
//         };
//         currentLevel.push(existingNode);
//       }
//       // console.log("Clicked file:", node.path);
//       currentLevel = existingNode.children;
//     }
//   }
//   return root;
// }

// const getFileIcon = (fileName) => {
//   const extension = fileName.split(".").pop();
//   switch (extension) {  
//     case "js":
//     case "jsx":
//       return <FileCode size={16} className="text-blue-500" />;
//     case "json":
//       return <FileText size={16} className="text-green-500" />;
//     case "html":
//       return <FileText size={16} className="text-orange-500" />;
//     case "css":
//       return <FileText size={16} className="text-purple-500" />;
//     default:
//       return <FileText size={16} className="text-gray-500" />;
//   }
// };

// function TreeItem({ node, activeFile, onFileSelect, depth = 0 }) {
// const isActive = node.path === activeFile;
// //  console.log("node:",node);
// if(node.isDir){
//   return (
//     <div key={node.path} className="ml-2">
//       <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100/20 cursor-pointer">
//         <Folder size={17} />
//         <span className=" truncate">{node.name}</span>
//       </div>
//       <div className="ml-5">
//         {node.children.map((child) => 
//         <TreeItem key={child.path} node={child} activeFile={activeFile} onFileSelect={onFileSelect} depth={depth + 1} />)}
//       </div>
//     </div>
//   );
// }
// return (
//   <button
//     key={node.path}
//     className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100/20 cursor-pointer ${isActive ? "bg-zinc-200" : ""}`}
//     onClick={() => onFileSelect(node.path)}
//   >
//     {getFileIcon(node.name)}
//     <span className="truncate">{node.name}</span>
//   </button>
// );
// }


// const FilePanel = ({ files, activeFile, onFileSelect }) => {
//   const tree = useMemo(() => {
//     return buildTree(Object.keys(files || {}));
//   }, [files]);

//   return (
//     <div className="h-full flex flex-col bg-[#0d1117] text-zinc-300">

//       {/* ================= HEADER ================= */}
//       <div className="shrink-0 px-4 py-3 border-b border-white/10">

//         <div className="flex items-center justify-between">
//           {/* Left */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white/5 border border-white/10">
//               <Files size={15} className="text-zinc-400" />
//             </div>
//             <div>
//               <h2 className="text-sm font-semibold text-zinc-100">
//                 Files
//               </h2>
//               <p className="text-[10px] text-zinc-500">
//                 {Object.keys(files || {}).length} files
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ================= FILE TREE ================= */}
//       <div className="flex-1 overflow-y-auto px-2 py-3">
//         {tree?.length > 0 ? (
//           <div className="space-y-0.5">
//             {tree.map((node) => (
//               <TreeItem key={node.path} node={node} activeFile={activeFile}
//                 onFileSelect={onFileSelect} />
//             ))}
//           </div>
//         ) : (
//           /* Empty State */
//           <div className="h-full flex flex-col items-center justify-center text-center px-6">

//             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
//               <Files size={22} className="text-zinc-600" />
//             </div>

//             <p className="text-sm text-zinc-400"> No files yet</p>
//             <p className="text-xs text-zinc-600 mt-1">
//               Generate your website to see files here
//             </p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };



// export default FilePanel;


import { FileCode, FileText, Folder, Files } from "lucide-react";
import { useMemo } from "react";

function buildTree(paths) {
  const root = [];

  for (const filePath of [...paths].sort()) {
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
          // Directories use their display path. Files must retain the exact
          // Sandpack key (including its leading slash) when selected.
          path: isFile ? filePath : fullpath,
          isDir: !isFile,
        };

        currentLevel.push(existingNode);
      }

      // console.log("Clicked file:", node.path);
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

  if (node.isDir) {
    return (
      <div key={node.path} className="ml-1 sm:ml-2 min-w-0">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-zinc-100/20 cursor-pointer min-w-0">
          <Folder size={17} className="shrink-0" />

          <span className="truncate min-w-0">
            {node.name}
          </span>
        </div>

        <div className="ml-3 sm:ml-5 min-w-0">
          {node.children.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              activeFile={activeFile}
              onFileSelect={onFileSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      key={node.path}
      className={`flex w-full min-w-0 items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-zinc-100/20 cursor-pointer ${
        isActive ? "bg-zinc-200" : ""
      }`}
      onClick={() => onFileSelect(node.path)}
    >
      {getFileIcon(node.name)}

      <span className="truncate min-w-0">
        {node.name}
      </span>
    </button>
  );
}

const FilePanel = ({ files, activeFile, onFileSelect }) => {
  const tree = useMemo(() => {
    return buildTree(Object.keys(files || {}));
  }, [files]);

  return (
    <div className="h-full w-full flex flex-col bg-[#0d1117] text-zinc-300">
      {/* ================= HEADER ================= */}
      <div className="shrink-0 px-3 sm:px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex shrink-0 items-center justify-center w-7 h-7 rounded-md bg-white/5 border border-white/10">
              <Files size={15} className="text-zinc-400" />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-zinc-100">
                Files
              </h2>

              <p className="text-[10px] text-zinc-500">
                {Object.keys(files || {}).length} files
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILE TREE ================= */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-1.5 sm:px-2 py-3">
        {tree?.length > 0 ? (
          <div className="space-y-0.5 min-w-0">
            {tree.map((node) => (
              <TreeItem
                key={node.path}
                node={node}
                activeFile={activeFile}
                onFileSelect={onFileSelect}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <Files size={22} className="text-zinc-600" />
            </div>

            <p className="text-sm text-zinc-400">
              No files yet
            </p>

            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Generate your website to see files here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePanel;