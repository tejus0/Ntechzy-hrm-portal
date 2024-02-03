const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const config = require("../config/config");

// for configuring and sending mail
const sendVerifyMail = async (name, email, user_id) => {
  console.log("Top line - ", user_id);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "Verification mail .",
      html:
        "<p>Hi " +
        name +
        ', please click <a href="http://127.0.0.1:3000/verify?id=' +
        user_id +
        '">Here</a> to verify your mail .</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully - ", info.response);
        console.log(user_id);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      image: req.file.filename,
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();
    console.log(userData);

    if (userData) {
      sendVerifyMail(req.body.name, req.body.email, userData._id);
      res.render("registration", {
        message:
          "Your registration has been successful. Please verify your mail .",
      });
    } else {
      res.render("registration", { message: "Registration is failed .." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyMail = async (req, res) => {
  try {
    const updatedInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );
    console.log(updatedInfo);
    res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

//login user method
const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        if (userData.is_verified === 0) {
          res.render("login", { message: "Please verify your mail ." });
        } else {
          req.session.user_id = userData._id;
          res.redirect("/home");
        }
      } else {
        res.render("login", {
          message: "Email and passwoird are incorrect ! ",
        });
      }
    } else {
      res.render("login", { message: "Email and passwoird are incorrect !" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

// forgot password
const forgetLoad = async (req, res) => {
  try {
    res.render("forget");
  } catch (error) {
    console.log(error.message);
  }
};
//for reset password sending mail
const sendResetPassMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "Reset Password mail .",
      html:
        "<p>Hi " +
        name +
        ', please click <a href="http://127.0.0.1:3000/forget-password?token=' +
        token +
        '">Here</a> to reset password of your mail .</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully - ", info.response);
        console.log(user_id);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassVerify = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      if (userData.is_verified === 0) {
        res.render("forget", { message: "Please verify your mail first ." });
      } else {
        const randomString = randomstring.generate();
        const updatedData = await User.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        sendResetPassMail(userData.name, email, randomString);
        res.render("forget", {
          message: "Please check your mail to reset your password .",
        });
      }
    } else {
      res.render("forget", { message: "User email is incorrect ." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const forgetPassLoad = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      res.render("forget-password", { user_id: tokenData._id });
    } else {
      res.render("404", { message: "Page not FOUND !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const newPass = req.body.password;
    const user_id = req.body.user_id;

    const securedPass = await securePassword(newPass);

    const updatedPass = await User.findByIdAndUpdate(
      { _id: user_id },
      { $set: { password: securedPass, token: "" } }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
  verifyMail,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  forgetLoad,
  resetPassVerify,
  forgetPassLoad,
  resetPassword,
};
