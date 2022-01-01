import { createSlice } from "@reduxjs/toolkit";

// Initial State
let initialState = {
	// Personal
	firstName: false,
	lastName: false,
	gender: false,
	birthdate: false,

	// Identity
	continent: false,
	country: false,
	nationalCardId: false,
	nationalCardPhoto: false,

	// Contact
	phoneNumber: false,
	email: false,
	address: false,
	website: false,

	// Authentication
	username: false,
	password: false,
	favoriteColor: false
};
if (window.localStorage.getItem('data')) {
	initialState = JSON.parse(window.localStorage.getItem('data'));
}

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setData: (state, action) => {
			const [key, value] = action.payload;
			state[key] = value;
			window.localStorage.setItem('data', JSON.stringify(state));
		}
	},
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
