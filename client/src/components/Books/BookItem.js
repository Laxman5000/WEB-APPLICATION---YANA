import React from 'react';
import "./bookitem.css";
import Dropdown from 'react-bootstrap/Dropdown';
import { Fade } from "react-awesome-reveal";
import { Button, Menu, MenuItem } from '@mui/material';

const Book = ({ item, i }) => {


    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
   return(
   <Fade cascade>
   <div className="card_e p-2">
        <div className="img_wrapper" style={{backgroundImage:`url(${item.book_image})`}}>  
        </div>
        <div className="detail_wrapper">
            <h3 className="text-bold">{item.title}</h3>
            <h6>-{item.contributor}</h6>
            <p><i>Description: </i>{item.description}</p>
            <p>
                <span className="mx-2">Rank: {item.rank}</span>
                <span>Publisher: {item.publisher}</span>
            </p>
            <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Purchase
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
                   {item.buy_links.map((link,i) => 
              
                        <MenuItem onClick={()=>window.location.href=link.url} key={i}>{link.name}</MenuItem>  
                        )
                   }
                </Menu>
                </div>
           
        </div>
   </div>
   </Fade>);
}

export default Book;