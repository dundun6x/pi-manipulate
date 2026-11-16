# pi-manipulate

[![npm version](https://img.shields.io/npm/v/pi-manipulate)](https://www.npmjs.com/package/pi-manipulate)
[![npm downloads](https://img.shields.io/npm/dm/pi-manipulate)](https://www.npmjs.com/package/pi-manipulate)
[![license](https://img.shields.io/github/license/dundun6x/pi-manipulate)](LICENSE)

Aggressive manipulation tools for [Pi](https://github.com/earendil-works/pi).

## Installation

```bash
pi install npm:pi-manipulate
```

## Features

### Custom instructions

Here, 'instructions' refers to the assembled system prompt, named after its corresponding payload field. When this feature is enabled (by default), the instructions file replaces the assembled system prompt. Any built-in or extension instructions parts are blocked. The example parts are:

- The system prompt (can be specified by `--system-prompt` or `SYSTEM.md`)
- The available skills (wrapped in `<skills>`)
- The current working directory (wrapped in `<cwd>`)

Custom instructions are checked in the following order of priority:

- `pi --instructions <file>` — Highest priority instructions
- `./.pi/INSTRUCTIONS.md` — Project-level instructions
- `~/.pi/agent/INSTRUCTIONS.md` — User-level instructions

In-session commands are available:

- `/manip-instr on` — Enable the custom instructions
- `/manip-instr off` — Disable the custom instructions
- `/manip-instr view` — View the custom instructions

Notably, the underlying session data remains untouched. Since built-in or extension prompts may still be injected into the request as 'system' or 'developer' role messages, this extension filters them out before sending requests to the model.

Motivation for this feature:

Frontier models no longer need hand-holding to perform well, making verbose instructions both a distraction and a waste of tokens. Since Pi and its extensions collectively assemble the final prompt, keeping instructions clean is challenging. By intercepting the payload sent to the provider, this extension gives you absolute control over the final instructions, letting you retain extension tools and features without their prompt bloat.

## License

[MIT](LICENSE)
