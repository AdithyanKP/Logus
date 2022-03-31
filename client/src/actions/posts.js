import * as api from "../api";

//actions creators ,in here we dispatch a function
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//create post

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log(data);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
