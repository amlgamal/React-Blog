import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/Register";
import LoginAuth from "./pages/LoginAuth";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Navbare from "./components/Navbare";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="min-h-screen bg-rose-50">
      <Toaster position="top-right" richColors />
      <Navbare />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginAuth />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
