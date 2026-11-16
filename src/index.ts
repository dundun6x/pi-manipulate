import { type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { type AutocompleteItem } from "@earendil-works/pi-tui";

import { INSTR_CMD, INSTR_FLAG, INSTR_SUBCMDS, type ExtensionState } from "./types";
import { handleManipCommand, resolveInstructionsFile } from "./handlers";
import { readFileSafe } from "./file";
import { stripDeveloperMessages } from "./payload";

export default function (pi: ExtensionAPI) {
  const state: ExtensionState = {
    file: null,
    enabled: true
  };
  const isActive = () => state.enabled && state.file !== null;

  pi.registerFlag(INSTR_FLAG, {
    description: "Use a file for custom instructions",
    type: "string",
  });

  pi.on("session_start", (_event, ctx) => {
    const customFile = pi.getFlag(INSTR_FLAG) as string | undefined;
    state.file = resolveInstructionsFile(ctx.cwd, customFile);
  });

  pi.registerCommand(INSTR_CMD, {
    description: "Manipulate Pi's instructions",
    getArgumentCompletions: (prefix): AutocompleteItem[] =>
      INSTR_SUBCMDS
        .filter((value) => value.startsWith(prefix.trim()))
        .map((value) => ({ value, label: value })),
    handler: async (args, ctx) => handleManipCommand(state, ctx, args),
  });

  pi.on("before_agent_start", () => {
    if (!isActive()) return;
    const instructions = readFileSafe(state.file);
    return instructions ? { systemPrompt: instructions } : undefined;
  });

  pi.on("before_provider_request", (event) => {
    if (!isActive()) return;
    stripDeveloperMessages(event.payload);
  });
}
