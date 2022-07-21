import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.nytimes.com';

export const BookApi = createApi({
    reducerPath: 'BookApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getBooks: builder.query({
           query:()=>({ method: 'GET', url: '/svc/books/v3/lists/overview.json?api-key=oZ0RJr1hqmfXJtCBIb1aQG8GBIRuqS0I' }),
        })
    })
});

export const {
    useGetBooksQuery,
} = BookApi;

let chipColor = ['success','error','primary','warning','info','secondary'];

const getRandomColor = () => {
    let random = Math.floor(Math.random() * chipColor.length);
    return chipColor[random];
}

export {
    getRandomColor
};