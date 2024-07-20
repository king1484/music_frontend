import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  async function submit(data) {
    try {
      if (!data.name || !data.email || !data.password)
        return setError("Please fill all the fields");
      let res = await fetch(`${serverUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      if (response.data === "ok") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", data.email);
        setError(null);
        navigate("/");
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }

  return (
    <div className="container my-2 md:h-screen md:my-0 flex flex-col justify-center mx-auto items-center">
      <div className="box bg-white lg:w-[35vw] border-2 rounded-lg flex flex-col items-center py-10 mx-2 md:mx-4">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col w-4/5">
          <p className="pt-2 text-center">
            Sign up to get access to all the features of our app
          </p>
          <label htmlFor="name" className="mt-4 mb-1 font-semibold text-sm">
            Name
          </label>
          <input
            className="outline-none border-2 rounded-lg px-3 py-2 bg-gray-200"
            {...register("name")}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
          />
          <label htmlFor="email" className="mt-3 mb-1 font-semibold text-sm">
            Email
          </label>
          <input
            className="outline-none border-2 rounded-lg px-3 py-2 bg-gray-200"
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password" className="mt-3 mb-1 font-semibold text-sm">
            Password
          </label>
          <input
            className="outline-none border-2 rounded-lg px-3 py-2 bg-gray-200"
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          {error && (
            <div className="mt-4 bg-red-100 p-2 rounded-sm flex items-center">
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-1.5 text-red-500 dark:text-red-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <button
            className="mt-5 bg-blue-500 text-white font-semibold rounded-full px-2 py-2
            hover:bg-blue-400 transition duration-200 ease-in-out disabled:bg-blue-200 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-500 animate-spin dark:text-gray-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#ffffff"
                  />
                </svg>
                <span className="text-blue-900">Loading...</span>
              </span>
            ) : (
              "Create Account"
            )}
          </button>
          <p className="pt-3 text-center">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-blue-500 cursor-pointer hover:text-blue-400"
            >
              Sign In
            </a>{" "}
            now
          </p>

          <div className="flex items-center justify-center mt-5">
            <div className="bg-gray-200 h-0.5 w-full"></div>
            <span className="px-2 bg-white text-sm text-gray-500">Or</span>
            <div className="bg-gray-200 h-0.5 w-full"></div>
          </div>

          <button
            className="flex items-center justify-center mt-5 border-2 text-white font-semibold rounded-full px-2 py-2
            hover:bg-gray-100 transition duration-200 ease-in-out"
            type="button"
          >
            <img
              className="w-6 h-6 mr-2"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
            />
            <span className="text-gray-500 font-semibold">
              Sign up with Google
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
