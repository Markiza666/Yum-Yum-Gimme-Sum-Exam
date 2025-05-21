import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiKey, ApiComArgs } from '../../utils/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl: string = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

export const fetchApiKey = createAsyncThunk<ApiKey, void, { rejectValue: string }>(
    'api/fetchApiKey',
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<ApiKey> = await axios.post(`${baseUrl}/keys`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                return rejectWithValue(`Fel vid hämtning av nyckel! Status: ${axiosError.response?.status || axiosError.message}`);
            } else {
                if (error instanceof Error) {
                    return rejectWithValue(`Ett okänt fel inträffade! ${error.message}`);
                } else {
                    return rejectWithValue('Ett okänt fel inträffade vid hämtning av nyckel.');
                }
            }
        }
    }
);

export const performApiCom = createAsyncThunk<object, ApiComArgs, { rejectValue: object | string }>(
    'api/performApiCom',
    async (apiComArgs, { rejectWithValue }) => {
        try {
            const config = {
                method: apiComArgs.apiMethod,
                url: `${baseUrl}/${apiComArgs.urlExtension}`,
                headers: {
                    'x-zocom': apiComArgs.key
                },
                data: apiComArgs.requestBody,
            };

            const response: AxiosResponse<object> = await axios(config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 400) {
                    return rejectWithValue({ status: 400, message: axiosError.response?.data || 'Bad Request' });
                } else {
                    return rejectWithValue(`Fel vid API request! Status: ${axiosError.response?.status || axiosError.message}`);
                }
            } else {
                if (error instanceof Error) {
                    return rejectWithValue(`Ett okänt fel inträffade! ${error.message}`);
                } else {
                    return rejectWithValue('Ett okänt fel inträffade vid API-kommunikation.');
                }
            }
        }
    }
);

