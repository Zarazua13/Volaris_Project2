import { msalConfig } from "@/config/auth-config";
import { PublicClientApplication } from "@azure/msal-browser";

export const msalIstance = new PublicClientApplication(msalConfig)
