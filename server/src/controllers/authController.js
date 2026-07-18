import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = generateToken(user._id);

   res.cookie("token", token, {
     httpOnly: true,
     secure: true,
     sameSite: "None",
     maxAge: 7 * 24 * 60 * 60 * 1000,
   });

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = generateToken(user._id);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
