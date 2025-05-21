import { useContext } from 'react';
import { VarContext } from '../context/VarContext';

export const useApiKey = () => {
    const context = useContext(VarContext);
    if (!context) {
        throw new Error('useApiKey måste användas inom en VarContext.Provider');
    }
    return context[0];
};