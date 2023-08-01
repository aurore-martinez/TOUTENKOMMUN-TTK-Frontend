import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null,
};

export const userSlice = createSlice({
	name: 'users',
	initialState,

	reducers: {
		login: (state, action) => {
			state.token = action.payload;
		}
	}
});

export const { login } = userSlice.actions;
export default userSlice.reducer;