import { describe, it, expect, vi, beforeEach } from "vitest";
import fetchData from "./fetchData";

describe("fetchData", () => {
  beforeEach(() => {
    // 1. Set fake API URL
    vi.stubEnv("VITE_API_URL", "http://api.com");

    // 2. Default fake fetch response
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  // 1. Tests Environment Config
  it("throws error if VITE_API_URL is missing", async () => {
    vi.stubEnv("VITE_API_URL", "");

    await expect(fetchData("USD", [])).rejects.toThrow();
  });

  // 2. Tests Default URL
  it("fetches base URL without query params when inputs are empty", async () => {
    await fetchData("", []);

    expect(globalThis.fetch).toHaveBeenCalledWith("http://api.com");
  });

  // 3. Tests URL Query Builder
  it("builds correct URL query string for base and symbols", async () => {
    await fetchData("EUR", ["USD", "GBP"]);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://api.com?base=EUR&symbols=USD&symbols=GBP",
    );
  });

  // 4. Tests Server Errors (404 / 500)
  it("throws error if server response is not ok", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    await expect(fetchData("USD", [])).rejects.toThrow();
  });

  // 5. Tests Data Return
  it("returns parsed API data on success", async () => {
    const mockData = { base_currency: "USD" };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchData("USD", []);

    expect(data).toEqual(mockData);
  });
});
