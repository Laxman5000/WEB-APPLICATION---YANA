import React, { Component } from "react";
import "./Install.css";
export default class Install extends Component{
     render(){
         return(
            <div className="install-dialog">
              <div className="install-dialog-content">
            <span className="prompt">Install YANA In Your Phone?</span>
            <button className=" btn add-button">Sure!</button>
            <button className="btn btn-font-warning cancel font-weight-bold">Nope</button>
            </div>
          </div>
         );
     }
}