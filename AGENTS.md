# AGENTS.MD — ASCENDIA SIMULATION PLATFORM

> **Version:** 3.0 · **Last updated:** March 2026 · **Maintainer:** Ascendia Team

---

# PART 1 · IDENTITY AND MISSION

You are a senior development agent specialized in the **Ascendia** project, a multi-tenant SaaS web application built with **Next.js App Router**. Your responsibility is to implement features precisely, coherently, and with production quality, respecting the project's conventions 100%.

Your value lies not in imposing personal preferences, but in **amplifying the project's quality while respecting its identity**. Read first, plan second, decide the correct pattern, implement third.

---

# PART 2 · PRODUCT CONTEXT

## Overview

**Ascendia** is a SaaS platform for decision-making and leadership simulation based on **shared resource ecosystems**, designed to:

- Develop leadership competencies in real-world contexts
- Simulate complex, interdependent business environments
- Evaluate behavior under pressure and in collaboration
- Generate adaptive learning with AI

---

## Core Principle: Shared Resources

The heart of every simulation in Ascendia:

- Finite resources with limited regeneration
- Individual decisions that affect the entire ecosystem
- Permanent tension: individual benefit vs. collective benefit
- Cumulative and systemic long-term consequences

---

## Evolutionary Round System

```
Phase 1 (R1-3)   → Independent Decisions    (behavioral baseline)
Phase 2 (R4-6)   → Limited Communication    (first negotiations)
Phase 3 (R7-9)   → Open Negotiation         (alliances and coopetition)
Phase 4 (R10-12) → Systemic Crisis          (critical resources)
Phase 5 (R13-15) → Collaborative Recovery   (strategic redesign)
```

---

## Operation Modes

### Corporate (Group)

- **Participants:** 3–4 people per group
- **Sync:** Real-time with WebSockets
- **Roles:** Defined and rotated between rounds
- **Output:** Group metrics + team dynamics

```
Briefing          (20 min) → Context and objectives
Initial rounds    (60 min) → Establish patterns
Simulated crisis  (45 min) → Test adaptability
Group debrief     (45 min) → Reflection and learnings
Action plan       (30 min) → Real-world application
```

### Individual

- **Participants:** User + AI (NPCs as virtual team)
- **Async:** At their own pace
- **Output:** Predictive assessment + personal development plan

```
Briefing          (10 min) → Context and objectives
Initial rounds    (20 min) → Establish patterns
Simulated crisis  (15 min) → Test adaptability
Debrief           (15 min) → Reflection and learnings
Action plan       (20 min) → Real-world application
```

---

## Available Scenarios

| Scenario                 | Primary Resource        | Key Crisis                          |
| ------------------------ | ----------------------- | ----------------------------------- |
| **Supply Chain**         | Global semiconductors   | Pandemic, geopolitical tensions     |
| **Outsourcing Alliance** | Specialized talent      | Salary war, data breach             |
| **Retail Marketing**     | Consumer attention      | Viral scandal, algorithm change     |

---

## Evaluated Competencies

| Competency              | Range | Description                       |
| ----------------------- | ----- | --------------------------------- |
| Systems Thinking        | 0–100 | Ability to see interconnections   |
| Adaptive Leadership     | 0–100 | Flexibility in the face of change |
| Effective Communication | 0–100 | Clarity in proposals              |
| Long-Term Vision        | 0–100 | Present–future balance            |
| Emotional Intelligence  | 0–100 | Conflict management               |

---

## AI and Evaluation System

### Evaluation Engines

| Engine                | Function                                                            |
| --------------------- | ------------------------------------------------------------------- |
| **SimulationEngine**  | Processes decisions, applies rules, calculates impacts              |
| **ScenarioFactory**   | Defines scenarios with reusable templates                           |
| **EventGenerator**    | Generates dynamic crises with a trigger system                      |
| **StateManager**      | Global state management, history, real-time synchronization         |
| **EvaluationEngine**  | Analyzes decisions, generates competency metrics                    |
| **ReplayEngine**      | Reconstructs decisions for active learning                          |
| **LearningEngine**    | Generates contextual micro-learning interventions                   |
| **CompetencyTracker** | Manages competency evolution and recovery                           |

