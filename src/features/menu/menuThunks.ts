import { apiCom, ApiComArgs, getKey } from '../../service/api/api';
import { fetchMenuStart, fetchMenuSuccess, fetchMenuFailure } from './menuSlice';
import { AppDispatch, AppThunk } from '../../app/store';
import { MenuApiResponse } from '../../utils/interfaces';

export const fetchMenu: AppThunk = () => async (dispatch: AppDispatch) => {
    console.log("fetchMenu Called");
    dispatch(fetchMenuStart());
    try {
        const newApiKey = await getKey();
        const usableKey = newApiKey.key;

        const getMenuArgs: ApiComArgs = {
            urlExtension: 'menu',
            apiMethod: 'GET',
            key: usableKey,
        };
        const apiData = await apiCom(getMenuArgs) as MenuApiResponse;
        console.log("API Response: ", apiData);
        dispatch(fetchMenuSuccess(apiData.items));
    } catch (error: unknown) {
        console.error("Fetch Menu Error: ", error); 
        if (error instanceof Error) {
            dispatch(fetchMenuFailure(error.message));
        } else {
            dispatch(fetchMenuFailure('Ett okänt fel uppstod'));
        }
    }
};