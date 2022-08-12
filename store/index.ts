import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";


import taskReducer from "./slices/task";
import userReducer from "./slices/user";


const combineReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
});


export const store = () => configureStore({
    reducer: combineReducer,
    devTools: true,
});


export const wrapper = createWrapper(store);
