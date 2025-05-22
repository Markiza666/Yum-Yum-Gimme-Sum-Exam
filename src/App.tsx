import { useEffect, useState } from 'react';
import './sass/global.scss';
import { fetchApiKey, performApiCom } from './service/api/api';
import { BadRequestError } from './utils/interfaces';
import { VarContext } from './app/context/VarContext';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './app/store'; 
import { unwrapResult } from '@reduxjs/toolkit'; 

export const tenantName: string = 'Yum';

function App() {
  const [useableApiKey, setUseableApiKey] = useState<string | null>(null);
  const [tenantId, setTenantID] = useState<string>('k7b3');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function initApiKey() {
      try {
        const resultAction = await dispatch(fetchApiKey());
        const response = unwrapResult(resultAction); // Hanterar resolved action
        setUseableApiKey(response.key);
      } catch (error: unknown) { // Använder 'unknown' för att sedan typ-skydda
        if (typeof error === 'string') {
          console.error('Fel vid hämtning av API-nyckel:', error);
        } else if (error instanceof Error) {
          console.error('Fel vid hämtning av API-nyckel:', error.message);
        } else {
          console.error('Ett okänt fel inträffade vid hämtning av API-nyckel.');
        }
      }
    }
    initApiKey();
  }, [dispatch]);

  useEffect(() => {
    async function createMyTenant() {
      if (!useableApiKey) return; // Väntar tills API-nyckeln är tillgänglig

      const tenantArgs = {
        urlExtension: 'tenants',
        apiMethod: 'POST',
        key: useableApiKey,
        requestBody: {
          "name": tenantName
        }
      };
      const tName = localStorage.getItem('TenantName');
      if (!tName){
        try {
        const resultAction = await dispatch(performApiCom(tenantArgs));
        const response = unwrapResult(resultAction); 

        if ('id' in response) { // Kontrollerar om 'id' finns i svaret
          setTenantID(response.id as string);
          localStorage.setItem("TenantID", response.id as string);
          localStorage.setItem('TenantName', tenantName);
        }
        } catch (error: unknown) { 
          if (typeof error === 'object' && error !== null && 'status' in error && (error as BadRequestError).status === 400) {
            const badRequestError = error as BadRequestError; 
            console.warn('Tenant redan registrerad:', badRequestError.message);
            const tName = localStorage.getItem('TenantName');
            if (tName === tenantName) {
              setTenantID(localStorage.getItem('TenantID') as string);
            } else if (tName === null) {
              localStorage.setItem('TenantName', tenantName);
              localStorage.setItem('TenantID', tenantId); 
            }
          } else {
            console.error('Fel vid skapande/hämtning av tenant:', error);
          }
        }
      }
    }
    createMyTenant();
  }, [tenantId, useableApiKey, dispatch]);

  if (useableApiKey === null) {
    return <div>Laddar...</div>;
  }

  return (
    <VarContext.Provider value={[useableApiKey, tenantId]}>
      <div>
        <Outlet />
      </div>
    </VarContext.Provider>
  );
}

export default App;
