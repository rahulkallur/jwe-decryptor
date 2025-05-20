import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const decryptToken = async () => {
    const res = await fetch('/api/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🔓 JWE Token Decryption</h1>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your JWE token here"
        className="w-full h-32 p-2 bg-gray-800 rounded"
      />
      <button
        onClick={decryptToken}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Decrypt
      </button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-900 rounded overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}