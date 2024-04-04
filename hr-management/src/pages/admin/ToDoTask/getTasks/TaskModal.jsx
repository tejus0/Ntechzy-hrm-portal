import React, { useState } from "react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

function Modal({onClose,empId,title,desc}) {
    // const [empId, setEmpId] = useState("")
	// const [title, setTitle] = useState("")
	// const [desc, setDesc] = useState("")

  const ModalRef = useRef();
  const closeModal = (e) => {
    if (ModalRef.current === e.target) {
      onClose();
    }
  };

//   useEffect(() => {
//     console.log(id,"id is hre");
//     axios
//       .get(`http://localhost:7000/api/leaves/getModalTask/${id}`)
//       .then((response) => {
//         setModalData({
//           Emp_id: response.data[0].Employee_id,
//           Title: response.data[0].Title,
//           Desc: response.data[0].Description,
//         });
//         console.log(response, "taskmodaldata");
//         // setClicked(true);
//         // toast.success("Leave Approved Successfully !", {
//         //   position: "top-right",
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [])
  

  return (
    <div
      ref={ModalRef}
      onClick={closeModal}
      className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-5 ">
        <button onClick={onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="bg-green-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
          <h1 className="text-2xl font-bold">
            <u>TODAY'S ATTENDANCE</u>{" "}
          </h1>
          <form>
            <div>Employee Id </div>
            <TextField
              value={empId}
            
             
              fullWidth
              required
              name="Employee-id"
              id="outlined-required"
              label="Required"
            />
            <div>Title : </div>
            <TextField
              value={title}
             
              fullWidth
              required
              name="title"
              id="outlined-required"
              label="Required"
            />
            <div>Description : </div>
            <TextField
              value={desc}
              required
              multiline
              rows={4}
              name="description"
              id="outlined-required"
              label="Required"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Modal;
