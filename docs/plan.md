# 🚀 Plan de Desarrollo Completo — Ascendia Simulation Platform

> **Última actualización**: 2026-03-19
> **Estado**: Aprobado y listo para implementar
> **Contexto del proyecto**: Ver [AGENTS.md](../AGENTS.md) para contexto completo del producto solo si la tarea lo requiere

---

## 📊 Estado Actual del Proyecto

### ✅ Implementado

| Módulo            | Descripción                                               |
| ----------------- | --------------------------------------------------------- |
| `auth`            | Better Auth (credentials + OAuth), sesiones, verificación |
| `email`           | Templates con React Email + Resend                        |
| `onboarding`      | Flujo de primer ingreso, creación de organizacion         |
| `organization`    | CRUD de organizaciones (create, edit, delete, getAll)     |
| `private`         | Dashboard principal, layout, overview                     |
| Shared Components | 45 componentes (Button, Dialog, Form, Table, etc.)        |
| i18n              | next-intl configurado (EN)                                |
| tRPC              | Router, context, client/server, superjson                 |

---

## 🧪 Convenciones de Código

Antes de implementar cualquier fase, **debes estudiar los patrones existentes** en los módulos implementados. Aquí un resumen:

### Estructura de módulo (Screaming Architecture)

```
src/modules/<nombre>/
├── components/       # UI — Server Components por defecto, 'use client' solo si necesario
├── helpers/          # Funciones puras y utilitarios
├── hooks/            # React hooks (prefijo 'use-')
├── router/           # tRPC endpoints (index.ts)
├── schema/           # Zod validation schemas (index.ts)
└── types/            # TypeScript types/interfaces (index.ts)
```

### Patrón de Router tRPC

```typescript
import { params, procedure, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import { mySchema } from "@/modules/<nombre>/schema";
import type { MyType } from "@prisma/client";

export const myRouter = router({
  create: procedure.input(mySchema).mutation<APIResult<MyType>>(async ({ ctx, input }) => {
    const { data, error } = await tryCatch(
      ctx.db.<model>.create({ data: { ... } })
    );
    if (error || !data) {
      return { data: null, status: "error", message: "error_key", code: 500 };
    }
    return { data, status: "success", message: "success_key", code: 200 };
  }),
});
```

**Reglas clave:**

- `ctx.db` es el Prisma client
- `ctx.userId`, `ctx.tenantId`, `ctx.organizationId` disponibles en contexto
- `APIResult<T>` es el tipo de respuesta estándar
- `tryCatch()` wrappea promesas de Prisma
- Los mensajes (`message`) son claves de traducción de `@/lib/i18n`
- Los routers nuevos se registran en `src/trpc/router.ts`

### Patrón de Schema Zod

```typescript
import { z } from "zod";

export const mySchema = z.object({
  name: z.string().min(1, { message: "required" }),
  // ...
});

export type MySchema = z.infer<typeof mySchema>;
```

### Patrón de Componentes

```typescript
// Server Component (por defecto)
export default async function MyPage({ params }: Props) {
  const session = await getSession();
  return <div>...</div>;
}

// Client Component (solo cuando necesario)
'use client';
export function MyInteractiveComponent() {
  const t = useTranslations("namespace");
  const { data } = trpc.myRouter.getAll.useQuery();
  // or useSuspenseQuery() si es un componente de listado en pagina
  // ...
}
```

### Naming conventions

- **Archivos**: kebab-case (`decision-form.tsx`, `use-simulation-timer.ts`)
- **Variables/funciones**: camelCase
- **Tipos/interfaces/clases**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE
- **Import order**: Externos → lib → Componentes UI → Modules → Types

### UX Writing

Todos los mensajes deben seguir tono de coach empático (ver AGENTS.md sección "Marco de Comunicación").

---

## 🎮 FASE 1: Motor de Simulación Core

> **Estimación**: 4–6 semanas

### 1.1 Prisma Schema

Agregar a `prisma/schema.prisma`:

