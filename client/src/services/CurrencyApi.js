import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Axios from 'axios';

const baseUrl = 'https://v1.nocodeapi.com/lex/cx/tbLqokRtasOSucvC';

const currencyState = {
    state:'USD',
    target:'NPR,AUD,CAD,EUR,GBP,INR,JPY,MXN,NZD',
    symbol:''
}
const iconList = {
    USD:'$',
    EUR:'€',
    GBP:'£',
    AUD:'$',
    CAD:'$',
    NZD:'$',
    INR:'₹',
    JPY:'¥',
    MXN:'$',
    NPR:'₨',

}

export const CurrencyApi = createApi({
    reducerPath: 'CurrencyApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCurrency: builder.query({
           query:()=>({ method: 'GET', url: buildUrl('/symbols',{api_key:'UlBjKbXwuRGQIXLNB'}) }),
        }),
        getCountryRates: builder.query({
              query:()=>({ method: 'GET', url: buildUrl('/rates',{ source:currencyState.state, target:currencyState.target}) }),
        }),
       
    })
});

export const {
    useGetCurrencyQuery,
    useGetCountryRatesQuery,
} = CurrencyApi;

const buildUrl = (url, params) => {
    return url+'?'+Object.keys(params).map(key => key+'='+params[key]).join('&'); 
}

const getRateInfo = async (rates) => {
    await Axios.get(`https://restcountries.com/v2/currency/${rates}`).then(res => {
        currencyState.symbol = res.data?.[0]?.['currencies']?.[0]?.['symbol']
    })
    return currencyState.symbol;
}

export { iconList, getRateInfo,currencyState }