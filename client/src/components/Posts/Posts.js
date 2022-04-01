import React from "react";
import Post from "./post/Post";
import useStyles from "./syles";

import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
const Posts = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  //fetching the state value
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      {!posts.length ? (
        <div>
          <h3>No Posts found</h3>
        </div>
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={6}>
              <Post
                post={post}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