```prisma
enum ScenarioType {
  SUPPLY_CHAIN
  MARKETING
  OUTSOURCING
  CUSTOM
}

enum ScenarioDifficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

model Scenario {
  id          String             @id @default(cuid())
  name        String
  slug        String             @unique
  description String             @db.Text
  category    ScenarioType
  difficulty  ScenarioDifficulty
  maxPlayers  Int                @default(4)
  totalRounds Int                @default(15)
  isTemplate  Boolean            @default(false)
  status      Status             @default(ACTIVE)
  config      Json?
  createdById String?
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  simulation Simulation[]

  @@index([category])
  @@index([slug])
  @@map("scenario")
}

enum SimulationMode {
  INDIVIDUAL
  GRUPAL
}

enum SessionStatus {
  WAITING
  SCHEDULED
  IN_PROGRESS
  PAUSED
  COMPLETED
  CANCELLED
}

model Simulation {
  id              String         @id @default(cuid())
  code            String         @unique
  name            String
  description     String?
  scenarioId      String
  mode            SimulationMode
  status          SessionStatus  @default(SCHEDULED)
  scheduledFor    DateTime
  maxParticipants Int            @default(16)
  roundDuration   Int            @default(10) // minutos
  timeSession     Int            @default(180) // 3 horas
  currentRound    Int            @default(0)
  globalResources Json
  startedAt       DateTime?
  completedAt     DateTime?
  workspaceId     String
  organizationId  String
  createdBy       String
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  scenario  Scenario  @relation(fields: [scenarioId], references: [id], onDelete: Cascade)
  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [createdBy], references: [id])

  rounds       Round[]
  insights     Insight[]
  player       Player[]
  resources    Resource[]
  chatMessages ChatMessage[]

  @@index([workspaceId, status])
  @@index([code])
  @@map("simulation")
}

enum PlayerRole {
  LEADER
  COORDINATOR
  SPECIALIST
  OBSERVER
  ANALYST
  AI_TEAMMATE
}

model Player {
  id           String     @id @default(cuid())
  userId       String
  displayName  String
  color        String
  simulationId String
  role         PlayerRole
  roleConfig   Json?
  isNPC        Boolean    @default(false)
  npcProfile   Json?
  joinedAt     DateTime   @default(now())
  leftAt       DateTime?
  finalScore   Float?
  competencies Json?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  user       User       @relation(fields: [userId], references: [id])
  simulation Simulation @relation(fields: [simulationId], references: [id], onDelete: Cascade)

  decisions    Decision[]
  insights     Insight[]
  evaluations  Evaluation[]
  chatMessages ChatMessage[]

  @@unique([simulationId, userId])
  @@index([userId])
  @@map("participant")
}

enum RoundPhase {
  INDIVIDUAL_DECISIONS
  LIMITED_COMMUNICATION
  OPEN_NEGOTIATION
  SYSTEMIC_CRISIS
  COLLABORATIVE_RECOVERY
}

enum RoundStatus {
  PENDING
  ACTIVE
  PROCESSING
  COMPLETED
}

model Round {
  id             String      @id @default(cuid())
  roundNumber    Int
  phase          RoundPhase
  status         RoundStatus @default(PENDING)
  simulationId   String
  timeLimit      Int?
  startedAt      DateTime
  endedAt        DateTime?
  resourcesStart Json
  resourcesEnd   Json
  createdAt      DateTime    @default(now())

  simulation Simulation @relation(fields: [simulationId], references: [id], onDelete: Cascade)

  events    Events[]
  decisions Decision[]

  @@unique([simulationId, roundNumber])
  @@index([simulationId])
  @@map("round")
}

enum EventType {
  RESOURCE_CRISIS
  INTERPERSONAL
  EXTERNAL
  OPERATIONAL
  REGULATORY
  MARKET_SHIFT
  TECHNOLOGY
}

enum EventSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

model Events {
  id          String        @id @default(cuid())
  roundId     String
  type        EventType
  severity    EventSeverity
  title       String
  description String        @db.Text
  impact      Json
  triggeredAt DateTime      @default(now())

  round Round @relation(fields: [roundId], references: [id], onDelete: Cascade)

  @@index([roundId])
  @@map("events")
}

enum DecisionCategory {
  RESOURCE_ALLOCATION
  STRATEGIC_POSITIONING
  PARTNERSHIP
  OPERATIONAL
  FINANCIAL
  INNOVATION
  COMMUNICATION
}

model Decision {
  id           String           @id @default(cuid())
  roundId      String
  playerId     String
  category     DecisionCategory
  action       Json
  intention    String?
  resourceCost Json
  submittedAt  DateTime         @default(now())

  round       Round  @relation(fields: [roundId], references: [id], onDelete: Cascade)
  participant Player @relation(fields: [playerId], references: [id], onDelete: Cascade)

  impacts DecisionImpact[]

  @@index([roundId])
  @@index([playerId])
  @@map("decision")
}

model DecisionImpact {
  id              String   @id @default(cuid())
  decisionId      String
  shortTermImpact Json
  longTermImpact  Json
  systemicImpact  Json
  competencies    Json
  createdAt       DateTime @default(now())

  decision Decision @relation(fields: [decisionId], references: [id], onDelete: Cascade)

  @@map("decision_impact")
}

model Resource {
  id               String   @id @default(cuid())
  roundNumber      Int
  resourceType     String
  currentLevel     Float
  maxCapacity      Float
  regenerationRate Float
  simulationId     String
  utilization      Float
  depletion        Float
  recordedAt       DateTime @default(now())

  simulation Simulation @relation(fields: [simulationId], references: [id], onDelete: Cascade)

  @@index([simulationId, roundNumber])
  @@map("resource")
}
```

