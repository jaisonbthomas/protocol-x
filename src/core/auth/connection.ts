import { config } from "../config";

/**
 * Check whether the user is connected to Protocol X Console
 * (either via WorkOS tokens or a legacy API key).
 */
export function isConnected(cfg: {
  accessToken?: string | null;
  protocol-xAPIKey?: string | null;
}): boolean {
  return !!(cfg.accessToken || cfg.protocol-xAPIKey);
}

/**
 * Disconnect from Protocol X Console by clearing all auth fields in the config.
 */
export async function disconnect(): Promise<void> {
  await config.update({
    protocol-xAPIKey: null,
    accessToken: null,
    refreshToken: null,
    workspaceId: null,
    workspaceSlug: null,
    gatewaySigningKey: null,
  });
}
