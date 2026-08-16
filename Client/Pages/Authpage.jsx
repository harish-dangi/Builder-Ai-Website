import React, { useState } from "react";
import LoginLeft from "../Components/LoginLeft";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";


const Authpage = ({ mode }) => {

  const navigate = useNavigate();
  const {login,register,user,loginUser} = useAppContext();
  // console.log(user)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (mode === "login") {
      await login(email, password);
      navigate("/");
    } else {
      await register(name, email, password);
      navigate("/login");
    }
  } catch (err) {
    setError(
      err.message ||
        (mode === "login"
          ? "Invalid email or password"
          : "Registration Failed")
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Part - Branding */}

      <LoginLeft />

      {/* Right Part - Form */}
      <div className=" lg:w-1/2 flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {isLogin
                ? "Enter your credentials to access your website builder."
                : "Get started by entering your registration details."}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={ handleSubmit }>
            {/* Full Name - Register Only */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="
                    w-full rounded-lg border border-zinc-200
                    bg-white px-4 py-3
                    text-sm text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                    transition-all duration-200
                    hover:border-zinc-300
                    focus:border-zinc-900
                    focus:bg-zinc-200
                    focus:ring-2 focus:ring-zinc-900/10
                  "
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="
                  w-full rounded-lg border border-zinc-200
                  bg-white px-4 py-3
                  text-sm text-zinc-900
                  placeholder:text-zinc-400
                  outline-none
                  transition-all duration-200
                  hover:border-zinc-300
                  focus:border-zinc-900
                  focus:bg-zinc-200
                  focus:ring-2 focus:ring-zinc-900/10
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Password
              </label>

              <div
                className="
                  flex items-center rounded-lg
                  border border-zinc-200
                  bg-white
                  transition-all duration-200
                  hover:border-zinc-300
                  focus-within:border-zinc-900
                  focus-within:ring-2
                focus:bg-zinc-200
                focus-within:ring-zinc-900/10
                "
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="
                    w-full bg-transparent
                    px-4 py-3
                    text-sm text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    mr-2 rounded-md p-2
                    text-zinc-400
                    transition-colors
                    hover:bg-zinc-100
                    hover:text-zinc-700
                  "
                >
                  {showPassword ? (
                    <EyeOffIcon size={17} />
                  ) : (
                    <EyeIcon size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 w-full rounded-lg
                bg-zinc-900 px-4 py-3
                text-sm font-medium text-white
                shadow-sm
                transition-all duration-300
                hover:bg-zinc-800
                hover:shadow-md
                active:scale-[0.95]
                disabled:cursor-not-allowed
                focus:bg-green-700
                disabled:opacity-60  cursor-pointer
              "
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          {/* Switch Login/Register */}
          <p className="mt-6 text-center text-sm text-zinc-500">
            {isLogin ? (
              <>
                New to BuilderAI?{" "}
                <Link
                  to="/register"
                  className="
                    font-medium text-zinc-900
                    underline-offset-4
                    hover:underline
                  "
                >
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-medium text-zinc-900
                    underline-offset-4
                    hover:underline
                  "
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authpage;
