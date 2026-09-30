import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Promptinput from "../Components/Promptinput";
import { homeTags } from "../assets/assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ClockIcon, Trash2Icon } from "lucide-react";
import moment from "moment";

const Homepage = () => {
  const {
    user,
    projects,
    // loadingProjects,
    generatingProjects,
    handleDelete,
    handleGenerate,
    loadProjects,
    logout,
    // loadProject
  } = useContext(AppContext);

  const navigate = useNavigate();

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
        <div className="flex gap-3 items-center">
          <p>{user?.name}</p>

          <button onClick={logout}  className="border rounded-2xl py-2 px-2 bg-amber-200/30  mr-3  cursor-pointer" >
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
          {/* All Projects */}
          {/* ================= ALL PROJECTS ================= */}
          {projects.length > 0 && (
            <section className="mt-16 w-full max-w-5xl mx-auto px-4 pb-20">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                      Your Projects
                    </h2>

                    <span className=" inline-flex items-center justify-center  min-w-7 h-7 px-2 rounded-full bg-zinc-900  text-white  text-xs font-semibold " >
                      {projects.length}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm text-zinc-500">
                    Continue building and managing your websites.
                  </p>
                </div>

                {/* View all */}
                <div
                  className="
        flex items-center gap-2
        text-xs font-medium
        text-zinc-400
      "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {projects.length === 1
                    ? "1 project"
                    : `${projects.length} projects`}
                </div>
              </div>

              {/* ================= PROJECT GRID ================= */}
              <div
                className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-4
    "
              >
                {projects.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => navigate(`/builder/${p._id}`)}
                    className="
            group
            relative
            overflow-hidden
            cursor-pointer

            rounded-2xl
            border border-zinc-200
            bg-white

            p-5

            shadow-sm
            transition-all
            duration-300

            hover:-translate-y-1
            hover:border-zinc-300
            hover:shadow-xl
          "
                  >
                    {/* Top gradient glow */}
                    <div
                      className="
            absolute
            -top-20
            -right-20
            h-40
            w-40
            rounded-full
            bg-indigo-500/10
            blur-3xl
            transition-all
            duration-500
            group-hover:bg-indigo-500/20
          "
                    />

                    {/* ================= TOP ================= */}
                    <div
                      className="
            relative
            flex
            items-start
            justify-between
          "
                    >
                      {/* Project Icon + Name */}
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Icon */}
                        <div
                          className="  flex  h-12  w-12 shrink-0 items-center  justify-center rounded-xl  bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105 "
                        >
                          <div  className=" h-5  w-5  rounded-md  border-2  border-white/90 rotate-3 "
                          />
                        </div>

                        {/* Name */}
                        <div className="min-w-0">
                          <h3 className="  truncate  text-sm font-semibold text-zinc-900  transition-colors  duration-200  group-hover:text-indigo-600 " >
                            {p.name || "Untitled Project"}
                          </h3>

                          <p className=" mt-1 text-xs text-zinc-400 ">
                            Website project
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div
                        className=" flex h-9 w-9 shrink-0 items-center justify-center  rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 transition-all  duration-300  group-hover:border-indigo-200  group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:translate-x-1 "
                        >
                        <ArrowRightIcon size={15} />
                      </div>
                    </div>

                    {/* ================= DIVIDER ================= */}
                    <div  className="  relative my-5 h-px bg-zinc-100"/>

                    {/* ================= BOTTOM ================= */}
                    <div className="  relative   flex items-center  justify-between " >
                      {/* Metadata */}
                      <div  className="  flex items-center  gap-4 text-xs  text-zinc-400 ">
                        {/* Updated */}
                        <span className="flex items-center gap-1.5">
                          <ClockIcon size={12} />

                          {moment(
                            p.updatedAt || p.updateAt || p.createdAt,
                          ).fromNow()}
                        </span>

                        {/* Divider */}
                        <span  className=" h-1 w-1 rounded-full bg-zinc-300 " />

                        {/* Version */}
                        <span
                          className="  rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-500">
                          v{p.version || 1}
                        </span>
                      </div>

                      {/* Delete */}
                      <button onClick={(e) => {
                         e.stopPropagation();
                          handleDelete(p._id);
                        }}
                        className=" flex h-8 w-8 items-center justify-center rounded-lg text-zinc-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-90 "
                        title="Delete project"  >
                        <Trash2Icon size={14} />
                      </button>
                    </div>

                    {/* ================= HOVER LINE ================= */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full"/>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
