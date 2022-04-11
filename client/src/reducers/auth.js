import { AUTH, LOGOUT, FORGOT, RESET } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("Profile", JSON.stringify(action?.data));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case FORGOT:
      return state;
    case RESET:
      return state;
    default:
      return state;
  }
};
export default authReducer;