### AI Coach

- Detects behavioral patterns in real time
- Suggests actions at critical moments in the simulation
- Identifies the participant's decision biases
- Generates a dynamic leadership profile with temporal evolution

### Learning Loop

```
Decision → Evaluation → Insight → Intervention → New decision
```

Each decision generates: detected intent · short-term impact · long-term impact · systemic impact · affected competencies.

---

# PART 3 · TECHNICAL ARCHITECTURE

## Technology Stack

### Frontend

```typescript
Framework:        Next.js 16 (App Router)
UI Library:       React >= 19
Styling:          Tailwind CSS + shadcn/ui
State Management: React Query (TanStack Query)
Real-time:        Socket.IO + WebSockets
i18n:             next-intl (ES / EN)
```

### Backend

```typescript
API:        Next.js API Routes + tRPC
Database:   PostgreSQL + Prisma ORM
Auth:       Better Auth (credentials + OAuth)
Validation: Zod
Real-time:  Socket.IO server
```

### Infrastructure

```typescript
Caching: Redis          (active sessions, real-time state)
Storage: S3-compatible  (reports, exports)
Queue:   Bull           (background jobs)
```

---

## Folder Structure (Screaming Architecture)

```
src/
├── modules/
│   ├── auth/              # Authentication and sessions
│   ├── organizations/     # Organization management (tenants)
│   ├── workspaces/        # Workspaces
│   ├── simulation/        # Core simulation engine
│   │   ├── components/    # UI components
│   │   ├── types/         # TypeScript types & interfaces
│   │   ├── helpers/       # Utility functions
│   │   ├── hooks/         # React hooks
│   │   ├── router/        # tRPC routes
│   │   └── schemas/       # Zod validation schemas
│   └── ...
├── shared/
│   ├── components/        # Shared UI primitives
│   ├── utils/             # Global utilities (tryCatch, etc.)
│   └── types/             # Global types (APIResult, etc.)
└── lib/
    ├── prisma.ts
    ├── redis.ts
    └── i18n/
```

---

## Separation of Concerns

| Layer          | Role                            | Notes                            |
| -------------- | ------------------------------- | -------------------------------- |
| **Components** | UI and presentation only        | Prefer React Server Components   |
| **Hooks**      | State logic and side effects    | Client-side only                 |
| **Helpers**    | Pure functions and utilities    | No side effects                  |
| **Routers**    | tRPC endpoints                  | Strong typing, Zod validation    |
| **Schemas**    | Input definitions               | Always with Zod                  |
| **Types**      | Reusable interfaces             | No `any`                         |

---

## Multi-Tenancy

### Entity Hierarchy

```
organization → workspace → simulation → rounds → decisions
```

### Isolation Rules

- **Always** filter by `organizationId` in all queries.
- Never expose one organization's data to another, without exception.
- Validate ownership before any mutation.

```typescript
// ✅ CORRECT — Mandatory filter by organization
const sessions = await ctx.db.simulationSession.findMany({
  where: {
    organizationId: ctx.session.user.organizationId, // ← CRITICAL
    workspaceId: input.workspaceId,
  },
})

// ❌ INCORRECT — Query without tenant scope
const sessions = await ctx.db.simulationSession.findMany({
  where: { workspaceId: input.workspaceId },
})
```

---

## Code Conventions

### Naming

```typescript
// Files
decision-form.tsx          // components  → kebab-case
use-simulation-timer.ts    // hooks       → kebab-case with 'use' prefix
simulation-engine.ts       // services    → kebab-case
calculation.ts             // helpers     → kebab-case
simulation.types.ts        // types       → kebab-case with '.types' suffix

// Variables and functions
const userId = '123'       // camelCase
function calculateImpact() // camelCase
const MAX_ROUNDS = 15      // UPPER_SNAKE_CASE for constants

// Types, interfaces and classes
interface User {}                         // PascalCase
type SessionStatus = 'active' | 'paused'  // PascalCase
enum DecisionCategory {}                  // PascalCase
class SimulationEngine {}                 // PascalCase
```

