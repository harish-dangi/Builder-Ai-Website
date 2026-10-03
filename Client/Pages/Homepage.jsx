


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
    <div className="h-screen w-full overflow-x-hidden overflow-y-auto bg-[url('/bg-img.png')] bg-cover bg-no-repeat text-amber-200 select-none">
      <nav className="flex items-center justify-between bg-blue-500 p-4 sm:p-6 md:px-5 md:py-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/logo.svg"
            alt="logi"
            className="size-9.5 shrink-0 hover:rotate-360 duration-900 transition-all hover:rotate-x-360"
          />

          <span className="truncate font-medium">
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <p className="max-w-24 truncate text-sm sm:max-w-none">
            {user?.name}
          </p>

          <button
            onClick={logout}
            className="mr-0 rounded-2xl border bg-amber-200/30 px-2 py-2 text-sm cursor-pointer sm:mr-3"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="flex min-h-130 flex-col items-center justify-center px-4">
        <div className="mt-12 flex max-w-full items-center gap-2 rounded-2xl border bg-amber-200/30 p-2 shadow-[10px_10px_40px_1px] transition-all duration-1000 hover:shadow-amber-400/50 hover:rotate-x-360 hover:rotate-360 hover:rotate-y-360 sm:mt-20 sm:gap-3">
          <p className="shrink-0 rounded-2xl bg-fuchsia-500 p-1 text-sm">
            PROMO
          </p>

          <p className="truncate text-xs">
            Create your first project for free.
          </p>
        </div>

        <div className="mt-3 mb-3 flex w-full max-w-150 flex-col items-center font-serif">
          <h1 className="w-full max-w-90 p-3 text-center text-4xl tracking-tighter text-cyan-600 sm:max-w-125 md:max-w-150 md:text-6xl lg:text-7xl">
            Let's build your app together
          </h1>

          <p className="mt-2 w-full max-w-90 text-center text-sm leading-relaxed text-emerald-300/90 sm:max-w-125 md:max-w-140 md:text-base">
            Describe your idea and watch AI design, structure and launch your
            website instantly. No coding required.
          </p>

          {/* Prompt input with glassmorphic variant */}
          <div className="mt-2 w-full max-w-2xl">
            <Promptinput
              onSubmit={handleGenerate}
              loading={generatingProjects}
              placeholder="Create a portfolio website..."
              variant="glass"
            />
          </div>

          {/* scrolling marquee */}
          <div className="masked-marquee mt-3 w-full max-w-2xl overflow-hidden py-1">
            <div className="flex w-max gap-5 whitespace-nowrap animate-marquee">
              {homeTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => handleGenerate(tag)}
                  disabled={generatingProjects}
                  className="shrink-0 rounded-full border bg-amber-50/20 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-amber-100/60 hover:text-black cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* All Projects */}
          {projects.length > 0 && (
            <section className="mx-auto mt-16 w-full max-w-5xl px-1 pb-20 sm:px-4">
              {/* Section Header */}
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                      Your Projects
                    </h2>

                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-zinc-900 px-2 text-xs font-semibold text-white">
                      {projects.length}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm text-zinc-500">
                    Continue building and managing your websites.
                  </p>
                </div>

                {/* View all */}
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  {projects.length === 1
                    ? "1 project"
                    : `${projects.length} projects`}
                </div>
              </div>

              {/* Project Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projects.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => navigate(`builder/${p._id}`)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl sm:p-5"
                  >
                    {/* Top gradient glow */}
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

                    {/* Top */}
                    <div className="relative flex min-w-0 items-start justify-between gap-3">
                      {/* Project Icon + Name */}
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
                          <div className="h-5 w-5 rotate-3 rounded-md border-2 border-white/90" />
                        </div>

                        {/* Name */}
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-zinc-900 transition-colors duration-200 group-hover:text-indigo-600">
                            {p.name || "Untitled Project"}
                          </h3>

                          <p className="mt-1 text-xs text-zinc-400">
                            Website project
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                        <ArrowRightIcon size={15} />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-5 h-px bg-zinc-100" />

                    {/* Bottom */}
                    <div className="relative flex items-center justify-between gap-3">
                      {/* Metadata */}
                      <div className="flex min-w-0 items-center gap-3 text-xs text-zinc-400 sm:gap-4">
                        {/* Updated */}
                        <span className="flex shrink-0 items-center gap-1.5">
                          <ClockIcon size={12} />

                          {moment(
                            p.updatedAt || p.updateAt || p.createdAt,
                          ).fromNow()}
                        </span>

                        {/* Divider */}
                        <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-300" />

                        {/* Version */}
                        <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-500">
                          v{p.version || 1}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p._id);
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-90"
                        title="Delete project"
                      >
                        <Trash2Icon size={14} />
                      </button>
                    </div>

                    {/* Hover Line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
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