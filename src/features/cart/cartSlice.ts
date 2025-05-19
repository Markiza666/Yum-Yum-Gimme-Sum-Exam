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
                // Om antalet blir 0 eller mindre, tar bort varan
                if (existingItem.quantity <= 0) {
                state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
        },
        clearCart: (state) => {
        state.items = [];
        },
    },
});

export const { addItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;