### Import Order

```typescript
import { useState }     from 'react'                       // 1. External
import { prisma }       from '@/lib/prisma'                // 2. Config/lib
import { Button }       from '@/components'                // 3. UI Components
import { useAuth }      from '@/modules/auth'              // 4. Modules
import type { Session } from '@/modules/simulation/types'  // 5. Types
```

### Component Patterns

```typescript
// ✅ Server Component by default
export default async function SimulationDashboard({ params }: Props) {
  const session = await getSession()
  return <div>...</div>
}

// ✅ Client Component only when there is real interactivity
'use client'
export function DecisionForm() {
  const [state, setState] = useState()
  return <form>...</form>
}

// ✅ Custom hook when the component exceeds ~80 lines of JSX
export function useSimulationState(sessionId: string) {
  return useQuery({
    queryKey: ['simulation', sessionId],
    queryFn: () => api.simulation.getSession.query({ sessionId }),
  })
}
```

### tRPC Conventions

```typescript
import { procedure, router } from '@/trpc/init'
import { tryCatch }          from '@/shared/utils'
import { authSchema }        from '@/modules/auth/schema'
import type { User }         from '@/modules/auth/types'

// - Schema always from the module folder
// - ctx.db is the Prisma client injected by context
// - APIResult<T> is the standard response type
// - tryCatch wraps operations that can fail
// - Success/error messages live in @/lib/i18n/lang (never inline)

signUpWithEmail: procedure
  .input(authSchema)
  .mutation<APIResult<User>>(async ({ ctx, input }) => {
    const { email, password } = input

    const user = await ctx.db.user.findUnique({ where: { email } })
    if (user) {
      return { data: null, status: 'error', message: 'auth/email_already_exists', code: 409 }
    }

    const hashedPassword = await hash(password, 10)
    const { data, error } = await tryCatch(
      ctx.db.user.create({ data: { email, password: hashedPassword } })
    )

    if (error) return { data: null, message: 'error/unknown_error', status: 'error', code: 500, error }
    return { data: data as User, status: 'success', message: 'auth/account_created', code: 201 }
  }),
```

### Route System

- Always use the centralized route system with typed `RouteParams`.
- **Never** build routes with direct string literals.
- Respect the hierarchy: `org → workspace → resource`.

---

## Non-Functional Requirements

### Security

- Multi-tenancy with strict isolation by `organizationId`
- Zod validation on all tRPC inputs
- Sanitization of user-generated content
- Never expose internal errors to the client

### Performance

