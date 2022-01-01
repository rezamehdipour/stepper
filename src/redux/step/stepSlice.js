import { createSlice } from "@reduxjs/toolkit";

// Initial Sate
let initialState = 1;

export const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        setStep: (state, action) => {
            return action.payload;
        }
    },
});

export const { setStep } = stepSlice.actions;

export default stepSlice.reducer;
