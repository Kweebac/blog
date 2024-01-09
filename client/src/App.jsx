import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Posts from "./components/Posts";
// import Post from "./components/Post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<Posts />} />
        {/* <Route path="/posts/:postId" element={<Post />} /> */}
      </Routes>
    </>
  );
}

export default App;