- Redis for active session state
- Optimistic UI updates (don't wait for the backend to reflect changes)
- Always paginate large lists
- Verified indexes on frequently filtered columns

### Scalability

- Stateless API routes (no in-memory session state)
- Background jobs with Bull for long-running processes
- WebSockets with isolated namespaces per session

### Real-time

- One WebSocket namespace per active session
- Multi-user synchronization with conflict resolution in the StateManager
- Chat integrated within the simulation channel

---

# PART 4 · WORK PROTOCOL

---

## PHASE 0 — MANDATORY ORIENTATION

> **Execute ALWAYS at the start of any task, without exception.**

### 0.1 · Read the development plan

Look for files like `PLAN.md`, `ROADMAP.md`, `TODO.md`, `docs/plan.md`, or similar.

If it exists, identify:

- Which features are pending and what is the current priority?
- Are there documented architecture decisions that must be respected?

If it **does not exist**, report it and proceed with the requested task.

### 0.2 · Validate the current state

- Review the files relevant to the current task.
- Identify existing patterns (naming, folder structure, exports, hooks).
- Detect partial or incomplete related implementations.
- **Never assume** — read the real code before acting.

### 0.3 · Apply available Skills

Before proceeding, identify and read the skills applicable to the task:

| Skill | When to apply it |
| --- | --- |
| `brainstorming` | When the solution is not obvious or there are multiple valid approaches. Use it in Phase 1 before committing to an approach. |
| `vercel-react-best-practices` | Before writing any React component or configuring Next.js. This skill is the source of truth for App Router patterns. |
| `web-design-guidelines` | Before implementing any visual component. This skill defines the project's design standard. |

> Skills in `/mnt/skills/` complement this document. In case of conflict, the skill takes precedence over the general rules in this file, except for Ascendia-specific conventions (multi-tenancy, route system, tRPC patterns).

---

## PHASE 1 — ANALYSIS AND PLANNING

Before implementing, explicitly answer these questions:

1. **What is being built?** — Describe the feature in your own words.
2. **Where does it live in the architecture?** — Route, module, context (org / workspace).
3. **Which existing files will be modified?** — Complete list with paths.
4. **Which new files will be created?** — With their exact path.
5. **Are there dependencies or side effects?** — Routes, stores, types, etc.
6. **Are there existing patterns in the project to follow?** — Cite concrete examples.
7. **What is the correct UI pattern?** — Apply the decision tree from Phase 3.

> If the solution has multiple valid approaches and is not obvious, apply the `brainstorming` skill here before continuing.

Do not proceed to implementation until this analysis is complete.

---

## PHASE 2 — CODE STANDARDS

### General Principles

- **Consistency over personal preference** — If the project uses a pattern, use it.
- **Read before writing** — Examine existing files to understand local conventions.
- **No dead code** — Don't leave `console.log`, unused imports, or commented-out code.
- **Strict TypeScript** — Explicit types always. No `any`.

### Next.js and React

> **Apply the `vercel-react-best-practices` skill** before writing components or configuring routes. This skill is the source of truth for App Router conventions, Server/Client Components, and data fetching patterns.

Ascendia-specific conventions that complement the skill:

- Server Components by default; Client Components only when there is real interactivity.
- Extract logic to custom hooks when the component exceeds ~80 lines of JSX.
- One component = one responsibility.
- Use the centralized route system with typed `RouteParams` (never string literals).

### Structure and Organization

- Respect the existing folder structure (see Part 3).
- Place each file exactly where the project expects it.
- Follow the project's casing conventions without deviation.

---

## PHASE 3 — UI ARCHITECTURE AND INTERACTION PATTERNS

Defines **how and where** each feature is presented. Apply these rules before writing any visual component.

### 3.1 · Form Rule

Complexity determines the container:

#### MODAL — Small forms (≤ 3 fields)

Use it when:

- The form has **3 fields or fewer**.
- The action is one-off and requires no additional context.
- The user does not need to navigate elsewhere to complete it.

Quality criteria:

- Clear title that describes the action (not the entity).
- A single primary CTA; cancel always available.
- Inline validation, never in alerts/toasts.
- The modal must not scroll — if it needs to scroll, the form is too large for a modal.
- Auto-close on success + feedback (toast/badge).

✅ Examples: "Create workspace" (name) · "Rename element" · "Invite member" (email + role)

#### DEDICATED PAGE — Complex forms (> 3 fields)

Use it when:

- The form has **more than 3 fields**.
- It requires sections, logical groups, or steps.
- The user needs visual context while filling it in.

Expected route structure:

```
/[organization]/[workspace]/[entity]/new
/[organization]/[workspace]/[entity]/[id]/edit
```

Quality criteria:

- Header with breadcrumb that contextualizes where the user is.
- Fields grouped in sections with descriptive titles.
- Sticky actions at the bottom or in the header — never buried at the end of the scroll.
- Option to save a draft if the form is extensive.
- Clear back navigation with confirmation if there are unsaved changes.

✅ Examples: "Organization settings" · "Create project" (name, description, visibility, members, dates)

---

### 3.2 · Entity Grouping Rule

When multiple features or actions belong to the same entity, **don't scatter them**.

#### CONTEXTUAL ACTIONS (entity without its own page)

- Group actions in a **dropdown menu** or **action bar** associated with the item.
- Each action triggers its own modal (respecting the form rule).
- Destructive actions are visually separated (divider) and require confirmation.

✅ Example: Member card → `[···]` → "Change role" | "Transfer" | ─── | "Delete"

#### TABS — Entity with its own page and multiple aspects

Use them when a **detail page** (`/org/[id]`, `/workspace/[id]`) exists and there are multiple domains related to that entity.

Quality criteria:

- The URL must reflect the active tab: `/org/[id]?tab=members` or `/org/[id]/members`.
- The active tab persists on reload.
- Each tab loads its content independently.
- Tabs with counters show the number next to the label: `Members (12)`.

Tab structure for main entities:

```
Organization
├── General      → Name, logo, base configuration
├── Members      → List + invite (2-field modal) + manage roles
├── Invitations  → Pending + resend + revoke
├── Workspaces   → List + create (modal or page depending on fields)
├── Billing      → Current plan, history, payment methods
└── Danger       → Destructive actions (transfer, delete)

Workspace
├── General      → Name, description, configuration
├── Members      → Members + add from org
├── Permissions  → Roles and access
└── Settings     → Integrations, notifications, danger zone
```

---

### 3.3 · Quick Decision Tree

For any new feature:

```
Is it an action on an existing entity?
│
├── YES → Does a single page exist for that entity?
│          ├── YES → Is it a distinct aspect?     → NEW TAB
│          │         Is it a one-off action?       → ACTION IN THE TAB
│          └── NO  → Does it have a form?
│                     ├── ≤ 3 fields              → MODAL
│                     └── > 3 fields              → DEDICATED PAGE
│
└── NO  → Is it the creation of a new entity?
           ├── ≤ 3 fields                          → MODAL
           └── > 3 fields                          → /new PAGE
```

---

## PHASE 4 — VISUAL DESIGN

> **Apply the `web-design-guidelines` skill** before implementing any visual component. That skill defines the project's design standard.

The following rules are **Ascendia-specific** and complement (without replacing) the skill:

### Project Constraints

- **Mandatory:** Use exclusively the project's UI system components (shadcn/ui + Radix).
- Before creating a visual component, check if it already exists in the UI system.
- Compose system primitives; don't reinvent buttons, inputs, modals, or tabs.

> **Component usage:** UI system components live in `@/shared/components`. shadcn/ui + Radix components are used according to their documentation; reusable components are used coherently with the need (examples: for titles or headings use the `Title` component, for text use the `P` component, for icons use `Icon` with its variants).

### System Tokens

- Semantic colors: `--primary`, `--muted`, `--destructive`, `--background`, etc.
- Spacing based on the project's Tailwind tokens (no arbitrary values).
- Typographic scale defined in the project — don't invent sizes.

### Required States

All interactive elements must implement: `default` · `hover` · `focus` · `disabled` · `loading`.

### Responsiveness

- Every component must work on mobile, tablet, and desktop.
- Modals on mobile occupy the full screen (bottom sheet or full modal).
- Tabs on mobile collapse to a selector/dropdown if they don't fit.

### Empty and Error States

- Empty states: illustration/icon + actionable copy (never leave blank).
- Error states: clear cause + concrete action to resolve it.
- Loading states: skeletons over spinners whenever possible.

---

## PHASE 5 — IMPLEMENTATION PROCESS

### Order of Work

1. Complete Phase 0 (read plan, existing code, and relevant skills).
2. Complete Phase 1 (written analysis before writing code).
3. Decide the correct UI pattern (Phase 3) and document it.
4. Implement types/interfaces first if applicable.
5. Implement logic (hooks, server actions, helpers).
6. Implement UI on top of the ready logic.
7. Verify integration with the route system and the contextual sidebar.

### Delivery Checklist

- [ ] The development plan and current state of implementations were read.
- [ ] Relevant skills were identified and applied (`brainstorming`, `vercel-react-best-practices`, `web-design-guidelines`).
- [ ] The correct UI pattern was chosen with explicit justification.
- [ ] UI system components were used — no visual element was reinvented.
- [ ] Actions belonging to the same entity are grouped coherently.
- [ ] All visual states are implemented (`default`, `hover`, `focus`, `disabled`, `loading`).
- [ ] Types are correct and complete (no `any`).
- [ ] The route system is used correctly with `RouteParams`.
- [ ] No unused imports, `console.log`, or commented-out code.
- [ ] Multi-tenant isolation is applied in all queries (`organizationId`).

---

# PART 5 · BEHAVIOR AND COMMUNICATION

## What you ALWAYS do

- Report what you found in the development plan before acting.
- Explicitly state which UI pattern you chose and why.
- Briefly explain your architecture decision if it is not obvious.
- Ask ONE single concrete question if something is ambiguous — before proceeding.
- List which files you created/modified at the end with a clear list.

## What you NEVER do

- Assume the project structure without reading it first.
- Create visual components without using the project's UI system.
- Skip Phase 0 because it "seems simple."
- Build routes as string literals.
- Mix actions from different entities without coherent grouping.
- Put complex forms in modals or simple forms in dedicated pages.
- Scatter features of one entity across different places in the UI.
- Deliver code with `any`, dead imports, or `console.log`.
- Ignore available skills before implementing.

---

## UX Writing — Product Tone

**Goal:** Speak like a human coach — empathetic, direct, and with genuine curiosity.

| ✅  | Warm but professional           |
| --- | ------------------------------- |
| ✅  | Accompanying, not authoritative |
| ✅  | Reflective but light            |
| ✅  | Positive without overdoing it   |

```typescript
// ✅ CORRECT
const messages = {
  decisionSaved: "Decision recorded! We'll see its impact at the end of the round.",
  roundComplete: "Round complete. Let's see how you did as a team...",
  lowResources:  "Resources are dropping fast. Time to collaborate 🤝",
  aiSuggestion:  "I've noticed an interesting pattern. Want me to show you?",
}

// ❌ INCORRECT
const messages = {
  decisionSaved: 'Decision registered successfully in database.',
  roundComplete: 'Round status updated to completed.',
  lowResources:  'Resource threshold warning triggered.',
  aiSuggestion:  'Pattern detected. Click here for analysis.',
}
```

---

# TODOS

## Task Tracking Structure

```
Name:         task name (file name)
Description:  concise description of the task to perform
MVP Phase:    phase number from the implementation plan
Dependencies: tasks or modules that must be ready first
```

## MVP Implementation Plan

### PHASE 1 · Simulation Engine Foundations
- [ ] Prisma schema for simulations
- [ ] Unified Simulation Engine (SimulationEngine)
- [ ] Basic StateManager
- [ ] Base tRPC routers

### PHASE 2 · Scenario System
- [ ] ScenarioFactory with templates
- [ ] Supply Chain scenario implemented
- [ ] EventGenerator with dynamic crises
- [ ] ScoringCalculator for competencies

### PHASE 3 · Round and Decision System
- [ ] RoundManager with evolutionary phases
- [ ] TimerManager with notifications
- [ ] Decision system with validation
- [ ] Decision persistence

### PHASE 4 · Modes (MVP Core)
- [ ] AI Virtual Team with NPCs
- [ ] IndividualEvaluationSystem
- [ ] IndividualDebriefSystem
- [ ] Complete individual flow

### PHASE 5 · Real-time and Events
- [ ] Advanced EventGenerator with complex triggers
- [ ] WebSocket system (Socket.IO per session)
- [ ] Real-time event impact in UI
- [ ] Real-time notifications
- [ ] Redis caching and optimization

### PHASE 6 · Management Dashboard
- [ ] Workspace view for simulations
- [ ] Real-time session monitor
- [ ] Flow control (pause / resume)

### PHASE 7 · Internationalization and Polish
- [ ] i18n for all modules (ES / EN)
- [ ] Performance optimization
- [ ] Complete testing
- [ ] Basic reports and export
- [ ] Final documentation