### 1.2 Módulo `simulation`

```
src/modules/simulation/
├── components/
│   ├── simulation-form.tsx
│   ├── simulation-list.tsx
│   ├── simulation-card.tsx
│   ├── simulation-lobby.tsx
│   ├── simulation-board.tsx
│   ├── simulation-header.tsx
│   ├── simulation-resource-panel.tsx
│   └── simulation-player-list.tsx
├── helpers/
│   ├── simulation-engine.ts      # SimulationEngine class
│   ├── state-manager.ts          # StateManager (estado global + historial)
│   ├── event-generator.ts        # EventGenerator (crisis + triggers)
│   ├── resource-calculator.ts
│   └── async-flow.ts             # Flujo asincrónico modo INDIVIDUAL
├── hooks/
│   ├── use-simulation.ts
│   ├── use-simulation-state.ts
│   └── use-simulation-timer.ts
├── router/
│   └── index.ts                  # create, start, pause, resume, cancel, getById, getByWorkspace, joinAsPlayer, addNPC, updatePlayerRole
├── schema/
│   └── index.ts
└── types/
    └── index.ts
```

### 1.3 Módulo `round`

```
src/modules/round/
├── components/
│   ├── round-header.tsx
│   ├── round-timeline.tsx
│   ├── round-events.tsx
│   ├── round-transition.tsx
│   └── round-summary.tsx
├── helpers/
│   ├── round-rules.ts
│   ├── phase-calculator.ts
│   └── event-triggers.ts
├── router/
│   └── index.ts
├── schema/
│   └── index.ts
└── types/
    └── index.ts
```

### 1.4 Módulo `decision`

```
src/modules/decision/
├── components/
│   ├── decision-form.tsx
│   ├── decision-card.tsx
│   ├── decision-history.tsx
│   ├── decision-impact-view.tsx
│   └── decision-compare.tsx
├── helpers/
│   ├── impact-calculator.ts
│   └── decision-validator.ts
├── router/
│   └── index.ts
├── schema/
│   └── index.ts
└── types/
    └── index.ts
```

### 1.5 Módulo `resource`

```
src/modules/resource/
├── components/
│   ├── resource-dashboard.tsx
│   ├── resource-gauge.tsx
│   ├── resource-history-chart.tsx
│   └── resource-alert.tsx
├── helpers/
│   ├── resource-engine.ts
│   └── resource-thresholds.ts
├── types/
│   └── index.ts
```

### 1.6 Rutas App Router

