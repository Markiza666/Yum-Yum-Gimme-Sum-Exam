import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ApiKey {
    key: string;
}

export interface ApiComArgs {
    urlExtension: string;
    apiMethod: string;
    key: string;
    requestBody?: object;
}

const baseUrl: string = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

export async function getKey(): Promise<ApiKey> {
    try {
        const response: AxiosResponse<ApiKey> = await axios.post(`${baseUrl}/keys`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {    // Hanterar Axios-relaterade fel            
            const axiosError = error as AxiosError; // Sätter typen på konstanten till att vara typen AxiosError
            throw new Error(`Fel vid hämtning av nyckel! status: ${axiosError.response?.status || axiosError.message}`);
        } else {    // Hanterar andra fel            
            if (error instanceof Error) {   // Typkontroll för Error-objekt
                throw new Error(`Ett okänt fel inträffade! ${error.message}`);
            } else {    // Hanterar andra okända fel                
                throw new Error('Ett okänt fel inträffade.');
            }
        }
    }
}

export async function apiCom(apiComArgs: ApiComArgs): Promise<object> {
    try {
        const config = {
            method: apiComArgs.apiMethod,
            url: `${baseUrl}/${apiComArgs.urlExtension}`,
            headers: {
                'x-zocom': apiComArgs.key
            },
            data: apiComArgs.requestBody, // Konverterar requestBody i apiComArgs till Axios config-objektets data nyckel
        };

        const response: AxiosResponse<object> = await axios(config);
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Hanterar Axios-relaterade fel
            const axiosError = error as AxiosError; // Sätter typen på konstanten till att vara typen AxiosError
            if (axiosError.response?.status !== 400) {  // Om felet inte är en "Bad Request" så hantera det här ->
                throw new Error(`Fel vid hämtning via API request! status: ${axiosError.response?.status || axiosError.message}`);
            }else {     // om felet är en "Bad Request" returnera JSON-objekt för att kunna hantera i anropande funktion ->
                return {status: 400};
            }
            
        } else {    // Hanterar andra fel            
            if (error instanceof Error) {   // Typkontroll för Error-objekt                
                throw new Error(`Ett okänt fel inträffade! ${error.message}`);
            } else {    // Hanterar andra okända fel                
                throw new Error('Ett okänt fel inträffade.');
            }
        }
    }
}