
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PreviewPanel from "../Components/PreviewPanel";

const PublishPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPublishedProject = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://builder-ai-website.onrender.com/api/projects/published/${id}`,
          {
            withCredentials: true,
          }
        );

        setProject(response.data.project);
      } catch (error) {
        console.error("Failed to load published website:", error);

        if (error.response?.status === 404) {
          setError("This website does not exist or has not been published.");
        } else if (error.response?.status === 401) {
          setError("Please login to view this website.");
        } else {
          setError("Failed to load website.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPublishedProject();
    }
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin mx-auto mb-3" />

          <p className="text-sm text-zinc-500">
            Loading website...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">
            Website not available
          </h1>

          <p className="text-sm text-zinc-500">
            {error || "This website is not available."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* Published Site Header */}
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-5">

        {/* Left */}
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
              Live
            </span>
          </div>

          <div className="h-4 w-px bg-zinc-200" />

          <h1 className="text-sm font-medium text-zinc-900">
            {project.name || "Published Website"}
          </h1>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          <span className="hidden sm:block text-xs text-zinc-400">
            Published website
          </span>

          <button
            onClick={() => window.location.reload()}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition"
            title="Refresh"
          >
            <ExternalLink size={15} />
          </button>

        </div>
      </header>

      {/* Website */}
      <main className="w-full min-h-[calc(100vh-56px)] bg-white">
        <PreviewPanel
          projectData={project}
          sandpackFiles={project.files || {}}
          activeFile="/App.js"
          showcode={false}
        />
      </main>

    </div>
  );
};

export default PublishPage;

