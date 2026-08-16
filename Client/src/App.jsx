import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, GuestLayout } from "../Pages/Layoutpage";
import Authpage from "../Pages/Authpage";
import Homepage from "../Pages/Homepage";
import Builderpage from "../Pages/Builderpage";
import Previewpage from "../Pages/Previewpage";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/builder/:id" element={<Builderpage />} />
        <Route path="/preview/:id" element={<Previewpage />} />
      </Route>

      <Route element={<GuestLayout />}>
        <Route path="/login" element={<Authpage mode="login" />} />

        <Route path="/register" element={<Authpage mode="register" />} />
      </Route>

      <Route path="/" element={<Homepage />} />
    </Routes>
    </>
  );
};

export default App;
