import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://type.fit/api';

export const QuotesApi = createApi({
    reducerPath: 'QuotesApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getQuotes: builder.query({
           query:()=>({ method: 'GET', url: '/quotes' }),
        })
    })
});

export const {
    useGetQuotesQuery,
} = QuotesApi;


