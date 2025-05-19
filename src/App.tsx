import { useEffect, useState } from 'react';
import './sass/global.scss';
import { ApiComArgs, ApiKey, getKey, apiCom } from './service/api/api';
import { VarContext } from './service/context/VarContext';
import { Outlet } from 'react-router-dom';
import Menu from './vews/Menu';

export const tenantName: string = 'Yum';

function App() {
  const [useableApiKey, setUseableApiKey] = useState<string | null>(null);    // Variabel för att spara api nyckel
  const [tenantId, setTenantID] = useState<string>('k7b3');   // Variabel för att spara tenantId

  useEffect(() => {   // Hämtar api nyckel för sessionen och lägger den i variabeln
    async function initApiKey() {
      const response: ApiKey = await getKey();

      const hamtadKey = response.key;
      setUseableApiKey(hamtadKey);
    }

    
    initApiKey();
  }, []); // Tom array = kör bara en gång vid komponentens montering
  
  useEffect(() => {   // Skapar ett tenantId för tenantName, kontrollerar om det redan finns och laddar från localStorage i så fall(om det redan finns). API-servern ger "Bad Request", 400 om tenantName redan är registrerat.
    async function createMyTenant() {
      const tenantArgs: ApiComArgs= {
        urlExtension: 'tenants',
        apiMethod: 'POST',
        key: useableApiKey as string,
        requestBody: {
          "name": tenantName
        } 
      }

      const response: object = await apiCom(tenantArgs);      
      for (const [key, value] of Object.entries(response)) {
        if (key === 'status' && value === 400) {
            const tName = localStorage.getItem('TenantName');
            if(tName === tenantName) {
              setTenantID(localStorage.getItem('TenantID') as string);
            } else if (tName === null) {
              localStorage.setItem('TenantName', tenantName);
              localStorage.setItem('TenantID', tenantId); 
            }
        } else if (key === 'id') {
          setTenantID(value);
          localStorage.setItem("TenantID", value);
          localStorage.setItem('TenantName', tenantName);
        }
      }
    }
    createMyTenant();
  }, [tenantId, useableApiKey]);

  if (useableApiKey === null) {
    return <div>Laddar...</div>;
  }

  return (
    <VarContext.Provider value={[useableApiKey, tenantId]}>
      <div>
        <Outlet />
        <Menu />
      </div>
    </VarContext.Provider>
  )
}

export default App
