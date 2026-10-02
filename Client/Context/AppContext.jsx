import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { useMemo } from "react";
import debounce from "lodash.debounce";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  //AuthState
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  //states
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setloadingProjects] = useState(true);

  const [activeProject, setActiveProject] = useState();
  const [loadingActiveProject, setloadingActiveProject] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [generatingProjects, setGeneratingProjects] = useState(false);
  const [activeFile, setActiveFile] = useState("/App.js");
  const [showCode, setshowCode] = useState(false);

  //Auth Action
  const checkSession = useCallback(async () => {
    try {
      const { data } = await axios.get("https://builder-ai-website.onrender.com/api/auth/getme", {
        withCredentials: true,
      });
      // console.log("user:",data);
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://builder-ai-website.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      setUser(data.user);
      toast.success("Welcome Back!");
      navigate("/");
    } catch (err) {
      const errMSG = err?.response?.data?.error || "Invalid email or password";
      toast.error(errMSG);
      throw new Error(errMSG);
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post(
        "https://builder-ai-website.onrender.com/api/auth/register",
        { name, email, password },
        { withCredentials: true },
      );
      toast.success("Welcome Back!");
      navigate("/login");
    } catch (err) {
      console.error("Registration Failed:", err);
      const errMSG = err?.response?.data?.error || "Registration Failed";
      console.log(errMSG);
      toast.error(errMSG);
      throw new Error(errMSG);
    }
  };

  const logout = async () => {
    console.log("call logout");
    try {
      await axios.get("https://builder-ai-website.onrender.com/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout Failed:", err);
    }
  };
  //Projects Action
const loadProjects = useCallback(async () => {
  if (!user) return;

  try {
    const { data } = await axios.get(
      "https://builder-ai-website.onrender.com/api/projects",
      {
        withCredentials: true,
      }
    );

    setProjects(data.projects);
  } catch (err) {
    console.error("Failed to list projects:", err);
    toast.error("Failed to load projects list");
  } finally {
    setloadingProjects(false);
  }
}, [user]);
  // ye abhi check karna hai
  const loadProject = useCallback(    
    async (id, silent = false) => {
    if (!user) return;
    if (!silent) setloadingActiveProject(true);
    try {
      console.log("🔥 FETCHING PROJECTS");
      const { data } = await axios.get(
        `https://builder-ai-website.onrender.com/api/projects/${id}`,
        { withCredentials: true },
      );
      console.log("🔥 PROJECT RESPONSE:", data);
      setActiveProject(data);
      const files = Object.keys(data?.files || {});

      if (files.length > 0) {
        setActiveFile((prev) => {
          if (files.includes(prev)) return prev;
          if (files.includes("/App.js")) return "/App.js";
          return files[0];
        });
      }
    } catch (err) {
      console.error("❌ LOAD PROJECT ERROR:", err);
    } finally {
      if (!silent) setloadingActiveProject(false);
    }
  }
);



  //Automatically poll active project status if generating or pending
useEffect(() => {
  if (!activeProject?._id || !user) return;

  const isOngoing =
    activeProject.status === "generating" ||
    activeProject.status === "pending" ||
    activeProject.status === "revising";

  if (!isOngoing) {
    setChatLoading(false);
    return;
  }

  setChatLoading(true);

  const interval = setInterval(() => {
    loadProject(activeProject._id, true);
  }, 2000);

  return () => {
    clearInterval(interval);
  };
}, [
  activeProject?._id,
  activeProject?.status,
  user,
]);

  const handleGenerate = useCallback(
    async (prompt) => {
      if (!user) return;
      setGeneratingProjects(true);
      try {
        const { data } = await axios.post(
          "https://builder-ai-website.onrender.com/api/projects",
          { prompt },
          {
            withCredentials: true,
          },
        );
        toast.success("Ai Agent is planning structure...");
        console.log("CREATED PROJECT RESPONSE:", data);
        navigate(`/builder/${data.project?._id}`);
      } catch (err) {
        console.error("Failed to generate projects:", err);
        toast.error(err?.response?.data?.error || "Failed to generate project");
      } finally {
        setGeneratingProjects(false);
      }
    },
    [navigate, user],
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!user) return;
      setGeneratingProjects(true);

      try {
        console.log("delete")
        console.log
        await axios.delete(`https://builder-ai-website.onrender.com/api/projects/${id}`,
          {withCredentials:true}
        );
        setProjects((prev) => prev.filter((p) => p._id !== id));
        toast.success("Project deleted successfully!");
      } catch (err) {
        console.error("Failed to delete projects:", err);
        toast.error(err?.response?.data?.error || "Failed to delete project");
      }
    },
    [user],
  );

  const handleChat = useCallback(
    async (prompt) => {
      console.log("chat call");
      if (!user || !activeProject?.project) {
        console.log("RETURN: user or project missing");
        return;
      }
      setChatLoading(true);
      try {
        console.log("chat call inside try");
        console.log(activeProject.project._id);
        const { data } = await axios.post(
          `http://localhost:4000/api/projects/${activeProject.project._id}/chat`,
          { prompt },
          { withCredentials: true },
        );
        setActiveProject(data);
        if (data.errors && data.errors.length > 0) {
          toast.error(
            `${data.errors.length} revisions patch failed. Please check the chat for details.`,
          );
        } else {
          toast.success(`Updated to version ${data.version} successfully!`);
        }
      } catch (err) {
        console.log("chat call inside catch");

        console.log("Message:", err?.message);
        toast.error(err?.response?.data?.error || "Failed to chat with AI");
      } finally {
        setChatLoading(false);
      }
    },
    [user, activeProject],
  );

  const debounceSave = useMemo(
    () =>
      debounce(async (projectId, files) => {
        try {
          await axios.put(
            `https://builder-ai-website.onrender.com/api/projects/${projectId}`,
            { files },
            {
              withCredentials: true,
            },
          );
        } catch (err) {
          console.log("PUT ERROR:", err);
          console.log("STATUS:", err?.response?.status);
          console.log("DATA:", err?.response?.data);
        }
      }, 1000),
    [],
  );

  // useEffect(() => {
  //   return () => {
  //     debounceSave.flush();
  //   };
  // }, [debounceSave]);

  const updateProjectFiles = useCallback(
    (files) => {
      console.log("🔥 updateProjectFiles CALLED");
      console.log("🔥 files being saved:", files);

      if (!activeProject || !user) return;

      debounceSave(activeProject.project._id, files);
    },
    [activeProject, user, debounceSave],
  );
  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser,
        login,
        logout,
        register,
        projects,
        loadingProjects,
        activeProject,
        loadingActiveProject,
        chatLoading,
        generatingProjects,
        activeFile,
        setActiveFile,
        showCode,
        setshowCode,
        handleDelete,
        handleGenerate,
        loadProject,
        loadProjects,
        handleChat,
        updateProjectFiles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
