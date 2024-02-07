import { Routes, Route } from "react-router-dom";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import Layout from "./page/route/Layout";
import { useProfile } from "./store/zudtand";
import { useEffect } from "react";
function App() {
  const { onLogin } = useProfile();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth") || "") || null;

    if (user) {
      onLogin(user[0]);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
