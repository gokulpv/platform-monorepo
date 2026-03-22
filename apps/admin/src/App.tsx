import { useEffect, useState } from 'react';
import { apiClient } from './api';

function App() {
  const [status, setStatus] = useState<string>('Loading...');
  const [brandSettings, setBrandSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Fetch brand settings (API Client automatically attaches x-tenant-subdomain)
        const brandRes = await apiClient.api['brand-settings'].$get();

        if (brandRes.ok) {
          const data = await brandRes.json() as any;
          if (data) {
            setBrandSettings(data);
            setStatus("Brand Loaded Successfully!");
          } else {
            setStatus("No brand settings found for this tenant.");
          }
        } else {
          setStatus('Failed to resolve brand settings.');
        }
      } catch (err) {
        console.error(err);
        setStatus('Failed to connect to worker');
      }
    };

    fetchSession();
  }, []);

  if (!brandSettings) {
    return <div style={{ padding: '2rem' }}><h2>Loading...</h2><p>{status}</p></div>;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: brandSettings.primary_color || '#fafafa',
      padding: '2rem', 
      fontFamily: 'system-ui' 
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        background: '#fff', 
        borderTop: `4px solid #18181b`
      }}>
        <h1 style={{ color: '#18181b' }}>React Portal</h1>
        <p>Location: {brandSettings.location}</p>
        <hr/>
        <p><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
}

export default App;
