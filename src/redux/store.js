import { configureStore } from "@reduxjs/toolkit";

// Slices
import stepSlice from "./step/stepSlice";
import dataSlice from './data/dataSlice';

export default configureStore({
	reducer: {
		step: stepSlice,
		data: dataSlice
	},
});
