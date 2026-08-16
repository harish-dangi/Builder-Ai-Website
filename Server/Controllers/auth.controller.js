import UserModel from "../Model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Empty validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required."
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Format."
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      });
    }

    // Check existing user
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });
    console.log(user)
    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        name:user.name
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d"
      }
    );
    // Save Token in Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const loginController = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Empty Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required."
      });
    }

    // Find User
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password."
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        name:user.name
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d"
      }
    );

    // Store Token in Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout Failed",
      error: error.message,
    });
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = req.user;
  
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching user",
      error: error.message,
    });
  }
};