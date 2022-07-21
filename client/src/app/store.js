import { configureStore } from "@reduxjs/toolkit";
import { BookApi } from "../services/BookApi";
import {NewsApi} from '../services/newsApi';
import { QuotesApi } from "../services/QuotesApi";
import { CurrencyApi } from "../services/CurrencyApi";
import { userSlice }  from "../services/AuthApi";
import { notificationSlice } from "../services/PwaService";
import { todoSlice } from "../services/todoApi";
import { WeatherApi } from "../services/WeatherApi";

const store = configureStore({
    reducer: {
        [NewsApi.reducerPath]: NewsApi.reducer,
        [BookApi.reducerPath]: BookApi.reducer,
        [QuotesApi.reducerPath]: QuotesApi.reducer,
        [CurrencyApi.reducerPath]: CurrencyApi.reducer,
        [userSlice.name]: userSlice.reducer,
        [notificationSlice.name]: notificationSlice.reducer,
        [todoSlice.name]: todoSlice.reducer,
        [WeatherApi.reducerPath]: WeatherApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['notificationSlice/setPushServerSubscriptionId', 'notificationSlice/setCordinates'],
          ignoredPaths: ['notificationSlice.pushServerSubscriptionId.options'],
        }}).concat(NewsApi.middleware,BookApi.middleware,QuotesApi.middleware, CurrencyApi.middleware, WeatherApi.middleware),
});

export default store;