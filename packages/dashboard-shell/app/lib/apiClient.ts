const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`;

async function request(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || `Request to ${path} failed`);
  }

  return result;
}

export const apiClient = {
  list: (path: string) => request(path),
  get: (path: string) => request(path),
  create: (path: string, body: unknown) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),
  update: (path: string, body: unknown) =>
    request(path, { method: "PUT", body: JSON.stringify(body) }),
  remove: (path: string) => request(path, { method: "DELETE" }),
};

export { API_URL };
