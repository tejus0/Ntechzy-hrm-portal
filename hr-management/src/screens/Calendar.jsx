import React from "react";
import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";

export default function () {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const onEventAdded = async (event) => {
    let calendarApi = await calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    console.log("here");
    await axios.post("http://localhost:7000/api/calendar/create-event", data.event).catch((error)=>{
      console.log(error.response.data);
    });
  }
  async function handleDatesSet(data) {
    await axios
      .get(
        "http://localhost:7000/api/calendar/get-events?start=" +
          moment(data.start).toISOString() +
          "&end=" +
          moment(data.end).toISOString()
      )
      .then((response) => {
        setEvents(response.data)
      }).catch((error)=>{
        console.log(error.response.data);
      });
  }
  return (
    <Box container sx={{ display: "flex" }}>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Box
        container
        sx={{
          p: 5,
          m: 7,
          width: "80%",
          borderRadius: 1,
        }}
      >
        <Button
          onClick={() => setModalOpen(true)}
          variant="contained"
          color="success"
          sx={{ width: "10%" }}
        >
          Add Event
        </Button>
        <div style={{ position: "relative", zIndex: 0 }}>
          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={(event) => handleEventAdd(event)}
            datesSet={(date) => handleDatesSet(date)}
          />
        </div>
      </Box>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </Box>
  );
}
