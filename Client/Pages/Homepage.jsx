import React from "react";
import { useAppContext } from "../Context/AppContext";
import Promptinput from "../Components/Promptinput";
import { homeTags } from "../assets/assets";
import { useEffect } from "react";

const Homepage = () => {
  const {
    user,
    projects,
    loadingProjects,
    generatingProjects,
    handleDelete,
    handleGenerate,
    loadProjects,
    logout,
  } = useAppContext();
  // console.log(user.id)
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);
  return (
    <div className=" h-screen w-full  bg-[url('/bg-img.png')] bg-cover bg-no-repeat text-amber-200 select-none  ">
      <nav className="flex bg-blue-500 items-center justify-between p-7 md:py-3 md:px-5 ">
        <div className="flex gap-3 items-center">
          <img
            src="/logo.svg"
            alt="logi"
            className=" size-9.5 hover:rotate-360 duration-900  transition-all hover:rotate-x-360"
          />
          <span className="font-medium">
            {["B", "u", "i", "l", "d", "e", "r", " - ", "A", "I"].map(
              (letter, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-[fadeIn_0.3s_ease_forwards]"
                  style={{
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  {letter}
                </span>
              ),
            )}
          </span>
        </div>
        <div  className="flex gap-3 items-center">
          <p>{user?.name}</p>
          {console.log(user)}
          <button
            onClick={logout}
            className="border rounded-2xl py-2 px-2 bg-amber-200/30  mr-3  
        cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </nav>
      <div className=" flex flex-col items-center justify-center min-h-130">
        <div className=" border rounded-2xl p-2 flex gap-3 items-center bg-amber-200/30 shadow-[10px_10px_40px_1px] hover:shadow-amber-400/50 duration-1000 transition-all hover:rotate-x-360 hover:rotate-360 hover:rotate-y-360 mt-20">
          <p className="bg-fuchsia-500 rounded-2xl text-sm p-1">PROMO</p>
          <p className="text-xs"> Create your first project for free. </p>
        </div>
        <div className="flex flex-col items-center  font-serif  mt-3 w-150 mb-3 ">
          <h1 className="lg:text-7xl md:text-6xl text-4xl text-cyan-600 p-3 tracking-tighter text-center w-90 md:w-150">
            Let's build your app together{" "}
          </h1>

          <p className="mt-2 leading-relaxed text-center text-emerald-300/90 text-sm md:text-base  md:w-140 w-90 ">
            Describe your idea and watch AI design, structure and launch your
            website instantly. No coding required.
          </p>
          {/* Prompt input with glassmorphic variant */}
          <div>
            <Promptinput
              onSubmit={handleGenerate}
              loading={generatingProjects}
              placeholder="Create a portfolio website..."
              variant="glass"
              autoFocus
            />
          </div>
          {/* scrolling marquee */}
          <div className="w-full max-w-2xl mt-3 py-1 overflow-hidden masked-marquee ">
            <div className="flex w-max gap-5 whitespace-nowrap animate-marquee">
              {homeTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => handleGenerate(tag)}
                  disabled={generatingProjects}
                  className="shrink-0 rounded-full px-4 py-2 text-sm font-medium hover:bg-amber-100/60 transition-all duration-300 border bg-amber-50/20 cursor-pointer hover:text-black "
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {/* All Projects */}
          {!loadingProjects && projects.length > 0 && (
            <div className="mt-12 w-full">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <p className="text-xs font-medium uppercase text-zinc-100 tracking-widest">
                  All Projects
                </p>
                <span>
                  {projects.length}{" "}
                  {projects.length === 1 ? "project " : " projects"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
