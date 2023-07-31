import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    itemList: []
}

export const pcBuildSlice = createSlice({
    name: 'pc-build',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.itemList.push(action.payload);
        },
        removeItem: (state, action) => {
            state.itemList = state.itemList.filter(item => item._id !== action.payload);
        },
        clearList: (state) => {
            state.itemList = []
        }
    }
});

export default pcBuildSlice.reducer;

export const { addItem, clearList, removeItem } = pcBuildSlice.actions;