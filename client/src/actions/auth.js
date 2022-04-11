import * as api from "../api";
import { AUTH, FORGOT } from "../constants/actionTypes";
export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //log in action
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    //signUp in action
    console.log(formData);
    const { data } = await api.signup(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    /* console.log(error); */
    console.log("adithyan");
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await api.forgotpassword(email);
    dispatch({ type: FORGOT });
  } catch (error) {
    console.log(error);
  }
};
