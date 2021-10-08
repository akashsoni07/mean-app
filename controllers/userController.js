require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const mailSender = require("../utils/mailSender");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords must match." });
    }
    const user_email = await User.findOne({ email });
    if (user_email) {
      return res.status(400).json({ message: "This email is already taken!" });
    }
    const emailToken = jwt.sign(
      { firstName, lastName, email, password },
      process.env.EMAILTOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const resetEmailToken = crypto.randomBytes(32).toString("hex");

    const _resetEmailToken = crypto
      .createHash("sha256")
      .update(resetEmailToken)
      .digest("hex");

    const uri = `meanapp21.herokuapp.com/verify-email?token=${_resetEmailToken}`;

    try {
      await mailSender({ 
        email: email,
        subject: "Verify Email",
        html: `<p>You requested for email verification.</p>
                   <p>Please click on the given link below.</p>
                   <a href=${uri}>${uri}</a>`,
      });
      return res.status(200).json({
        message: "Email sent successfully!",
        emailToken,
      });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message:
          "There was an error sending the email, Please try again later!",
        err,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token: token,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist with this email!" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.expireToken = Date.now() + 900000;

    await user.save();
    const uri = `meanapp21.herokuapp.com/reset-password?token=${resetToken}`;
    try {
      await mailSender({
        email: user.email,
        subject: "Reset Password",
        html: `<p>You requested for reset password.</p>
                   <p>Please click on the given link below.</p>
                   <a href=${uri}>${uri}</a>`,
      });
      return res.status(200).json({
        message: "Mail sent successfully!",
        resetToken: user.resetToken,
        expireToken: user.expireToken,
      });
    } catch (err) {
      user.resetToken = undefined;
      user.expireToken = undefined;
      await user.save();
      return res.status(400).json({
        message:
          "There was an error sending the email, Please try again later!",
        err,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmNewPassword } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Session has been expired, Please try again later." });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords must match!" });
    }
    const user = await User.findOne({
      resetToken: token,
      expireToken: { $gte: Date.now() },
    });
    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      await user.save();
      return res
        .status(201)
        .json({ message: "Password updated successfully!" });
    }
    return res
      .status(400)
      .json({ message: "Something went wrong, Please try again later." });
  } catch (err) {
    res.status(400).json(err);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "old password and New password should not be the same!",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords must match!" });
    }
    const user = await User.findById(req.user._id);
    if (user) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Old password is not correct!",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            password: hashedPassword,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({ message: "Password updated successfully!" });
    }
    return res.status(400).json({ message: "Something went wrong, Please try again later!"});
  } catch (err) {
    res.status(400).json(err);
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.EMAILTOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({
          message: "Session has been expired, Please try again later.",
        });
      }
      const { firstName, lastName, email, password } = decodedToken;
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          });
          user.save((err, success) => {
            if (err) {
              return res.status(400).json(err);
            }
            if (success) {
              return res
                .status(201)
                .json({ message: "Sign up successfully!", user });
            }
          });
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (email === req.user.email) {
      return res
        .status(400)
        .json({ message: "You already signed up with this email!" });
    }
    const user_email = await User.findOne({ email });
    if (user_email) {
      return res.status(400).json({ message: "This email is not available!" });
    }
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { firstName, lastName, email } },
      { new: true }
    );
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  editProfile,
};
