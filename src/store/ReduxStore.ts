import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/RootReducer";

// Setups the Redux store

export const store: ToolkitStore = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;