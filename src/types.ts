export const INSTR_FILE = "INSTRUCTIONS.md";
export const INSTR_FLAG = "instructions";
export const INSTR_CMD = "manip-instr";
export const INSTR_SUBCMDS = ["on", "off", "before", "after"] as const;

export type ExtensionState = {
  file: string | null;
  enabled: boolean;
};

export type PayloadMessage = {
  role?: string;
  [key: string]: unknown;
};
