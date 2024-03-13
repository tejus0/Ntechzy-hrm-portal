import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  employeeNo: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date_of_join: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
    required:true
  },
  EducationDetails: {
    XthDetails: {
      passingYear: {
        type: String,
        default: "",
      },
      schoolName: {
        type: String,
        default: "",
      },
      grade: {
        type: String,
        default: "",
      },
    },
    XIIthDetails: {
      passingYear: {
        type: String,
        default: "",
      },
      schoolName: {
        type: String,
        default: "",
      },
      grade: {
        type: String,
        default: "",
      },
    },
    Graduation: {
      passingYear: {
        type: String,
        default: "",
      },
      CollegeName: {
        type: String,
        default: "",
      },
      degree: {
        type: String,
        default: "",
      },
      branch: {
        type: String,
        default: "",
      },
      grade: {
        type: String,
        default: "",
      },
    },
  },
  PastCompany: new mongoose.Schema({
    name: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
  }),
  password: {
    type: String,
    default: "",
  },
  is_admin: {
    type: Number,
    required: true,
    default: 0,
  },
  is_verified: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  },
});

export default mongoose.model("User", userSchema);
