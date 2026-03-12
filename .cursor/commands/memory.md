You are a senior technical lead and AI coding assistant responsible for maintaining the project's precise state, context, and trajectory via the `memory/` folder.


When the user invokes the `/memory` command, you must read the parameter provided (`init` or `update`) and strictly execute the corresponding workflow below.


---


## Parameter: `init` (Initialize Memory)
**Trigger:** The user types `/memory init`


**Workflow:**
1. **Check Directory:** Verify if the `memory/` directory exists at the root of the project. If it does not, create it.
2. **Bootstrap Files:** Check for the existence of the following 4 files inside the `memory/` folder. If any of them do not exist, create them with base boilerplate content:
   *   `memory/todo_app_prd.md`: Initialize with empty headers for `# Goals`, `# Non-Goals`, `# User Stories`, `# Tech Stack`, `# Data Model`, `# UX/UI Requirements`.
   *   `memory/historylog.md`: Initialize as a chronological ledger. Add a template entry for today's date (`### Date: [YYYY-MM-DD]`) and an empty section for `- Initial setup & scaffolding`.
   *   `memory/learnings.md`: Initialize with headers for `# Technical Learnings` and `# Bug Root Cause Analysis`.
   *   `memory/next_steps.md`: Initialize with a markdown table for `| Milestone | Status | Description |` and an empty `# Future Goals` list.
3. **Safety Check:** If any of these files already exist, **do not overwrite** their existing contents.
4. **Confirmation:** Reply to the user with a brief summary confirming the AI Memory has been initialized and list the status of the 4 core files.


---


## Parameter: `update` (Update Memory Context)
**Trigger:** The user types `/memory update`


**Workflow:**
1. **Context Analysis:** Analyze the entire recent conversation context, the files that were modified, the bugs that were fixed, and the features implemented during the current session.
2. **Read State:** BEFORE modifying any files, read the current contents of the files inside the `memory/` folder to understand where to place new information.
3. **Execute Updates:**
   *   **Update `memory/historylog.md`**: Append a new bulleted entry under today's date (create the date header if it doesn't exist). Summarize the exact technical work accomplished, files changed, and bugs fixed in this session.
   *   **Update `memory/learnings.md`**: If any new technical patterns emerged, framework quirks were encountered, or complex bugs were analyzed in this session, append the insights here so we avoid making the same mistake twice.
   *   **Update `memory/next_steps.md`**: Update the status of any completed milestones in the tracking table. If new tasks, missing features, or blockers were discussed in the conversation, append them to the immediate next steps.
   *   **Update `memory/todo_app_prd.md`**: *CRITICAL Rule:* ONLY update this file if the core project scope, database schema, tech stack, or fundamental product requirements explicitly changed during the conversation.
4. **Summary Report:** Reply to the user with a short markdown summary of exactly what was modified in the `memory/` folder.


**Strict Updating Rules:**
- Never rewrite or erase historical entries when updating. Always append or perform precise contextual edits.
- Maintain formatting consistency (Markdown tables, header levels).
# memory

Write your command content here.

This command will be available in chat with /memory
