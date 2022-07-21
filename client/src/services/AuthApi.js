import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import http from "../utils/http"
export const signupUser = createAsyncThunk(
    "users/signupUser",
    async ({ full_name, email, password, username }, thunkAPI) => {
        try {
            const response = await fetch(
                `${http.host}/api/v1/users/register`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ full_name, email, password, username }),
                }
            )
            let data = await response.json()
            console.log("data", data)
            if (response.status === 200) {
                localStorage.setItem("token", data.token)
                return { ...data, username: username, email: email, full_name: full_name, token: data.token }
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (e) {
            console.log("Error", e.response.data)
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    "users/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await fetch(
                `${http.host}/api/v1/users/login`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            )  
            if (response.status === 200) {
                let data = await response.json()
                localStorage.setItem("token", data.token)
                return data
            }
            if (response.status === 401) {
                return thunkAPI.rejectWithValue({response:response.status,message:"Invalid Credentials"})
            } else {
                return thunkAPI.rejectWithValue(response)
            }
        } catch (e) {
            console.log("Error", e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const getUser = createAsyncThunk(
    "users/me",
    async (thunkAPI) => {
        const token  = localStorage.getItem("token")
      
        if(token){
        try {
            const response = await fetch(
                `${http.host}/api/v1/users/me`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                }
            )
            let data = await response.json()
         
            if (response.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (e) {
            console.log("Error", e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }else{
        return "Token not found"
    }
    }
)




export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: localStorage.getItem("username") ?  localStorage.getItem("username") : "",
        email: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        token: localStorage.getItem("token") || "",
        isLoggedIn: localStorage.getItem("token") ? true : false,
    },
    reducers: {
        // Reducer comes here
        reset: (state) => {
            return { ...state, isFetching: false, isSuccess: false, isError: false, errorMessage: "" }
        },
        logOut: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("todo")
            return clearState(state)
        },


    },
    extraReducers: {
        // Extra reducer comes here
        [signupUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.email;
            state.username = payload.username;
            state.full_name = payload.full_name;
            state.isLoggedIn = true;
        },
        [signupUser.pending]: (state) => {
            state.isFetching = true;
        },
        [signupUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isLoggedIn = false
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.email = payload.user.email;
            state.username = payload.user.username;
            state.full_name = payload.user.full_name;
            state.isFetching = false;
            state.isSuccess = true;
            state.isLoggedIn = true
            return state;
        },
        [loginUser.rejected]: (state, {payload} ) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [getUser.fulfilled]:(state, { payload }) => {
            
            if(payload!=="Token not found"){
                state.email = payload?.data?.email;
                state.username = payload?.data?.username;
                state.full_name = payload?.data?.full_name;
                state.isLoggedIn = true;
                state.isFetching = false;

            }
            
            return state;
        },
        [getUser.rejected]: (state, { payload }) => {
           
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.message;
        },
        [getUser.pending]: (state) => {
            state.isFetching = true;
        },

    },
})

export const clearState = userSlice.actions.reset;
export const logOut = userSlice.actions.logOut;


export const userSelector = state => state.user