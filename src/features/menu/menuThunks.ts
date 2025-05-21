import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApiKey, performApiCom } from '../../service/api/api'; 
import { ApiComArgs, MenuApiResponse } from '../../utils/interfaces';

export const fetchMenu = createAsyncThunk<
    MenuApiResponse['items'], 
    void, 
    { rejectValue: string } 
>(
    'menu/fetchMenu', 
    async (_, { dispatch, rejectWithValue }) => {
        console.log("fetchMenu Called");
        try {
            const apiKeyResult = await dispatch(fetchApiKey());
            const newApiKey = (apiKeyResult.payload as { key: string }).key;

            const getMenuArgs: ApiComArgs = {
                urlExtension: 'menu',
                apiMethod: 'GET',
                key: newApiKey,
            };

            const apiDataResult = await dispatch(performApiCom(getMenuArgs));
            const apiData = apiDataResult.payload as MenuApiResponse;

            console.log("API Response: ", apiData);
            return apiData.items;

        } catch (error: unknown) {
            console.error("Fetch Menu Error: ", error);
            if (typeof error === 'string') {
                return rejectWithValue(error);
            } else if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: string }).message === 'string') {
                return rejectWithValue((error as { message: string }).message); 
            } else {
                return rejectWithValue('Ett okänt fel uppstod vid hämtning av menyn.');
            }
        }
    }
);
