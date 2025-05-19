import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, MenuItem, WontonItem } from '../../utils/interfaces';


const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<MenuItem | WontonItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                });
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            // if (existingItem && existingItem.quantity > 1) {
            //     existingItem.quantity -= 1;
            // } else {
            //     state.items = state.items.filter((item) => item.id !== action.payload);
            // }
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
        const existingItem = state.items.find(item => item.id === action.payload);
        if (existingItem) {
            existingItem.quantity++;
        }
        },
        // Action för att minska antalet av en vara
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity--;
                // Om antalet blir 0 eller mindre, ta bort varan
                if (existingItem.quantity <= 0) {
                state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
        },
        // (Valfritt) Action för att tömma varukorgen
        clearCart: (state) => {
        state.items = [];
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;