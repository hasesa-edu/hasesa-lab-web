import { createHash } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { answersViaApi, billingViaApi, chatViaApi, apiBaseUrl, apiTokensNeeded, authViaApi, callbackUrl, dashboardViaApi, guideViaApi, pkcePair, progressViaApi, startUrl } from "./hasesa-api";

afterEach(() => {
  delete process.env.AUTH_VIA_API;
  delete process.env.ANSWERS_VIA_API;
  delete process.env.PROGRESS_VIA_API;
  delete process.env.DASHBOARD_VIA_API;
  delete process.env.GUIDE_VIA_API;
  delete process.env.BILLING_VIA_API;
  delete process.env.CHAT_VIA_API;
  delete process.env.HASESA_API_URL;
});

describe("hasesa-api client", () => {
  it("is off unless AUTH_VIA_API is switched on", () => {
    expect(authViaApi()).toBe(false);
    for (const off of ["", "0", "false", "no"]) {
      process.env.AUTH_VIA_API = off;
      expect(authViaApi()).toBe(false);
    }
    for (const on of ["1", "true", " TRUE ", "yes", "on"]) {
      process.env.AUTH_VIA_API = on;
      expect(authViaApi()).toBe(true);
    }
  });

  it("turns each learning switch on only together with AUTH_VIA_API", () => {
    process.env.ANSWERS_VIA_API = "1";
    process.env.PROGRESS_VIA_API = "1";
    process.env.DASHBOARD_VIA_API = "1";
    expect([answersViaApi(), progressViaApi(), dashboardViaApi(), apiTokensNeeded()]).toEqual([false, false, false, false]);
    process.env.AUTH_VIA_API = "1";
    expect([answersViaApi(), progressViaApi(), dashboardViaApi(), apiTokensNeeded()]).toEqual([true, true, true, true]);
    process.env.ANSWERS_VIA_API = "0";
    process.env.PROGRESS_VIA_API = "";
    expect([answersViaApi(), progressViaApi(), dashboardViaApi(), apiTokensNeeded()]).toEqual([false, false, true, true]);
  });

  it("turns the guide, billing and chat switches on only together with AUTH_VIA_API", () => {
    process.env.GUIDE_VIA_API = "1";
    process.env.BILLING_VIA_API = "1";
    process.env.CHAT_VIA_API = "yes";
    expect([guideViaApi(), billingViaApi(), chatViaApi(), apiTokensNeeded()]).toEqual([false, false, false, false]);
    process.env.AUTH_VIA_API = "1";
    expect([guideViaApi(), billingViaApi(), chatViaApi(), apiTokensNeeded()]).toEqual([true, true, true, true]);
  });

  it("needs API tokens whenever Hasesa Accounts is on (admins call the API)", () => {
    process.env.AUTH_VIA_API = "1";
    expect(apiTokensNeeded()).toBe(true);
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
