import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { createPosts } from "../../actions/posts";
const Form = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    author: "",
    title: "",
    message: "",

    selectedFile: "",
  });

  const classes = useStyles();

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
    dispatch(createPosts(postData));

    //cleaning the state value
    setPostData({
      author: "",
      title: "",
      message: "",

      selectedFile: "",
    });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root}${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Add Post</Typography>
          <TextField
            name="author"
            variant="standard"
            label="Author"
            fullWidth
            value={postData.creator}
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
          >
            Upload
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
