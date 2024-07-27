import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import History from "./components/History";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  // const router = createBrowserRouter([
  //   { path: "/signup", element: <Signup /> },
  //   { path: "/signin", element: <Signin /> },
  //   { path: "/history", element: <History /> },
  //   { path: "/", element: <Home /> },
  // ]);

  const cliendId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={cliendId}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
