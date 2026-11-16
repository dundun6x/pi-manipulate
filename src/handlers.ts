import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { getAgentDir, type ExtensionContext } from "@earendil-works/pi-coding-agent";

import { readFileSafe } from "./file";
import { INSTR_CMD, INSTR_FILE, INSTR_SUBCMDS, type ExtensionState } from "./types"

export function resolveInstructionsFile(cwd: string, customFile?: string): string | null {
  if (customFile != null) {
    const resolved = resolve(cwd, customFile);
    return existsSync(resolved) ? resolved : null;
  }
  const candidates = [
    join(cwd, ".pi", INSTR_FILE),
    join(getAgentDir(), INSTR_FILE),
  ];
  return candidates.find(existsSync) ?? null;
}

function formatWithLineNumbers(content: string): string {
  return content
    .split(/\r?\n/)
    .map((line, i) => `${String(i + 1).padStart(3)}  ${line}`)
    .join("\n");
}

export function handleManipCommand(state: ExtensionState, ctx: ExtensionContext, args: string): void {
  const cmd = args.trim().toLowerCase();

  if (cmd === "on" || cmd === "off") {
    state.enabled = cmd === "on";
    ctx.ui.notify(`Custom instructions ${state.enabled ? "enabled" : "disabled"}`, "info");
    return;
  }

  if (cmd === "view") {
    const content = readFileSafe(state.file);
    if (!content) {
      ctx.ui.notify(`${INSTR_FILE} not found or unreadable`, "warning");
      return;
    }
    const formatted = formatWithLineNumbers(content);
    ctx.ui.notify(`View: ${state.file}\n${formatted}`, "info");
    return;
  }

  ctx.ui.notify(`Usage: /${INSTR_CMD} ${INSTR_SUBCMDS.join("|")}`, "warning");
}
