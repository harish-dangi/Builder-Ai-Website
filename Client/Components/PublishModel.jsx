


import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

const PublishModel = ({ publishUrl, onClose }) => {
  const handleCopyLink = () => {
    if (!publishUrl) return;

    navigator.clipboard.writeText(publishUrl);
    toast.success("Public link copies to clipboard!");
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/40 px-4 py-6 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-zinc-400 hover:text-zinc-950 cursor-pointer"
        >
          <XIcon size={16} />
        </button>

        <div className="mb-5 sm:mb-6 pr-6">
          <h3 className="mb-1 text-lg font-medium text-zinc-900">
            Your website is live!
          </h3>

          <p className="text-sm leading-relaxed text-zinc-500">
            Anyone with the link below cna view your published site.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Publish Link
            </label>

            <input
              type="text"
              readOnly
              value={publishUrl}
              className="w-full min-w-0 px-0 py-2 border-b border-zinc-200 text-sm text-zinc-900 bg-transparent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <button
              onClick={handleCopyLink}
              className="w-full flex-1 rounded-lg bg-zinc-950 py-2 text-center text-xs font-medium text-white hover:bg-zinc-800 cursor-pointer"
            >
              Copy Link
            </button>

            <button
              onClick={() => window.open(publishUrl, "_blank")}
              className="w-full flex-1 rounded-lg bg-zinc-900 py-2 text-center text-xs font-medium text-white hover:bg-zinc-800 cursor-pointer"
            >
              Copy Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModel;