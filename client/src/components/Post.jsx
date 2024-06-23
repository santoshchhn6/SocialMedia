import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { incrementLikes, removePost } from "../redux/postSlice";
import Comments from "./Comments";
import { useEffect, useState } from "react";

const Post = ({ data }) => {
  const [showComments, setShowComments] = useState(false);
  // console.log(data);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div className="w-full sm:w-[500px] p-2 bg-slate-100 border border-gray-400  shadow-md rounded-md space-y-2">
        <h1 className="text-2xl text-gray-600 font-bold ">{data?.title}</h1>

        <img
          src={`http://localhost:5000/images/${data?.image}`}
          alt=""
          className="w-full aspect-video object-cover rounded-md"
        />
        <div className="flex gap-5">
          <LikePost postId={data?._id} userId={user._id} />

          <div
            onClick={() => {
              setShowComments(!showComments);
            }}
            className="flex gap-2 items-center cursor-pointer hover:text-green-600"
          >
            Comments <MdOutlineInsertComment size={20} />
          </div>
          {data?.userId == user._id && <DeletePost id={data?._id} />}
        </div>
      </div>
      {showComments && (
        <Comments
          postId={data?._id}
          userId={data?.userId}
          auther={user.username}
        />
      )}
    </div>
  );
};

const LikePost = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/getLike?userId=${userId}&postId=${postId}`
        );
        console.log(response);
        if (response?.data.success) {
          setCount(response.data.count);
          if (response.data.like.userId == userId) setLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikes();
  }, []);

  const handleLike = async () => {
    console.log("clicked");
    try {
      const newLike = { userId, postId };
      const response = await axios.post(
        `http://localhost:5000/posts/likePost/`,
        newLike
      );
      console.log(response);
      if (response?.data.success) {
        setCount(response.data.count);
        console.log("liked post");
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {count}
      <FaRegThumbsUp
        size={20}
        onClick={handleLike}
        className={` ${
          liked ? "text-blue-700" : "text-gray-600"
        } hover:text-blue-600 cursor-pointer`}
      />
    </div>
  );
};

const DeletePost = ({ id }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleOnDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/posts/delete/${id}`,
        headers
      );
      console.log(response);
      if (response?.data.success) {
        dispatch(removePost(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleOnDelete}
      className="flex gap-2 items-center cursor-pointer hover:text-red-600"
    >
      Delete
      <MdDelete size={20} />
    </div>
  );
};

export default Post;
