import { hc } from "hono/client";
import type { AppType } from "worker";

// The base URL can be dynamically switched using environment variables:
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

export const apiClient = hc<AppType>(API_URL, {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    // Dynamically derive subdomain per-request
    const host = typeof window !== "undefined" ? window.location.hostname : "apple.localhost";
    const subdomain = host.split(".")[0] !== "localhost" && host.split(".")[0] !== "127" 
      ? host.split(".")[0] 
      : "apple"; // local fallback

    return fetch(input, { 
      ...requestInit, 
      headers: {
        ...requestInit?.headers,
        "x-tenant-subdomain": subdomain
      }
    });
  }
});
