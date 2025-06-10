import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMenu } from './menuThunks'; 
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.loading = 'Pending';
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.loading = 'succeeded';
                state.items = action.payload; // <-- Här lagras menyn i Redux state
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string; // Eller action.error.message beroende på rejectValue
            });
    },
});

export default menuSlice.reducer;