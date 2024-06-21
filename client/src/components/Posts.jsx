import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/postSlice";
import Comments from "./Comments";
import Post from "./Post";

const Posts = () => {
  // const [posts, setPosts] = useState([]);
  const { posts } = useSelector((state) => state.posts);
  console.log(typeof posts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { token } = useSelector((state) => state.user);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, []);

  const fetchPosts = async (currentPage) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/posts?page=${currentPage}`,
        config
      );
      // console.log(data);
      const postList = data?.data?.posts;
      setHasMore(postList?.length > 0);
      if (postList?.length > 0) {
        dispatch(setPosts(postList));
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!posts?.length) return <h1>No Posts</h1>;

  return (
    <div className="min-h-screen space-y-5 flex justify-center">
      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchPosts(currentPage)}
        hasMore={hasMore} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
        className="space-y-5 "
      >
        {posts?.map((e) => (
          <Post key={e._id} data={e} />
        ))}
      </InfiniteScroll>
     
    </div>
  );
};

export default Posts;
