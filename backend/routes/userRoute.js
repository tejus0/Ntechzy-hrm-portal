import express from "express";
import { create, deleteUser, getAll, getOne, update, get_events, create_event } from "../controllers/userController.js";



const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);
route.post("calendar/create-event",create_event)

route.get("calendar/get-events", get_events);
export default route;