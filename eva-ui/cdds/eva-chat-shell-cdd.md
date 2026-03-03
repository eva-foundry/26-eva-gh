\# EVA-UI – EVA Chat Shell CDD



\## 1. Overview



\*\*Component:\*\* EVA Chat Shell (UI)  

\*\*Repo:\*\* `eva-ui`  

\*\*Scope:\*\* Web-based conversational UI for EVA, providing a single chat experience for:

\- general assistance (EVA Chat),

\- internal domain assistants (EVA DA spaces),

\- future routing to specialized agents (Jurisprudence, CPP-D, AssistMe, BDM KM, etc.).



The EVA Chat Shell is a \*\*faceless container\*\* that talks exclusively to EVA APIM and renders conversations in an accessible, bilingual UI.



---



\## 2. Objectives



\- Provide a \*\*modern, responsive, WCAG 2.1 AA\*\* compliant chat UI.

\- Support \*\*bilingual (en-CA / fr-CA)\*\* user experience via the EVA i18n contract.

\- Integrate tightly with \*\*EVA APIM\*\* as the sole backend for chat, RAG, and tools.

\- Instrument chat interactions for \*\*LiveOps / FinOps\*\* (APIM logs, dashboards).

\- Serve as the base for a \*\*unified EVA Conversation Shell\*\* in the future.



---



\## 3. Scope



\### In Scope (v1)



\- React/Vite/TypeScript/Tailwind-based web UI.

\- Core layout:

&nbsp; - Header, footer, skip links, main chat pane, optional sidebar.

\- Chat primitives:

&nbsp; - Message list, input bar, send button, mic button (hooked to STT provider via backend or browser API).

\- Basic mode/context handling:

&nbsp; - Initial support for “internal” vs “external” flags (even if UI toggle is minimal at v1).

\- i18n:

&nbsp; - Locale toggle (en-CA / fr-CA).

&nbsp; - Text and system prompts sourced from i18n JSON generated from the EVA i18n contract.

\- APIM integration:

&nbsp; - Calls to `/chat/completions` (or similar) via EVA APIM.

&nbsp; - Proper project/feature/env/cost headers.

\- Accessibility:

&nbsp; - Keyboard focus management.

&nbsp; - Screen reader labels.

&nbsp; - High contrast theme support.

\- Telemetry:

&nbsp; - Basic event hooks for chat send/receive, surfaced via APIM logs.



\### Out of Scope (v1)



\- Advanced agent routing (automatic intent detection).

\- Complex conversation management (multi-thread workflows).

\- RAG document upload from the UI.

\- Admin consoles / prompt editors.

\- Multi-tenant theming.



---



\## 4. Users and Personas



\- \*\*Internal ESDC employees\*\* using EVA as:

&nbsp; - general assistant (EVA Chat),

&nbsp; - entry point to EVA Domain Assistants.

\- \*\*AI COE / EVA team\*\*:

&nbsp; - demonstrates EVA capabilities to leadership and stakeholders.

\- \*\*System Integrators / partners\*\*:

&nbsp; - reference UI for how to integrate with EVA APIM and meet a11y/i18n standards.



---



\## 5. Functional Requirements



1\. \*\*Send/Receive Messages\*\*

&nbsp;  - As a user, I can type a message and send it to EVA.

&nbsp;  - The UI displays assistant responses as a conversation thread.

&nbsp;  - Errors are surfaced in a user-friendly way.



2\. \*\*Mic / Voice Input\*\*

&nbsp;  - As a user, I can click a mic button to dictate my query (or simulate this in v1).

&nbsp;  - Once transcription is complete, the text appears in the input box for confirmation before sending.



3\. \*\*Language Toggle\*\*

&nbsp;  - As a user, I can switch the UI language between en-CA and fr-CA.

&nbsp;  - Static text, labels, and messages use the selected locale.

&nbsp;  - Locale preference is persisted (e.g., localStorage).



4\. \*\*Mode Awareness (Internal vs External)\*\*

&nbsp;  - As a user, I can see which “mode” I am in (Internal or External) when that feature is enabled.

&nbsp;  - All calls to EVA APIM include a mode indicator in headers.



5\. \*\*Conversation History (v1 Minimal)\*\*

&nbsp;  - Current session maintains the conversation context in memory.

&nbsp;  - (Persistent history can be considered later.)



---



\## 6. Non-Functional Requirements



\### 6.1 Accessibility



\- Conform to \*\*WCAG 2.1 AA\*\*:

&nbsp; - Proper landmarks (`header`, `main`, `footer`, `nav`).

&nbsp; - Visible focus outlines.

&nbsp; - Keyboard-only operation (tab/shift-tab, enter/space).

&nbsp; - ARIA labels on mic, send, navigation buttons.

&nbsp; - Sufficient color contrast in all modes.



\### 6.2 Internationalization



\- All user-facing text sourced from i18n files (`en-CA.json`, `fr-CA.json`) generated from the EVA i18n contract.

\- No hard-coded literals in components.

\- Right from v1: support for future additional locales via the same mechanism.



\### 6.3 Security \& Privacy



\- UI must never include API keys or secrets.

\- All API interaction is via EVA APIM (no direct calls to external LLMs).

\- Logging avoids capturing sensitive content beyond what is acceptable for Protected B.



\### 6.4 Observability



\- Chat send/receive events trigger telemetry hooks.

\- APIM provides:

&nbsp; - call counts,

&nbsp; - latency,

&nbsp; - cost metrics,

&nbsp; - feature usage.



\### 6.5 Performance



\- Initial page load should be lightweight:

&nbsp; - Code splitting if needed.

&nbsp; - Avoid heavy libraries beyond the core stack.



---



\## 7. Integration Points



\- \*\*EVA APIM\*\*

&nbsp; - Endpoint: `/chat/completions` (or equivalent).

&nbsp; - Headers:

&nbsp;   - `x-project`

&nbsp;   - `x-feature`

&nbsp;   - `x-app`

&nbsp;   - `x-env`

&nbsp;   - `x-cost-center`

&nbsp;   - `x-mode` (internal/external)

&nbsp;   - `x-locale`



\- \*\*EVA i18n Contract\*\*

&nbsp; - Source YAML: `contracts/i18n/eva-i18n-contract.yaml` (or similar).

&nbsp; - Build step generates locale JSON for the app.



\- \*\*Telemetry / Logging\*\*

&nbsp; - APIM + platform logs consumed by EVA LiveOps / FinOps dashboards.



---



\## 8. Dependencies



\- `eva-orchestrator` for overall suite orchestration and P02 integration.

\- `eva-openai` / `eva-rag` services behind APIM.

\- Info Assistant backend for initial RAG functionality.



---



\## 9. Risks and Mitigations



\- \*\*Risk:\*\* Ambiguity between Internal and External modes.  

&nbsp; \*\*Mitigation:\*\* Explicit UI indicators, clear labeling, APIM enforcement.



\- \*\*Risk:\*\* Accessibility regressions as new features are added.  

&nbsp; \*\*Mitigation:\*\* Automated a11y checks in CI, manual testing for key flows.



\- \*\*Risk:\*\* i18n drift between contract and implementation.  

&nbsp; \*\*Mitigation:\*\* Single source of truth (contract), codegen for locale files.



---



\## 10. Acceptance Criteria



\- User can send and receive messages in both English and French.

\- All interactive elements are keyboard navigable and screen-reader friendly.

\- All API calls go through EVA APIM with correct headers.

\- Telemetry events can be surfaced in a simple dashboard (or log queries).

\- Demonstrable in the Dec 24 EVA Suite demo as the EVA Chat front-end.



