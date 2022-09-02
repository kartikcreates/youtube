import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentuser: null,
    loading: false,
    error: false
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginStart: (state) => { state.loading = true },

        loginSucces: (state, action) => {
            state.loading = false;
            state.currentuser = action.payload;
        },
        loginFail: (state) => {

            state.loading = false;
            state.error = true;

        },
        logout: (state) => {
            state = initialState

        }

    }
})

export const { loginStart, loginSucces, loginFail, logout } = userSlice.actions;
export default userSlice.reducer;


