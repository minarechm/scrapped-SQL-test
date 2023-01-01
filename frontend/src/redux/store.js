import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter" //pri defaulte moze byt hociake meno

export const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})