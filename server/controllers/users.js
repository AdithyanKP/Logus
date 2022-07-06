import mongoose from "mongoose";
import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
//signin

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const exsistingUser = await user.findOne({ email });
    if (!exsistingUser)
      return res.status(404).json({ message: "No user found" });
    const isPasswordCrct = await bcrypt.compare(
      password,
      exsistingUser.password
    );
    if (!isPasswordCrct)
      return res.status(404).json({ message: "Password incorrect" });

    const token = jwt.sign(
      { email: exsistingUser.email, id: exsistingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: exsistingUser, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//signup

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const exsistingUser = await user.findOne({ email });

    if (exsistingUser)
      return res.status(404).json({ message: "User already exist" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password not match" });
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await user.create({
      email,
      password: passwordHash,
      name: `${firstName}${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    console.log("meeeeeee");
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something ent wrong" });
  }
};

//forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const exsistingUser = await user.findOne({ email });
    console.log(exsistingUser);
    if (!exsistingUser)
      return res.status(404).json({ message: "No user found" });
    //token creation
    const token = jwt.sign(
      { email: exsistingUser.email, id: exsistingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    //link in the mail
    const link = `${process.env.BASE_URL}reset-password/${exsistingUser._id}/${token}`;
    //sendmail section
    await sendEmail(exsistingUser.email, "password reset", link);
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

//password reset
export const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  console.log(req.body);
  const { id } = req.params;
  console.log(req.params);
  const { token } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Id not valid");

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password not match" });
    const User = await user.findById(id);
    if (!User) return res.status(400).json({ message: "user not found" });
    const passwordHash = await bcrypt.hash(password, 12);
    User.password = passwordHash;
    await User.save();
    console.log("password reset successfully");
  } catch (error) {
    console.log(error);
  }
};
