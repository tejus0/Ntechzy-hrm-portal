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
  getLeaveCount,
  getTodos,
  createTodos,
  remainingLeaves,
  createSales
} from "../controllers/userController.js";

const route = express.Router();
// route.use(bodyParser.urlencoded({extended:true}))

route.use(session({ secret: sessionSecret }));
// route.get("/register", isLogout, loadRegister);

route.post("/register", insertUser);

route.get("/verify", verifyMail);

route.get("/", isLogout, loginLoad);
// route.get("/login", isLogout, loginLoad);

route.post("/login", verifyLogin);

route.post("/admin-page", loadHome);

// route.post("/user-page",loadUser)

route.get("/logout", isLogin, userLogout);

route.get("/forget", isLogout, forgetLoad);

route.post("/forgot-password", resetPassVerify);

route.get("/reset-password/:id/:token", forgetPassLoad);

route.post("/reset-password/:id/:token", resetPassword);

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

route.get("/getTodos", getTodos);

route.post("/createTodos", createTodos);

route.get("/remainingLeaves", remainingLeaves);

route.post("/create-sales",createSales);

// route.get("/getUserName",getUserName)
export default route;
