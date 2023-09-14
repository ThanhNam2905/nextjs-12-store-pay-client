import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expandSideBar: false,
};

export const ExpandSlice = createSlice({
    name: "expandSideBar",
    initialState,
    reducers: {
        toggleSideBar(state, action) {
            state.expandSideBar = !state.expandSideBar;
        },
    },
});

export const { toggleSideBar } = ExpandSlice.actions;

export default ExpandSlice.reducer;