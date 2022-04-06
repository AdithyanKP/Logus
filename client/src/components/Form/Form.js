import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePost } from "../../actions/posts";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("Profile"));
  console.log(user);
  //finding specified post for editing
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    author: "",
    title: "",
    message: "",
    selectedFile: "",
  });

  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);

    //currentId is there
    if (currentId) {
      await dispatch(
        updatePost(currentId, { ...postData, creator: user?.result?.name })
      );
      //cleaning the state value
      setCurrentId(null);
      setPostData({
        author: "",
        title: "",
        message: "",
        selectedFile: "",
      });
    } else {
      await dispatch(createPosts({ ...postData, creator: user?.result?.name }));
      //cleaning the state value
      setCurrentId(null);
      setPostData({
        author: "",
        title: "",
        message: "",

        selectedFile: "",
      });
    }
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign in
        </Typography>
      </Paper>
    );
  }
  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root}${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Edit Post" : "Create post"}
          </Typography>
          <TextField
            name="author"
            variant="standard"
            label="Author"
            fullWidth
            value={postData.author}
            onChange={(e) =>
              setPostData({ ...postData, author: e.target.value })
            }
          />
          <TextField
            name="title"
            variant="standard"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="standard"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              value={postData.selectedFile}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            startIcon={<CloudUploadIcon />}
          >
            {currentId ? "Submit" : "Upload"}
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
