import React from "react";
import Post from "./post/Post";
import useStyles from "./syles";

import { useSelector } from "react-redux";
const Posts = () => {
  const classes = useStyles();

  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
