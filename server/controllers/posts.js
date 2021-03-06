import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//get all posts
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create a new post
export const createPosts = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId, //get from the middleware logedin user id
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//update post
export const updatePosts = async (req, res) => {
  const { id: _id } = req.params;
  //updated body
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Id not valid");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

//delete posts

export const deletePosts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Id not valid");
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "succsesfully removed" });
};

//like posts

export const likePosts = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.status(404).send("user not authenticated");
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Id not valid");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const response = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(response);
};
