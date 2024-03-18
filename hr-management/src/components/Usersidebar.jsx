import * as React from 'react';
import Logo from "../assets/careerkick_logo.png";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link} from "react-router-dom";
import { useState,useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";

import { Grid } from '@mui/material';
const drawerWidth = 250;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function UserSideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = useState(true)
  const [userId, setuserId] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const openId = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleIsCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem("Id-data"));
    if (Id) {
      setuserId(Id);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar sx={{ bgcolor: "green" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              
            }}
          >
            <MenuIcon />
          </IconButton>

          <Grid container sx={{display:"flex",justifyContent:"flex-end"}}>
            <div >
            <Typography variant="h6" component="div">
             {window.localStorage.getItem("user-type")}
          </Typography>
            </div>
            <div>
              <Tooltip
              // title={userId}
              >
                <IconButton>
                  <AccountBoxIcon
                    aria-owns={openId ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  />
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={openId}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>
                      Welcome UserId - {userId}
                    </Typography>
                  </Popover>
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
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
         
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }} >
            <img src={Logo}></img>
              {/* <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              > */}
                {/* <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon> */}
                {/* <ListItemText primary="PAYROLL" sx={{ opacity: open ? 1 : 0 }} /> */}
              {/* </ListItemButton> */}
            </ListItem>
            {/* <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/userleave" onClick={handleIsCollapse}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="LEAVES" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="DASHBOARD" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}component={Link} to="/usersales">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="SALES ANALYTICS" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}component={Link} to="/employee-details">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
        {/* <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="DEPARTMENTS" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/calendar"  >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="CALENDAR" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <MailIcon />
                </ListItemIcon>
                <ListItemText primary="TRAINING SESSIONS" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}

            {/* Dropdown sub- menu */}
            {/* <ListItemButton onClick={handleIsCollapse}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="EMPLOYEES" />
        {isCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List  disablePadding component={Link} to="/userdetails" onClick={handleIsCollapse}>
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
        <List disablePadding onClick={handleIsCollapse}>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="All Employee" />
          </ListItemButton>
        </List>
      </Collapse> */}
      
                
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
              to="/user-leaves-list"
              onClick={handleIsCollapse}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Applied" />
              </ListItemButton>
            </List>
          </Collapse>

        </List>
      </Drawer>
      
    </Box>
  );
}