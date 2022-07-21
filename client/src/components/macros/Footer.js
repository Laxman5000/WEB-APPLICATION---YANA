import { Button } from "@mui/material";
import React, { Component } from "react";
export default class Footer extends Component{
   
    backButton(){
        return window.history.go(-1);
    }
     render(){
         return(
            <div className="footer">
                <div className="container footer_wrapper">
                    <a href="/" className="right-text">
                        <i className="fas fa-home"></i>
                    </a>
                    <Button className="left-text btn btn-bolder" onClick={ this.backButton }>
                    <i className="fas fa-chevron-left"></i> Back
                    </Button>
                </div>
          </div>
         );
     }
}