import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PreviewPanel from "../Components/PreviewPanel";

const PreviewPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/projects/${id}`,
          {
            withCredentials: true,
          }
        );

        setProject(response.data.project);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading website...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        Project not found
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <PreviewPanel
        projectData={project}
        sandpackFiles={project.files || {}}
        activeFile="/App.js"
        showcode={false}
      />
    </div>
  );
};

export default PreviewPage;