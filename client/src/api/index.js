import axios from "axios";

//axios instance
const API = axios.create({ baseURL: "http://localhost:5000" });

//for adding the json token to the middleware,
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

//posts API calls
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (updatedpost, id) =>
  API.patch(`/posts/${id}`, updatedpost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//Auth API calls
export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);

//forgot password API calls
export const forgotpassword = (email) =>
  API.post("/user/forgotPassword", email);
export const resetpassword = (formData, id, token) =>
  API.post(`/user/reset-password/${id}/${token}`, formData);
