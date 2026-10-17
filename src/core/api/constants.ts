export const PROTOCOL-X_API_BASE_URL = "https://api.protocol-x.dev";
export const PROTOCOL-X_GATEWAY_BASE_URL = "https://gateway.protocol-x.dev";
export const PROTOCOL-X_CONSOLE_BASE_URL = "https://console.protocol-x.dev";

export function getProtocol XApiUrl(): string {
  return process.env.PROTOCOL-X_API_URL || PROTOCOL-X_API_BASE_URL;
}

export function getProtocol XGatewayUrl(): string {
  return process.env.PROTOCOL-X_GATEWAY_URL || PROTOCOL-X_GATEWAY_BASE_URL;
}

export function getProtocol XConsoleUrl(): string {
  return process.env.PROTOCOL-X_CONSOLE_URL || PROTOCOL-X_CONSOLE_BASE_URL;
}
