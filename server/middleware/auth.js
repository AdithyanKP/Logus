import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //we provided this token into the req, api->index.js file
    const token = req.headers.authorization.split(" ")[1];
    //token length less than 500 means its an jwt token otherways google token
    const customAuth = token.length < 500;
    let decodedData;
    if (token && customAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id; //this pass on req, so we can use in controllers
    } else {
      //google auth check
      decodedData = jwt.verify(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
