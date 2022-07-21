import { createSlice } from "@reduxjs/toolkit"


export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState: {
        pushServerSubscriptionId: {},
        cordinates: { latitude: '', longitude:''},
    },
    reducers: {
        // Reducer comes here
        reset: (state) => {
            return { ...state, isFetching: false, isSuccess: false, isError: false, errorMessage: "" }
        },
        setPushServerSubscriptionId: (state, { payload }) => {
            state.pushServerSubscriptionId =  payload;
        },
        setCordinates: (state, {payload}) => {
            state.cordinates.latitude = payload.latitude;
            state.cordinates.longitude = payload.longitude;
            return state;
        }


    },
    extraReducers: {
        // Extra reducer comes here
       

    },
})

export const clearState = notificationSlice.actions.reset;
export const setPushServerSubscriptionId = notificationSlice.actions.setPushServerSubscriptionId;
export const setCordinates = notificationSlice.actions.setCordinates;


export const notificationSelector = state => state.notificationSlice;