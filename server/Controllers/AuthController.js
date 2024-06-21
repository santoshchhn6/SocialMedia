import User from "../Models/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res, next) => {
  try {

    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ message: "fields Missing" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ message: "Email already exists" });
    }
    
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.json({ message: "Username already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id.toString());

    const { password: p, ...rest } = user._doc;
    res.status(201).json({
      message: "User signed in successfully",
      user: rest,
      success: true,
      token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }

    const token = createSecretToken(user._id.toString());

    const { password: p, ...rest } = user._doc;

    res.status(200).json({
      message: "User logged in successfully",
      user: rest,
      success: true,
      token,
    });

    next();

  } catch (error) {
    console.log(error);
  }
};
