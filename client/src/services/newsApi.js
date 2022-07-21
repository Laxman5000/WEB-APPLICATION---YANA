import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.nytimes.com';

export const NewsApi = createApi({
    reducerPath: 'NewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getNews: builder.query({
           query:()=>({ method: 'GET', url: 'svc/mostpopular/v2/viewed/7.json?api-key=oZ0RJr1hqmfXJtCBIb1aQG8GBIRuqS0I' }),
        })
    })
});

export const {
    useGetNewsQuery,
} = NewsApi;


