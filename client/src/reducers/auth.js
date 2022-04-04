import { AUTH } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("Profile", JSON.stringify(action?.data));
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};
export default authReducer;
