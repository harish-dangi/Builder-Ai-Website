import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getProjectByIdController } from "../../Server/Controllers/project.controller";
import { ReceiptRussianRuble } from "lucide-react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  //AuthState
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  
  //states
  const [projects,setProjects] = useState([]);
  const [loadingProjects,setloadingProjects] = useState(true);
  const [activeProjects,setactiveProjects] = useState(null);
  const [loadingActiveProjects,setloadingActiveProjects] = useState(true);
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
  }, [checkSession]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
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
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true },
      );

      setUser(data.user);
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
      const {data} = await axios.get("http://localhost:4000/api/projects");
      setProjects(data);
    }catch(err){
      console.error("Failed to list projects:",err);
      toast.error("Failed to load projects list");
    }finally{
      setloadingProjects(false);
    }
  }

  const loadProject = async(id, silent = false)=>{
    console.log(user)
    if(!user) return;
    if(!silent) setloadingActiveProjects(true);

    try{
      const {data} = await axios.get(`http://localhost:4000/api/projects/${id}`);
      setactiveProjects(data);
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
    if(!activeProjects?._id || !user) return;
    const isOngoing = activeProjects.status === "generating" || activeProjects.status === "pending" || activeProjects.status === "revising";

    if(isOngoing){
      setChatLoading(true);
      const interval = setInterval(() => {
        loadProjects(activeProjects._id,true);
      }, 2000);
      return ()=> clearInterval(interval);
    }else{
      setChatLoading(false);
    }
  },[activeProjects?._id,activeProjects?.status,loadProjects,user]);

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


  return (
    <AppContext.Provider value={{ 
      user, 
      loadingUser, 
      login, 
      register,
      projects,
      loadingProjects,
      activeProjects,
      loadingActiveProjects,
      chatLoading,
      generatingProjects,
      activeFile,
      setactiveFile,
      showCode,
      setshowCode,
      handleDelete,
      handleGenerate,
      loadProject,
      loadProjects
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