```
src/app/[lang]/(private)/[organization]/[workspace]/
├── simulation/[simulationId]/
│   ├── lobby/page.tsx
│   ├── board/page.tsx
│   └── results/page.tsx
```

Actualizar `src/routes/config/index.ts`.

---

## ⚡ FASE 2: Tiempo Real y Comunicación

> **Estimación**: 2–3 semanas

### 2.1 Módulo `realtime`

```
src/modules/realtime/
├── config/
│   └── socket.ts
├── helpers/
│   ├── socket-manager.ts
│   ├── room-manager.ts
│   └── sync-engine.ts
├── hooks/
│   ├── use-socket.ts
│   ├── use-realtime-state.ts
│   └── use-presence.ts
├── types/
│   └── index.ts
```

**Eventos Socket.IO:**

- `simulation:state` (S→C), `round:start/end` (S→C), `decision:submitted` (C→S), `decision:broadcast` (S→C), `resource:update` (S→C), `event:triggered` (S→C), `player:joined/left` (S→C), `player:role-changed` (S→C)

### 2.2 Prisma Schema — ChatMessage

```prisma
enum MessageType {
  TEXT
  SYSTEM
  AI_SUGGESTION
}

model ChatMessage {
  id           String      @id @default(cuid())
  simulationId String
  senderId     String
  content      String
  type         MessageType @default(TEXT)
  createdAt    DateTime    @default(now())

  simulation Simulation @relation(fields: [simulationId], references: [id], onDelete: Cascade)
  sender     Player     @relation(fields: [senderId], references: [id])

  @@index([simulationId])
  @@map("chat_message")
}
```

### 2.3 Módulo `chat`

```
src/modules/chat/
├── components/
│   ├── chat-panel.tsx
│   ├── chat-message.tsx
│   ├── chat-input.tsx
│   └── chat-system-message.tsx
├── hooks/
│   └── use-chat.ts
├── types/
│   └── index.ts
```

**Restricciones por fase de ronda:** R1-3 sin chat, R4-6 limitado, R7-15 abierto.

---

## 🧠 FASE 3: Evaluación y Competencias

> **Estimación**: 3–4 semanas

### 3.1 Prisma Schema

```prisma
enum EvaluationType {
  SYSTEMIC_THINKING
  ADAPTIVE_LEADERSHIP
  EFFECTIVE_COMMUNICATION
  LONG_TERM_VISION
  EMOTIONAL_INTELLIGENCE
  STRATEGIC_PARTNERSHIP
  RISK_MANAGEMENT
  INNOVATION_ADOPTION
  OPERATIONAL_EXCELLENCE
  ECOSYSTEM_LEADERSHIP
}

model Evaluation {
  id           String         @id @default(cuid())
  playerId     String
  competency   EvaluationType
  initialScore Float?
  currentScore Float
  targetScore  Float?
  evidence     Json
  roundNumber  Int
  calculatedAt DateTime       @default(now())

  participant Player @relation(fields: [playerId], references: [id], onDelete: Cascade)

  @@index([playerId, competency])
  @@map("evaluation")
}

model Benchmark {
  id             String   @id @default(cuid())
  userId         String
  organizationId String
  totalSims      Int      @default(0)
  avgScore       Float    @default(0)
  bestScore      Float    @default(0)
  percentile     Float?
  dimensions     Json
  updatedAt      DateTime @updatedAt

  user         User         @relation(fields: [userId], references: [id])
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
  @@map("benchmark")
}

```

### 3.2 Módulo `evaluation`

```
src/modules/evaluation/
├── components/
│   ├── evaluation-dashboard.tsx
│   ├── evaluation-radar.tsx
│   ├── evaluation-comparison.tsx
│   ├── evaluation-timeline.tsx
│   ├── evaluation-benchmark.tsx
│   └── evaluation-export.tsx
├── helpers/
│   ├── evaluation-engine.ts
│   ├── score-calculator.ts
│   ├── dimension-weights.ts
│   └── benchmark-calculator.ts
├── router/
│   └── index.ts
├── schema/
│   └── index.ts
└── types/
    └── index.ts
```

### 3.3 Módulo `competency`

