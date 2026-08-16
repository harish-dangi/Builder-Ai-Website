import React, { useEffect, useRef ,useState } from "react";
import {
  ArrowRightIcon,
  CloudUploadIcon,
  Loader2Icon,
  Mic2Icon,
  MicIcon,
} from "lucide-react";

const Promptinput = ({
  onSubmit,
  loading = false,
  placeholder = "Describe the website you want to build....",
  large = false,
  autoFocus = false,
  variant = "default",
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  if (variant === "glass") {
    return (
      <form className=" bg-amber-50/30 rounded-2xl p-3 md:w-130 w-70  border hover:shadow-[1px_3px_23px_1px] mt-3 duration-500 transition-all shadow-black">
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          disabled={loading}
          rows={3}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          className=" outline-0 w-full  "
        />

        <div className="  flex items-center justify-between p-1">
          <label htmlFor="file">
            <input type="file" id="file" hidden />
            <CloudUploadIcon size={20} className=" hover:text-blue-950 text-blue-200 cursor-pointer "/>
          </label>
          <div className=" flex gap-3">  
            <button type="button" >
              <MicIcon size={20} className=" hover:text-blue-950 text-blue-200 cursor-pointer " />
            </button>
            <button type= "submit" className="hover:text-blue-950  text-blue-200  cursor-pointer" disabled={!value.trim() || loading}> 
              {loading ? (
                <Loader2Icon size={20}  className=" animate-spin"/>
              ) : (
                <ArrowRightIcon size={20} />
              )}
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className={`bg-white  border-zinc-300 rounded-xl flex items-end gap-2 focus-within:ring-1 focus-within:ring-zinc-300 transition ${large? "p-4":"p-3"}`}>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        disabled={loading}
        rows={3}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => handleSubmit()}
        disabled={!value.trim() || loading}
        style={{ width: large ? 36 : 24, height: large ? 36 : 24 }}
      >
        {loading ? <Loader2Icon size={18} /> : <ArrowRightIcon size={18} />}
      </button>
    </div>
  );
};

export default Promptinput;
