import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Comments = ({ postId, userId, auther }) => {
  return (
    <div>
      <AllComments postId={postId} />
      <AddComment postId={postId} userId={userId} auther={auther} />
    </div>
  );
};

const AllComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/getComments?postId=${postId}`
        );
        console.log(response);
        if (response?.data.success) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className=" border bg-white border-gray-500 shadow-lg">
      {comments.map((e) => (
        <div key={e?._id} className="border p-2">
          <div className="flex items-center gap-2">
            <FaUserCircle size={20} />
            <p className="font-bold">{e?.auther}</p>
          </div>
          <p className="ml-8">{e?.comment}</p>
        </div>
      ))}
    </div>
  );
};

const AddComment = ({ postId, userId, auther }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment) {
      try {
        const newComment = { userId, postId, auther, comment };
        const response = await axios.post(
          `http://localhost:5000/posts/addComment`,
          newComment
        );
        console.log(response);
        if (response?.data.success) {
          console.log("comment added");
          setComment("");
          alert("Comment added");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[500px] border bg-white border-gray-500 shadow-lg p-4 rounded-b-lg space-y-3"
      encType="multipart/form-data"
    >
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        placeholder="Add Comment..."
        className="w-full outline-none border border-gray-500 rounded-md py-2 px-3"
      />

      <div className="flex justify-between items-center">
        <Button type="submit">Add Comment</Button>
      </div>
    </form>
  );
};

export default Comments;
