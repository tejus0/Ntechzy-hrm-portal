import User from "../models/userModel.js";
import Registeration from "../models/registerModel.js";
import Leave from "../models/leavesModel.js";
import Todo from "../models/adminToDoModel.js";
import Event from "../models/events.js";
import Sales from "../models/salesModel.js";
import moment from "moment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import { sessionSecret, emailUser, emailPass } from "../config/config.js";

// for configuring and sending mail
export const sendVerifyMail = async (name, email, user_id) => {
  console.log("Top line - ", user_id);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Verification mail .",
      html:
        "<p>Hi " +
        name +
        ', please click <a href="http://127.0.0.1:7000/api/verify?id=' +
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

export const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

export const loadRegister = async (req, res) => {
  try {
    res.render("Registration");
  } catch (error) {
    console.log(error.message);
  }
};

const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "images_preset");

  try {
    let cloudName = process.env.REACT_APP_COUDINARY_CLOUD_NAME;
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log(api);
    const res = await axios.post(api, formData);
    // .then((res) => setImg(res.data.secure_url))
    // .catch((error) => console.log(error));
    const { secure_url } = res.data;
    setImg(secure_url);
    console.log(secure_url);
    setLink(secure_url);
    setIsDisabled(true);
    // return secure_url;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const insertUser = async (req, res) => {
  console.log("Reached");
  try {
    const spassword = await securePassword(req.body.password);
    console.log(spassword);
    // const url = await handleFileUpload(req.file.filename);
    // console.log(url);
    // const user = new Registeration(req.body);

    const emp_Id = req.body.employee_id;
    const olduser = await Registeration.findOne({ employee_id: emp_Id });
    if (olduser) {
      return res.send({ error: "User Exists !" });
    }

    const user = new Registeration({
      employee_id: req.body.employee_id,
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      // image: "image",
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();
    console.log(userData);
    res.send(userData);

    if (userData) {
      sendVerifyMail(req.body.username, req.body.email, userData._id);
      alert("Your registration is successfull, Kindly verify your mail !");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not exist" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const verifyMail = async (req, res) => {
  try {
    const updatedInfo = await Registeration.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );
    console.log(updatedInfo);
    alert("Email Verified Successfully !");
  } catch (error) {
    console.log(error.message);
  }
};

//login user method
export const loginLoad = async (req, res) => {
  try {
    res.json("this is working");
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyLogin = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const password = req.body.password;
    const email = req.body.email;
    // console.log(email,"email is here");

    const userData = await Registeration.findOne({
      employee_id: employee_id,
      email: email,
    });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      // if(res.status(201)){
      //    res.json({status:"ok",data:token});
      // }
      // else{
      //    res.json({error:"error"});
      // }
      console.log(passwordMatch);
      if (passwordMatch) {
        if (userData.is_verified === 0) {
          return res.json({ error: "Email not verified !" });
        } else {
          const token = jwt.sign(
            { employee_id: userData.employee_id }, //error maybe
            process.env.SECRET_KEY
            // {
            //   expiresIn: 10,
            // }
          );
          console.log(token, "token in verify");
          if (res.status(201)) {
            if (userData.is_admin === 1) {
              return res.json({ status: "ok", data: token, type: "admin" });
            } else {
              return res.json({ status: "ok", data: token, type: "user" });
            }
          } else {
            return res.json({ error: "error" });
          }
          // req.session.user_id = userData._id;
          // res.redirect("/admin-page");
        }
      } else {
        return res.json({ error: " ID and Passsword are incoreect !" });
      }
    } else {
      return res.json({ error: "No user exists !" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loadHome = async (req, res) => {
  const { token, data } = req.body;
  console.log(data, "id is here");

  try {
    const user = jwt.verify(
      token,
      process.env.SECRET_KEY
      //   , (err, res) => {
      //   if (err) {
      //     return "token expired !";
      //   }
      //   return res;
      // }
    );
    // console.log(token,"token is not commng");
    console.log(user, "here is user");
    if (user == "token expired !") {
      return res.send({ status: "error", data: "token expired" });
    }
    console.log(user.email, "email is here");
    Registeration.findOne({ employee_id: user.employee_id })
      .then((data) => {
        // JSON.parse(window.localStorage.getItem("data"));
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

// forgot password
export const forgetLoad = async (req, res) => {
  try {
    res.render("forget");
  } catch (error) {
    console.log(error.message);
  }
};
//for reset password sending mail
export const sendResetPassMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
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

export const resetPassVerify = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email, "email from backend");
    const userData = await Registeration.findOne({ email: email });
    console.log(userData, "data");
    if (userData) {
      if (userData.is_verified === 0) {
        return res.json({ status: "Please verify your mail first !" });
      } else {
        const secret = process.env.SECRET_KEY + userData.password;
        const token = jwt.sign(
          { email: userData.email, employee_id: userData.employee_id },
          secret,
          {
            expiresIn: "5m",
          }
        );
        const link = `${process.env.REACT_APP_BASE_URL}/reset-password/${userData.employee_id}/${token}`;
        console.log(link);
        //     const randomString = randomstring.generate();
        //     const updatedData = await User.updateOne(
        //       { email: email },
        //       { $set: { token: randomString } }
        //     );
        //     sendResetPassMail(userData.name, email, randomString);
        //     res.render("forget", {
        //       message: "Please check your mail to reset your password .",
        //     });
      }
    } else {
      return res.json({ status: "User email is incorrect ." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const forgetPassLoad = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const userData = await Registeration.findOne({ employee_id: id });
  if (!userData) {
    return res.json({ status: "User not exisis !" });
  }
  const secret = process.env.SECRET_KEY + userData.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("forget-password", {
      email: verify.email,
      status: "Not verified",
    });
  } catch (error) {
    res.send("Not verified !");
  }
  // try {
  //   const token = req.query.token;
  //   const tokenData = await User.findOne({ token: token });
  //   if (tokenData) {
  //     res.render("forget-password", { user_id: tokenData._id });
  //   } else {
  //     res.render("404", { message: "Page not FOUND !!" });
  //   }
  // } catch (error) {
  //   console.log(error.message);
  // }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const newPass = req.body.password;
  // const user_id = req.body.user_id;
  // console.log(req.params);
  const userData = await Registeration.findOne({ employee_id: id });
  if (!userData) {
    return res.json({ status: "User not exisis !" });
  }
  const secret = process.env.SECRET_KEY + userData.password;
  try {
    const verify = jwt.verify(token, secret);
    const securedPass = await securePassword(newPass);
    const updatedPass = await Registeration.updateOne(
      { employee_id: id },
      { $set: { password: securedPass, token: "" } }
    );
    res.json({ status: "Password Updated !" });
    // res.send("Verified")
    res.render("forget-password", {
      email: verify.email,
      status: "verified",
    });
  } catch (error) {
    console.log(error);
    res.json("Something went wrong ");
  }
  // try {

  //   res.redirect("/");
  // } catch (error) {
  //   console.log(error.message);
  // }
};

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    await userData.save();
    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.find({ employeeNo: id });
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const get_events = async (req, res) => {
  const events = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });
  res.send(events);
};

export const create_event = async (req, res) => {
  try {
    const event = Event(req.body);
    await event.save();
    await res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

export const generateLeave = async (req, res) => {
  try {
    const leaveData = new Leave(req.body);

    if (!leaveData) {
      return res.status(404).json({ msg: "LKeave data not found" });
    }

    const leaveJson = await leaveData.save();
    console.log(leaveJson);
    res.send(leaveJson);
    // res.status(200).json({ msg: "Leave created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUserCount = async (req, res) => {
  try {
    const users = await Registeration.find().countDocuments();
    if (!users) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const userData = await Leave.find();
    console.log(userData);
    if (!userData) {
      return res.status(404).json({ msg: "Leaves data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const updatedInfo = await Leave.updateOne(
      { _id: req.params.id },
      { $set: { is_approved: 2 } }
    );
    console.log(updatedInfo);
    res.send(updatedInfo);
    alert("Leave Approved Successfully !");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLeave = async (req, res) => {
  try {
    const updatedInfo = await Leave.updateOne(
      { _id: req.params.id },
      { $set: { is_approved: 1 } }
    );
    console.log(updatedInfo);
    res.send(updatedInfo);
    alert("Leave Approved Successfully !");
  } catch (error) {
    console.log(error.message);
  }
};

export const getLeaveCount = async (req, res) => {
  try {
    const users = await Leave.find({ is_approved: 0 }).countDocuments();
    if (!users) {
      return res.status(404).json({ msg: "Leaves data not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getTodos = async (req, res) => {
  //    const todos = await Todo.find();
  const id = req.params.id;
  try {
    const todos = await Todo.find({ employee_id: id });
    if (!todos) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createTodos = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

export const deleteTodos = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id, "id in cpntroller");
    // Todo.deleteOne({_id:id}).then(console.log("listaddedsuccess"))
    // const userExist = await Todo.findById(id);
    const findTodo = await Todo.findByIdAndDelete(id);
    res.status(200).json({ msg: "ToDo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "servererror" });
  }
};

export const getUserName = async (req, res) => {
  try {
    const users = await Registeration.find({});
    if (!users) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const remainingLeaves = async (req, res) => {
  // console.log("object");
  // return res.status("successful");
  console.log("reacher leaves");
  try {
    const id = req.query.employeeNo;
    const type = req.query.leaveType;
    console.log(id, type);
    // console.log(id, "here");
    const users = await Leave.find({
      employeeNo: id,
      leaveType: type,
    }).countDocuments();
    console.log(users);
    // if (!users) {
    //   return 0;
    // }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const createSales = async (req, res) => {
  try {
    const salesData = new Sales(req.body);

    if (!salesData) {
      return res.status(404).json({ msg: "Sales data not found" });
    }

    await salesData.save();
    res.status(200).json({ msg: "Sales created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getLeaves = async (req, res) => {
  const id = req.params.id;
  console.log(id, "in leaveslist");
  try {
    const leaves = await Leave.find({ employeeNo: id });
    if (!leaves) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const userDeleteLeave = async (req, res) => {
  const id = req.params.id;
  try {
    // console.log(id, "id in cpntroller");
    // Todo.deleteOne({_id:id}).then(console.log("listaddedsuccess"))
    // const userExist = await Todo.findById(id);
    const findTodo = await Leave.findByIdAndDelete(id);
    res.status(200).json({ msg: "Leave deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "servererror" });
  }

  // export salesReport = async (req,res)=>{

  // }
};
