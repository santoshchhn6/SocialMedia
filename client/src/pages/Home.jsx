import Posts from "../components/Posts";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Comments from "../components/Comments";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { showCreatePost } = useSelector((state) => state.app);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.username) navigate("/login");
    toast(`Welcome ${user?.username}`, {
      position: "top-right",
    });
  }, [navigate]);

  return (
    <div>
      {showCreatePost && <CreatePost />}
      {/* {showComments && <Comments />} */}

      <Posts />
      <ToastContainer />
    </div>
  );
};

export default Home;
