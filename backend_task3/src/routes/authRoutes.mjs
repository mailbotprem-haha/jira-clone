import { Router } from "express";
import jwt from "jsonwebtoken";

import { User } from "../mongoose/schemas/user.mjs";

import { hashPassword } from "../utils/password.mjs";

import { comparePassword } from "../utils/password.mjs";

import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
     console.log("SIGNUP HIT");
  console.log(req.body);

    const {
      username,
      email,
      password,
    } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const foundUser =
      await User.findOne({
        email,
      });

    if (foundUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message:
        "Signup successful",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const foundUser =
      await User.findOne({
        email,
      });

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword =
      comparePassword(
        password,
        foundUser.password
      );

    if (!validPassword) {
      return res.status(401).json({
        message:
          "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      token,

      user: {
        id: foundUser._id,
        username:
          foundUser.username,
        email: foundUser.email,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Login failed",
    });
  }
});

router.get(
  "/status",
  authMiddleware,
  async (req, res) => {
    return res.status(200).json({
      user: req.user,
      loggedIn: true,
    });
  }
);

router.post("/logout", (req, res) => {
  return res.status(200).json({
    message: "Logout successful",
  });
});

export default router;