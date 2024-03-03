import express from "express";
import session from "express-session";
import { sessionSecret, emailPass, emailUser } from "../config/config.js";
import { isLogin, isLogout } from "../middleware/auth.js";
import bodyParser from "body-parser";
import {
  create,
  deleteUser,
  getAll,
  getOne,
  update,
  get_events,
  create_event,
  loadRegister,
  insertUser,
  verifyLogin,
  loginLoad,
  verifyMail,
  loadHome,
  userLogout,
  forgetLoad,
  resetPassVerify,
  forgetPassLoad,
  resetPassword,
  generateLeave,
  getUserCount,
  getAllLeaves,
  rejectLeave,
  updateLeave,
  getLeaveCount
  
} from "../controllers/userController.js";

const route = express.Router();
// route.use(bodyParser.urlencoded({extended:true}))

route.use(session({ secret: sessionSecret }));
// route.get("/register", isLogout, loadRegister);

route.post("/register", insertUser);

route.get("/verify", verifyMail);

// route.get("/", isLogout, loginLoad);
// route.get("/login", isLogout, loginLoad);

route.post("/login", verifyLogin);

route.post("/admin-page", loadHome);

route.get("/logout", isLogin, userLogout);

route.get("/forget", isLogout, forgetLoad);

route.post("/forget", resetPassVerify);

route.get("/forget-password", isLogout, forgetPassLoad);

route.post("/forget-password", resetPassword);

route.post("/generate-leave", generateLeave);

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);
route.post("/calendar/create-event", create_event);

route.get("/calendar/get-events", get_events);

route.get("/getUserCount", getUserCount);

route.get("/getallleave", getAllLeaves);
route.delete("/leaves/reject/:id", rejectLeave);
route.get("/leaves/update/:id", updateLeave);

route.get("/getLeaveCount", getLeaveCount);
export default route;
