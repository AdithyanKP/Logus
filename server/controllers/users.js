import mongoose from "mongoose";
import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signin

export const signin = async (req, res) => {};

//signup
export const signup = async (req, res) => {
  const { email, password, confirmPassword, FirstName, LastName } = req.body;

  try {
    const exsistingUser = await user.findOne({ email });
    if (exsistingUser)
      return res.status(404).json({ message: "User already exist" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "Password not match" });
    const passwordHash = bcrypt.hash(password, 12);
    const result = await user.create({
      email,
      password: passwordHash,
      name: `${FirstName}${LastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
