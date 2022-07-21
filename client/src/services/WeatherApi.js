import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';



export const WeatherApi = createApi({
    reducerPath: 'WeatherApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getWeather: builder.query({
           query:(cordinates)=> cordinates && ({ method: 'GET', url: `onecall?lat=${cordinates.latitude}&lon=${cordinates.longitude}&appid=375afe81850264034eab137ce949e9b6` }),
        })
    })
});

export const {
    useGetWeatherQuery,
} = WeatherApi;

