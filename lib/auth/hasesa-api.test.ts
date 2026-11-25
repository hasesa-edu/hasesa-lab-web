import { createHash } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { apiBaseUrl, authViaApi, callbackUrl, pkcePair, startUrl } from "./hasesa-api";

afterEach(() => {
  delete process.env.AUTH_VIA_API;
  delete process.env.HASESA_API_URL;
});

describe("hasesa-api client", () => {
  it("is off unless AUTH_VIA_API=1", () => {
    expect(authViaApi()).toBe(false);
    process.env.AUTH_VIA_API = "true";
    expect(authViaApi()).toBe(false);
    process.env.AUTH_VIA_API = "1";
    expect(authViaApi()).toBe(true);
  });

  it("makes a valid S256 PKCE pair", () => {
    const { verifier, challenge } = pkcePair();
    expect(verifier.length).toBeGreaterThanOrEqual(43);
    expect(verifier.length).toBeLessThanOrEqual(128);
    expect(challenge).toBe(createHash("sha256").update(verifier).digest("base64url"));
  });

  it("builds the sign-in start URL for this origin", () => {
    process.env.HASESA_API_URL = "https://api.example/";
    expect(apiBaseUrl()).toBe("https://api.example");
    const url = new URL(startUrl("https://www.hasesa.com", "st", "ch"));
    expect(url.origin + url.pathname).toBe("https://api.example/v1/auth/google/start");
    expect(url.searchParams.get("client_id")).toBe("hasesa-web");
    expect(url.searchParams.get("redirect_uri")).toBe(callbackUrl("https://www.hasesa.com"));
    expect(url.searchParams.get("redirect_uri")).toBe("https://www.hasesa.com/api/auth/callback");
    expect(url.searchParams.get("state")).toBe("st");
    expect(url.searchParams.get("code_challenge")).toBe("ch");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
  });
});
