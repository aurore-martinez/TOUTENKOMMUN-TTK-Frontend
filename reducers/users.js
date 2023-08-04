import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null,
	photo: ''
};

export const userSlice = createSlice({
	name: 'users',
	initialState,

	reducers: {
		login: (state, action) => {
			state.token = action.payload;
		},
		addPhoto: (state, action) => {
			state.photo = action.payload;
		},
	}
});

export const { login, addPhoto } = userSlice.actions;
export default userSlice.reducer;