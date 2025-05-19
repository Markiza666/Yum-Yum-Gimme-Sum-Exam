import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import menuReducer from '../features/menu/menuSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;