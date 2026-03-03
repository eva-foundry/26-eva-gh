export type TelemetryEventName = string;
export type TelemetryPayload = Record<string, unknown>;

export function logEvent(
  name: TelemetryEventName,
  payload?: TelemetryPayload
): void {
  // For now, just log to console; you can later route this
  // to Application Insights or EVA LiveOps.
  // eslint-disable-next-line no-console
  console.debug("[telemetry]", name, payload ?? {});
}

export function trackEvent(
  name: TelemetryEventName,
  payload?: TelemetryPayload
): void {
  logEvent(name, payload);
}
