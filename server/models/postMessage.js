import mongoose from "mongoose";

//mongoose schema creation

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,

  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
