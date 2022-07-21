import React, { Component } from "react";
import { Loading } from "../macros/Loading";
import axios from "axios";
import Article from "./Article";
import { Link } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import { useGetNewsQuery } from "../../services/newsApi";


const News =()=>{
    const { data: newsData, isFetching: newsDataFetching, isError } = useGetNewsQuery();
    
        return(
            <Paper>
           <div className="m-auto">
           <Loading loading= {newsDataFetching}/>
               <div className="row">
                   <div className="col-md-11 col-lg-8 m-auto">
                       <div className="article_wrapper">
                            {newsData && newsData.results.map(
                                (article, id) => <div key={id} className="article_card">
                                    <Article article={article} />
                                    </div>
                                )
                            }
                       </div>
                   </div>
               </div>

           </div>
           </Paper>
        )
    }

export default News;