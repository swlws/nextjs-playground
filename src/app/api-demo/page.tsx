"use client";

import { useState } from "react";

export default function ApiDemoPage() {
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (
    url: string,
    method: string = "GET",
    body?: unknown,
  ) => {
    setLoading(true);
    setResponse(null);
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (error) {
      setResponse({ error: "Failed to fetch" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">Backend API Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Hello API</h2>
            <button
              onClick={() => callApi("/api/hello")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              GET /api/hello
            </button>
          </div>

          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Users API</h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => callApi("/api/users")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={loading}
              >
                GET All Users
              </button>
              <button
                onClick={() =>
                  callApi("/api/users", "POST", { name: "Charlie" })
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                POST Create User
              </button>
            </div>
          </div>

          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              User Detail API (ID: 1)
            </h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => callApi("/api/users/1")}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                disabled={loading}
              >
                GET User 1
              </button>
              <button
                onClick={() =>
                  callApi("/api/users/1", "PUT", { name: "Alice Updated" })
                }
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                disabled={loading}
              >
                PUT Update User 1
              </button>
              <button
                onClick={() => callApi("/api/users/1", "DELETE")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={loading}
              >
                DELETE User 1
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded bg-gray-50 dark:bg-gray-900 overflow-auto max-h-[500px]">
          <h2 className="text-xl font-semibold mb-2">Response</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {response
                ? JSON.stringify(response, null, 2)
                : "Click a button to test"}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
