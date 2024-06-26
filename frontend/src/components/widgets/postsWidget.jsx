import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";
import PostWidget from "../widgets/postWidget";
import axios from "axios";
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const getPosts = async () => {
    // useEffect(async()=>{   
    //   console.log("posts");  
      const response = await axios.get(
        `${import.meta.env.VITE_backend_URL}/posts`,
        {
          withCredentials: true,
          headers: {
            "Content-Type":"application/json",
           "Access-Control-Allow-Origin":"*",
            Authorization:`Bearer ${token}`
          },
        }
      )
      dispatch(setPosts({ posts: response.data.post}));
    // },[])
  };

  const getUserPosts = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_backend_URL}/posts/${userId}/posts`,
      {
        withCredentials: true,
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
      }
    )
    dispatch(setPosts({ posts: response.data.post }));
  };

  useEffect(() => {
    if (isProfile) {
      // if(userId)
      getUserPosts();
    } else {
      getPosts();
    }
  }, [posts]);
  return (
    <>
      {posts?posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
          />
        )
      ):<div></div>}
    </>
  );
};

export default PostsWidget;