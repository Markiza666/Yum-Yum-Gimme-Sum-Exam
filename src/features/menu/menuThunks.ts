import { createAsyncThunk } from '@reduxjs/toolkit';
import {  performApiCom } from '../../service/api/api'; 
import { ApiComArgs, MenuApiResponse } from '../../utils/interfaces';

export const fetchMenu = createAsyncThunk<
    MenuApiResponse['items'], 
    string, 
    { rejectValue: string } 
>(
    'menu/fetchMenu', 
    async (apiKey, { dispatch, rejectWithValue }) => {
        try {
            const getMenuArgs: ApiComArgs = {
                urlExtension: 'menu',
                apiMethod: 'GET',
                key: apiKey
            };

            const apiDataResult = await dispatch(performApiCom(getMenuArgs));
            const apiData = apiDataResult.payload as MenuApiResponse; 

            return apiData.items;

        } catch (error: unknown) {
            console.error("Fetch Menu Error: ", error);
            if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: string }).message === 'string') {
                return rejectWithValue((error as { message: string }).message); 
            } else if (typeof error === 'string') {
                return rejectWithValue(error);
            } else {
                return rejectWithValue('Ett okänt fel uppstod vid hämtning av menyn.');
            }
        }
    }
);
