import React, { useEffect, useState } from "react";
import Quote from "./Quote";
import "./Quote.css";
import {Loading} from "../macros/Loading";
import { useGetQuotesQuery } from "../../services/QuotesApi";

const Quotes = () => {

    const { data: quoteData, isFetching: quoteDataFetching, isError: quoteDataError } = useGetQuotesQuery();
    const quote = quoteData;
    const [start,setStart] = useState(0);
    const count = 50;
    const [currentQ, setCurrentQ] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if(quoteData){
            setCurrentQ(quoteData.slice(start,count));
            setLoading(false);
        }
    }, [quoteData]);
    const setCur = (quote) =>{
        setLoading(true);
        let items = [];
        let end = start+count; 
        // setend(end);
        for (let number = start; number < end ; number++) {
            items.push(
                quote[number]
            );
          }
          
        setStart(end);
        setCurrentQ(items); 
        setLoading(false);
    }

    const setBack = (quote) =>{
        setLoading(true);
        let items = [];
        let start_new = start-(2*count);
        if(start_new >= 0){
            let end = start_new+count;
        
        for (let number = start_new; number < end ; number++) {
            items.push(
                quote[number]
            );
          }
        
        setStart(end);
        setCurrentQ(items); 
        setLoading(false);
        }
        
    }

    
        return(
         
           <div className="container">
           <Loading loading={quoteDataFetching} />
               <div className="row">
                   <div className="col-md-6 m-auto">
                        <div className="navigator col-4 ml-auto mt-4">
                            { (start!==count) ? 
                            <button className="btn btn-sm btn-dark mt-2 ml-auto mx-2 ac_btn" onClick={ () => setBack(quote)}>
                                <i className="fas fa-arrow-left"></i> Previous
                            </button> : null }
                            <button className="btn btn-sm btn-dark mt-2 ml-auto mx-2 ac_btn" onClick={ () => setCur(quote)}>
                                <i className="fas fa-arrow-right"></i> Next
                            </button>
                        </div>
                       <div className="form-wrap mt-2">
                           {currentQ && currentQ.map((item,i) => <Quote item={item} key={i} />)}
                       </div>
                       <div className="navigator col-4 ml-auto mt-4">
                            { (start!==count) ? 
                            <button className="btn btn-sm btn-dark mt-2 ml-auto mx-2 ac_btn" onClick={ () => setBack(quote)}>
                                <i className="fas fa-arrow-left"></i> Previous
                            </button> : null }
                            <button className="btn btn-sm btn-dark mt-2 ml-auto mx-2 ac_btn" onClick={ () => setCur(quote)}>
                                <i className="fas fa-arrow-right"></i> Next
                            </button>
                        </div>
                   </div>
               </div>

           </div>
        )
    }
export default Quotes;