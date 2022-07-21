import React, { useState, useEffect } from "react";
import {Loading} from "../macros/Loading";
import Book from "./Book";
import { useGetBooksQuery, getRandomColor } from "../../services/BookApi";
import { Container } from "@mui/material";
       


const Books = () => {

    const { data: bookData, isFetching: bookDataFetching, isError: bookDataError } = useGetBooksQuery();

        return(
           <Container>
           <Loading loading={bookDataFetching} />
               <div className="row">
                   <div className="col-md-12 col-lg-8 col-sm-12 m-auto">
                   <h3 className="text-center mt-3">Best Seller of Week</h3><hr />
                        {bookData?.results.lists.map((book,i) => <Book book={book} key={i} color={getRandomColor()} />)}
                   </div>
               </div>
           </Container>
        )
    }
export default Books; 