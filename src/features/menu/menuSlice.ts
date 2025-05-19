import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, MenuState,  } from '../../utils/interfaces';

const initialState: MenuState = {
    items: [],
    loading: false,
    error: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        fetchMenuStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMenuSuccess: (state, action: PayloadAction<MenuItem[]>) => {
            console.log("Fetch Menu Success Payload: ", action.payload);
            state.items = action.payload;
            state.loading = false;
        },
        fetchMenuFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchMenuStart, fetchMenuSuccess, fetchMenuFailure } = menuSlice.actions;
export default menuSlice.reducer;