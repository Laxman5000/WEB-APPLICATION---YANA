import { Chip } from '@mui/material';
import React from 'react';
import BookItem from "./BookItem";

const Book = ({ book, i, color }) => {
   return(<div className="">
       <div className="col-12 mt-4">
       <Chip 
        color={color} 
        size="large" 
        label={book ? book.display_name : ""} 
        style={{ height: '35px', fontSize: '20px', width: '90%' }} 
        className="book-chip" />
       </div><br />
       <div className="col-12">
           {book.books.map((item,i) =><BookItem item={item} key={i} />)}
       </div>
   </div>);
}

export default Book;