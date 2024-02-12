import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    start: String,
    end: String,
    title: String

})
export default mongoose.model("Event", EventSchema);
