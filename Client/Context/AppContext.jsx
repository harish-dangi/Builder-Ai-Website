import  {createContext,useCallback,useEffect, useState,} from "react";
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
  const [projects,setProjects] = useState([]);
  const [loadingProjects,setloadingProjects] = useState(true);

  const [activeProject, setActiveProject] = useState(null);
  const [loadingActiveProject,setloadingActiveProject] = useState(true);
  const [chatLoading,setChatLoading] = useState(false);
  const [generatingProjects,setGeneratingProjects] = useState(false);
  const [activeFile,setactiveFile] = useState("/App.js");
  const [showCode,setshowCode] = useState(false);

  //Auth Action
  const checkSession = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/auth/getme", {
        withCredentials: true,
      });
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
      const { data } = await axios.post( "http://localhost:4000/api/auth/login",{ email,password},
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
      await axios.post("http://localhost:4000/api/auth/register",{name,email,password},
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

  const logout = async ()=>{
    try{
      await axios.get( "http://localhost:4000/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    }catch(err){
      console.error("Logout Failed:",err);
      toast.error("Logout Failed.");
    }
  }
  //Projects Action
  const loadProjects = async ()=> {
    if(!user) return;
    try{
      const {data} = await axios.get("http://localhost:4000/api/projects",{withCredentials:true});
      setProjects(data);
    }catch(err){
      console.error("Failed to list projects:",err);
      toast.error("Failed to load projects list");
    }finally{
      setloadingProjects(false);
    }
  }

  const loadProject = async(id, silent = false)=>{
    if(!user) return;
    if(!silent) setloadingActiveProjects(true);

    try{
      const {data} = await axios.get(`http://localhost:4000/api/projects/${id}`);
      setActiveProject(data);
      //Default file selection
      const files = Object.keys(data.files);
      if(files.length > 0){
        setactiveFile((prev)=>{
          if(files.includes(prev)) return prev;
          if(files.includes("/App.js")) return "/App.js";
          return files[0];
        })
      }
    }catch(err){
      console.error("Failed to load projects:",err);
      if(!silent){
        toast.error("Failed to load projects details");
        navigate("/")
      }
    }finally{
      if(!silent) setloadingActiveProjects(false);
    }
  }

  //Automatically poll active project status if generating or pending
  useEffect(()=>{
    if(!activeProject?._id || !user) return;
    const isOngoing = activeProject.status === "generating" || activeProject.status === "pending" || activeProject.status === "revising";

    if(isOngoing){
      setChatLoading(true);
      const interval = setInterval(() => {
        loadProject(activeProject._id,true);
      }, 2000);
      return ()=> clearInterval(interval);
    }else{
      setChatLoading(false);
    }
  },[activeProject?._id,activeProject?.status,loadProject,user]);

  const handleGenerate = useCallback(async (prompt)=>{
    if(!user) return;
    setGeneratingProjects(true);
    try{
      const {data} = await axios.post("http://localhost:4000/api/projects",{prompt});
      toast.success("Ai Agent is planning structure...");
      navigate(`/builder/${data._id}`);
    }catch(err){
      console.error("Failed to generate projects:",err);
      toast.error(err?.response?.data?.error || "Failed to generate project");
    }finally{
      setGeneratingProjects(false);
    }
  },[navigate,user]);

    const handleDelete = useCallback(async (id)=>{
    if(!user) return;
    setGeneratingProjects(true);

    try{
      await axios.delete(`http://localhost:4000/api/projects/${id}`);
      setProjects((prev)=>prev.filter((p)=> p._id !== id ));
      toast.success("Project deleted successfully!");
    }catch(err){
      console.error("Failed to delete projects:",err);
      toast.error(err?.response?.data?.error || "Failed to delete project");
    }
  },[user]);

  const handleChat = useCallback(async (prompt)=>{
    if(!user || !activeProject) return;
    setChatLoading(true);
    try{
      const {data} = await axios.post(`http://localhost:4000/api/projects/${activeProject._id}/chat`,{prompt});
      setActiveProject(data);
      if(data.errors && data.errors.length > 0){
        toast.error(`${data.errors.length} revisions patch failed. Please check the chat for details.`);
      }else{
        toast.success(`Updated to version ${data.version} successfully!`);
      }
    }catch(err){
      console.error("Failed to chat with AI:",err);
      toast.error(err?.response?.data?.error || "Failed to chat with AI");
    }finally{
      setChatLoading(false);
    }
  },[user, activeProject]);

  const debounceSave = useMemo(() => debounce(async (projectId, files) => {
    try {
      await axios.put(`http://localhost:4000/api/projects/${projectId}/files`, { files });
    } catch (err) {
      console.error("Failed to save project files:", err);
      toast.error(err?.response?.data?.error || "Failed to save project files");
    }
  }, 1000), []);

  useEffect(() => {
   return () => {
      debounceSave.cancel();
    }
  }, [ debounceSave]);

  const updateProjectFiles = useCallback(( files) => {
    if (!activeProject || !user) return;
    debounceSave(activeProject._id, files);
  }, [activeProject, user, debounceSave]);

  return (
    <AppContext.Provider value={{ 
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
      setactiveFile,
      showCode,
      setshowCode,
      handleDelete,
      handleGenerate,
      loadProject,
      loadProjects,
      handleChat,
      updateProjectFiles
      }}>
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
