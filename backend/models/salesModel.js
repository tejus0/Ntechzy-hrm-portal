import mongoose from "mongoose";


const salesSchema = new mongoose.Schema({
    employee_id:{
        type:String
    },
    client_name: {
        type:String
    },
    client_no: {
        type:String
    },
    client_state: {
        type:String
    },
    course: {
        type:String
    },
    paid_fee: {
        type:String
    },
    rem_fee: {
        type:String
    },
    assoc_college: {
        type:String
    },
    registration_amount: {
        type:String
    },
    services_amount: {
        type:String
    },
    enroll_date: {
        type:String
    },
    status: {
        type:String
    },
    bonus_status: {
        type:String
    },
    incentives: {
        type:String
    }
});

export default mongoose.model("Sale", salesSchema);