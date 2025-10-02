'use client';

import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  [key: string]: unknown;
};

type StatusState =
  | { state: 'idle' }
  | { state: 'loading' }
  | { state: 'success'; data: HealthResponse }
  | { state: 'error' };

const containerStyle: React.CSSProperties = {
  padding: '4rem 2rem',
  maxWidth: '720px',
  margin: '0 auto'
};

export default function StatusPage() {
  const [status, setStatus] = useState<StatusState>({ state: 'idle' });

  useEffect(() => {
    let isMounted = true;
    const fetchStatus = async () => {
      setStatus({ state: 'loading' });
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

      try {
        const response = await fetch(`${baseUrl}/api/healthz`);
        if (!response.ok) {
          throw new Error('Request failed');
        }

        const payload = (await response.json()) as HealthResponse;
        if (isMounted) {
          setStatus({ state: 'success', data: payload });
        }
      } catch (error) {
        console.error('Failed to reach backend', error);
        if (isMounted) {
          setStatus({ state: 'error' });
        }
      }
    };

    fetchStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>System Status</h1>
      {status.state === 'loading' && <p>Checking backend health...</p>}
      {status.state === 'success' && (
        <section style={{ background: 'rgba(15, 118, 110, 0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
          <p style={{ margin: 0 }}>Backend is reachable.</p>
          <pre style={{ marginTop: '1rem', fontSize: '0.9rem' }}>{JSON.stringify(status.data, null, 2)}</pre>
        </section>
      )}
      {status.state === 'error' && (
        <section style={{ background: 'rgba(190, 18, 60, 0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
          <p style={{ margin: 0 }}>Unable to reach backend health check. Ensure the API container is running.</p>
        </section>
      )}
    </main>
  );
}
