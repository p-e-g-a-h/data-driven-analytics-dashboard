import type ApiData from "../types/ApiData";

export default async function fetchData(
  base: string,
  symbols: Array<string>,
): Promise<ApiData> {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error(
      "API URL is not configured in environment variables (VITE_API_URL).",
    );
  }

  try {
    const params = new URLSearchParams();

    if (base) {
      params.append("base", base);
    }

    symbols.forEach((item) => params.append("symbols", item));

    const queryString = params.toString();
    const completeUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

    const res = await fetch(completeUrl);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw error;
    throw new Error("Failed to fetch data");
  }
}
