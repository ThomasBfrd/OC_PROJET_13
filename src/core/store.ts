import {configureStore, Store} from "@reduxjs/toolkit";
import userSlicer from "./userSlicer.ts";


export const store = configureStore({
    reducer: {
        user: userSlicer
    }
});

export type AppDispatch = typeof store.dispatch;

export type StoreState = ReturnType<Store['getState']>;