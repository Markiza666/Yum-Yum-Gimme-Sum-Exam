import { useContext } from 'react';
import { VarContext } from '../context/VarContext';

export const useTenantId = () => {
    const context = useContext(VarContext);
    if (!context) {
        throw new Error('useTenantId måste användas inom en VarContext.Provider');
    }
    return context[1];
};