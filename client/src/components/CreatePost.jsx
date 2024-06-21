import { useState } from "react";
import { FaImage } from "react-icons/fa";
import Button from "./Button";
import { setShowCreatePost } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addPost } from "../redux/postSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);

  console.log(image);

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ title, image });

    if (title) {
      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("userId", user?._id);
        // const newPost = { title, userId: user?._id, imageData };
        const response = await axios.post(
          `http://localhost:5000/posts/createPost?`,
          formData,
          headers
        );
        console.log(response);
        if (response?.data.success) {
          dispatch(addPost(response?.data.post));
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setShowCreatePost(false));
  };

  return (
    <div className="bg-black/70 w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[400px] border bg-white border-gray-500 shadow-lg p-6 rounded-lg space-y-3"
        encType="multipart/form-data"
      >
        <h1 className="font-bold text-2xl">Create Post</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full outline-none border border-gray-500 rounded-md py-2 px-3"
        />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt=""
            className="w-full rounded-md aspect-square object-cover"
          />
        ) : (
          <label className="flex justify-center items-center gap-3 border border-gray-600 py-1 px-2 rounded-md hover:text-gray-500 hover:border-gray-500 ">
            <FaImage />
            Add Image
            <input
              type="file"
              className="hidden"
              onChange={handleCoverChange}
            />
          </label>
        )}

        <div className="flex justify-between items-center">
          <Button onClick={() => dispatch(setShowCreatePost(false))}>
            Cancel
          </Button>
          <Button type="submit">Share</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
