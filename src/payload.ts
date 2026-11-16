import { PayloadMessage } from "./types";

export function stripDeveloperMessages(payload: unknown): void {
  const data = payload as PayloadMessage;
  if (Array.isArray(data?.input)) {
    data.input = data.input.filter((msg) => msg.role !== "developer");
  }
}
