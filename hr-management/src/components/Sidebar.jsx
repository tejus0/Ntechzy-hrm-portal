// import React from 'react'
// import
// {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
//   BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
//  from 'react-icons/bs'
//  import { useNavigate } from 'react-router-dom'

// function Sidebar({openSidebarToggle, OpenSidebar}) {
//     const navigate= useNavigate();
//   return (
//     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
//         <div className='sidebar-title'>
//             <div className='sidebar-brand'>
//                 <BsCart3  className='icon_header'/> SHOP
//             </div>
//             <span className='icon close_icon' onClick={OpenSidebar}>X</span>
//         </div>

//         <ul className='sidebar-list'>
//             <li className='sidebar-list-item' onClick={()=>{navigate('/')}}>
//                 <div href="/">
//                     <BsGrid1X2Fill className='icon'/> Dashboard
//                 </div>
//             </li>
//             <li className='sidebar-list-item' onClick={()=>{navigate('/payroll')}}>
//                 <div href="/payroll">
//                     <BsFillArchiveFill className='icon'/> Products
//                 </div>
//             </li>
//             <li className='sidebar-list-item' onClick={()=>{navigate('/login')}}>
//                 <div href="">
//        git             <BsFillGrid3X3GapFill className='icon'/> Categories
//                 </div>
//             </li>
//             <li className='sidebar-list-item' onClick={()=>{navigate('/leave-management')}}>
//                 <a href="/leave-management">
//                     <BsPeopleFill className='icon'/> Customers
//                 </a>
//             </li>
//             <li className='sidebar-list-item' onClick={()=>{navigate('/attendance-management')}}>
//                 <div href="/attendance-management">
//                     <BsListCheck className='icon'/> Inventory
//                 </div>
//             </li>
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsMenuButtonWideFill className='icon'/> Reports
//                 </a>
//             </li>
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <BsFillGearFill className='icon'/> Setting
//                 </a>
//             </li>
//         </ul>
//     </aside>
//   )
// }

// export default Sidebar

import * as React from "react";
import Logo from "../assets/careerkick_logo.png";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Grid } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function EmployeeAttend() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleIsCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleLogout=()=>{
    window.localStorage.clear();
    window.location.href= "./"
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ bgcolor: "green" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ADMIN
          </Typography>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
              <Tooltip title="Profile">
                <IconButton>
                  <AccountBoxIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Delete">
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              {/* <img src={logout}></img> */}
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
          >
            <img src={Logo}></img>
            
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={Link}
            to="/leave-management"
            onClick={handleIsCollapse}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="LEAVES" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={Link}
            to="/admin-page"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary="DASHBOARD"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary="SALES ANALYTICS"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary="DEPARTMENTS"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={Link}
            to="/calendar"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="CALENDAR" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary="TRAINING SESSIONS"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Dropdown sub- menu */}
          <ListItemButton onClick={handleIsCollapse}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Leaves" />
            {isCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List
              disablePadding
              component={Link}
              to="/leave-management"
              onClick={handleIsCollapse}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="New Leave" />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List
              disablePadding
              component={Link}
              to="/leaves-list"
              onClick={handleIsCollapse}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="All Leaves" />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          {/* Dropdown sub- menu */}
          <ListItemButton onClick={handleIsCollapse}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
            {isCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List
              disablePadding
              component={Link}
              to="/employee-details"
              onClick={handleIsCollapse}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="DETAILS" />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List
              disablePadding
              component={Link}
              to="/employee-list"
              onClick={handleIsCollapse}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="All Employee" />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          {/* <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            component={Link}
            to="/leave-management"
            onClick={handleIsCollapse}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="LEAVES" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}
        </List> 
      </Drawer>
    </Box>
  );
}