```
src/modules/competency/
├── components/
│   ├── competency-profile.tsx
│   ├── competency-evolution.tsx
│   ├── competency-badges.tsx
│   └── competency-radar.tsx
├── helpers/
│   ├── competency-tracker.ts
│   ├── pattern-detector.ts
│   ├── trend-analyzer.ts
│   └── skill-recovery.ts
├── router/
│   └── index.ts
├── schema/
│   └── index.ts
└── types/
    └── index.ts
```

---

## 🤖 FASE 4: Sistema de IA

> **Estimación**: 4–6 semanas

### 4.1 Módulo `ai-coach`

```
src/modules/ai-coach/
├── components/
│   ├── coach-panel.tsx
│   ├── coach-suggestion.tsx
│   ├── coach-insight.tsx
│   ├── coach-pattern-alert.tsx
│   └── coach-intervention.tsx
├── helpers/
│   ├── ai-coach-engine.ts
│   ├── pattern-detector.ts
│   ├── bias-identifier.ts
│   ├── npc-personality.ts
│   ├── predictive-evaluator.ts
│   └── prompt-templates.ts
├── hooks/
│   ├── use-coach.ts
│   └── use-coach-suggestions.ts
├── router/
│   └── index.ts
├── types/
│   └── index.ts
```

### 4.2 Módulo `learning`

```
src/modules/learning/
├── components/
│   ├── learning-card.tsx
│   ├── learning-path.tsx
│   └── learning-questionnaire.tsx
├── helpers/
│   ├── learning-engine.ts
│   ├── intervention-generator.ts
│   └── learning-loop.ts
├── types/
│   └── index.ts
```

---

## 🔄 FASE 5: Replay y Analíticas

> **Estimación**: 2–3 semanas

### 5.1 Módulo `replay`

```
src/modules/replay/
├── components/
│   ├── replay-player.tsx
│   ├── replay-timeline.tsx
│   ├── replay-decision-point.tsx
│   └── replay-comparison.tsx
├── helpers/
│   ├── replay-engine.ts
│   └── alternative-calculator.ts
├── types/
│   └── index.ts
```

### 5.2 Módulo `analytics`

```
src/modules/analytics/
├── components/
│   ├── analytics-dashboard.tsx
│   ├── analytics-kpi-card.tsx
│   ├── analytics-trend-chart.tsx
│   ├── analytics-heatmap.tsx
│   └── analytics-export.tsx
├── helpers/
│   ├── metrics-calculator.ts
│   └── report-generator.ts
├── router/
│   └── index.ts
├── types/
│   └── index.ts
```

---

## 🌐 FASE 6: i18n y Polish

> **Estimación**: 1–2 semanas

- Crear `es.json` completo (todos los módulos)
- Extender `en.json` con todas las claves nuevas
- Todos mensajes siguiendo marco de comunicación coach empático
- Optimistic updates en decisiones y recursos
- Redis caching para estados de simulación
- React Server Components donde sea posible
- Auditoría de accesibilidad (a11y)
- Responsive design para tablets

---

## 📋 Jerarquía Multi-Tenancy

```
organization → workspace → simulation → rounds → decisions
      ↓                        ↓
      members                  players (roles dinámicos)
      invitations              events
                               resources
                               chat
                               evaluations
                               competencies
```

> **Cada query debe filtrar por `organizationId`** para garantizar aislamiento estricto.

---

## 🔍 Verificación por Fase

1. `npm run build` — Sin errores de compilación
2. `npm run lint` — Estándares de código
3. `npx prisma db push` — Schema válido
4. tRPC type check — Tipado end-to-end
5. Browser testing — Flujos completos
6. i18n check — Todas las claves con traducción

### Tests clave

- **F1**: Crear escenario → crear simulación → jugar 15 rondas → decisiones → impactos
- **F2**: 2 tabs simultáneamente → sincronización + chat
- **F3**: Completar simulación → evaluación → competencias → benchmark cross-session
- **F4**: Modo individual + NPCs IA → coaching → evaluación predictiva
- **F5**: Replay → alternativas → exportar reporte
