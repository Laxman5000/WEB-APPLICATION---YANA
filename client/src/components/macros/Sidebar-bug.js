import React, { useEffect } from "react";
import "./Sidebar.css";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import WidgetsIcon from '@mui/icons-material/Widgets';
import useWindowDimensions from "./resizeHook";
import { Avatar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {  userSelector, logOut } from '../../services/AuthApi';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Switch from '@mui/material/Switch';


function SwipeableTemporaryDrawer() {

  const { isLoggedIn, username, full_name, errorMessage } = useSelector(
    userSelector
  );

 
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  useEffect(() => {
    if (isDarkMode == true) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  },[isDarkMode]);

  useEffect(() => {
    if(!isLoggedIn){
      console.log("not logged in mf reason: ", errorMessage);
    }
  }, [isLoggedIn]);
  const dispatch = useDispatch();
  
  const { width } = useWindowDimensions();

  useEffect(() => {
    if(width >= 360 && width < 720) {
     setAnchor("bottom");
    }
    if(width >= 720) {
     setAnchor("right");
    }
    
  }, [width]);
  
  const handleLogout = e => {
    e.preventDefault();
    console.log("Logout");
    dispatch(logOut());
    window.location.reload();
  }



  const darkModeToggle = e => {
    e.preventDefault();
    document.body.classList.toggle("darkmode");
    setIsDarkMode(!isDarkMode);
  }


  const [state, setState] = React.useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    const splited = name.split(' ')
    if (splited.length > 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}${name[name.length - 1]}`,
  }
}
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="profile-wrapper">
        { isLoggedIn ?  
        <div className="profile-image d-flex">
        <Avatar sx={{ bgcolor: green[500] }} variant="square" {...stringAvatar(String(full_name).toLocaleUpperCase())} />
          <div className="profile-name">
          <h3>{ String(full_name).toLocaleUpperCase() }</h3>
          <Typography variant="caption">{ "@"+String(username).toLowerCase() }</Typography>
          </div>
        </div> : <div className="login-area">
          <p>Sign in to sync your data</p>
          <Link to="/login">
            <Button variant="contained" color="success" className="login-btn">
            Login
            </Button>
            </Link>
            <Link to="/register">
          <Button variant="outlined" color="error">Signup</Button>
            </Link>
          </div>}
      </div> 
      <List>
      <Divider />
      { isLoggedIn ?  
      <ListItem button>
            <ListItemIcon onClick={(e)=>handleLogout(e)}>
               <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem> : null }
          <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onChange={(e)=>darkModeToggle(e)} onClick={(e)=>darkModeToggle(e)}>
                            <Switch {...label} defaultChecked={isDarkMode} color="default" />
                    </IconButton>
                  }
                >
                   <ListItemIcon>
                   <DarkModeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dark Mode"} />
                </ListItem>
      </List>
     
    </Box>
  );

  const [anchor, setAnchor] = React.useState("right");

  return (
    <div>

        <>
          <Button onClick={toggleDrawer(anchor, true)}>
            <WidgetsIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </>
      
    </div>
  );
}


export default function Sidebar(){
  
  return (
    <Box sx={{ flexGrow: 1 }}>
    <div className="sidebar">
      <div className="pageTitle">
        <div className="row">
         
            <ul className='top-bar'>
              <li>
                <a href='/'>YANA</a>
              </li>
              <li className="text-right">
              <ul>
                  <li className="toggler">
                  <SwipeableTemporaryDrawer />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </Box>
   
  );

}
