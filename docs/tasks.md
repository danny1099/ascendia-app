# 📋 Tareas Ascendia — Backlog Priorizado para MVP

> **Generado**: 2026-04-02 · **Fuente**: [plan.md](../docs/plan.md) · **Estado general**: En ejecución
>
> **Leyenda de estado**: `⬜ Pendiente` · `🔄 En progreso` · `✅ Completado` · `🚫 Bloqueado`
>
> **MVP mínimo** = Fases 1 + 2 completas + Fase 3 básica (sin AI Coach ni Replay)

---

## ✅ Ya Implementado (baseline)

| Módulo            | Descripción                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `auth`            | Better Auth: credentials + OAuth, sesiones, verificación de email |
| `email`           | Templates con React Email + Resend                                |
| `onboarding`      | Flujo de primer ingreso, creación de tenant                       |
| `organization`    | CRUD básico: create, edit, delete, getAll                         |
| `main`            | Dashboard principal, layout, overview                             |
| Shared Components | ~45 componentes (Button, Dialog, Form, Table, etc.)               |
| i18n              | next-intl configurado (EN)                                        |
| tRPC              | Router, context, client/server, superjson                         |

---

## 🏗️ FASE 1 — Fundamentos de Plataforma

> **Estimación**: 3–4 semanas · **Prioridad**: 🔴 CRÍTICA (MVP)

### F1-01 · Infraestructura Base: Redis

- **Estado**: ✅ Completado
- **Archivos a crear**:
  - `src/lib/redis/index.ts` — Cliente Redis
  - `src/lib/redis/cache.ts` — Helpers de caché (get, set, del, TTL)
- **Criterio de éxito**: Conexión funcional, helper `cache.ts` usado en al menos 1 query de simulación

---

### F1-2 · Infraestructura Base: Bull (Queue)

- **Estado**: ✅ Completado
- **Archivos a crear**:
  - `src/lib/queue/index.ts` — Configuración de Bull
  - `src/lib/queue/workers/evaluation.ts` — Worker de evaluación (placeholder)
  - `src/lib/queue/workers/ai.ts` — Worker de IA (placeholder)
- **Criterio de éxito**: Queue funcional, emails de invitación encolados y procesados

---

## 🎮 FASE 2 — Motor de Simulación Core

> **Estimación**: 4–6 semanas · **Prioridad**: 🔴 CRÍTICA (MVP)

### F2-01 · Prisma Schema: Simulación Core

- **Estado**: ✅ Completado
- **Archivos a modificar**:
  - `prisma/schema.prisma` — Agregar enums y modelos: `ScenarioType`, `Scenario`, `SimulationStatus`, `SimulationMode`, `Simulation`, `PlayerRole`, `SimulationPlayer`, `RoundPhase`, `RoundStatus`, `Round`, `RoundEvent`, `DecisionCategory`, `Decision`, `DecisionImpact`, `ResourceSnapshot`
- **Acción post-schema**: `npx prisma db push` + `npx prisma generate`
- **Criterio de éxito**: Schema válido, relaciones coherentes con multi-tenancy

---

### F2-02 · Módulo `simulation`: Helpers del motor

- **Estado**: ⬜ Pendiente
- **Archivos a crear** (`src/modules/simulation/helpers/`):
  - `simulation-engine.ts` — `SimulationEngine` class: procesa decisiones, aplica reglas, calcula impactos
  - `state-manager.ts` — `StateManager`: estado global, historial, sync
  - `event-generator.ts` — `EventGenerator`: crisis dinámicas con triggers
  - `resource-calculator.ts` — Lógica de recursos compartidos
  - `async-flow.ts` — Flujo asíncrono modo INDIVIDUAL
- **Criterio de éxito**: Helpers testeables, sin dependencias de UI, lógica de negocio central encapsulada

---

### F2-03 · Módulo `simulation`: Router y Schema

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-01, F2-03
- **Archivos a crear**:
  - `src/modules/simulation/types/index.ts`
  - `src/modules/simulation/schema/index.ts`
  - `src/modules/simulation/router/index.ts` — `create`, `start`, `pause`, `resume`, `cancel`, `getById`, `getByWorkspace`, `joinAsPlayer`, `addNPC`, `updatePlayerRole`
- **Archivos a modificar**: `src/trpc/router.ts`
- **Criterio de éxito**: Todos los mutations tipados y aislados por `workspaceId` → `organizationId`

---

### F2-04 · Módulo `simulation`: Componentes UI

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-04
- **Archivos a crear** (`src/modules/simulation/components/`):
  - `simulation-form.tsx` — Crear simulación (nombre, escenario, modo, jugadores)
  - `simulation-list.tsx`
  - `simulation-card.tsx`
  - `simulation-lobby.tsx` — Sala de espera antes de iniciar
  - `simulation-board.tsx` — Tablero principal durante la simulación
  - `simulation-header.tsx` — Ronda, fase, tiempo restante
  - `simulation-resource-panel.tsx` — Recursos del ecosistema
  - `simulation-player-list.tsx` — Jugadores activos y roles
  - Hooks: `use-simulation.ts`, `use-simulation-state.ts`, `use-simulation-timer.ts`
- **Criterio de éxito**: Lobby funcional + board básico renderizado sin tiempo real (datos mock o polling)

---

### F2-05 · Módulo `round`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-01
- **Archivos a crear** (`src/modules/round/`):
  - `types/index.ts`
  - `schema/index.ts`
  - `router/index.ts` — Gestión de rondas (start, advance, complete)
  - `helpers/round-rules.ts`
  - `helpers/phase-calculator.ts`
  - `helpers/event-triggers.ts`
  - `components/round-header.tsx`
  - `components/round-timeline.tsx`
  - `components/round-events.tsx`
  - `components/round-transition.tsx`
  - `components/round-summary.tsx`
- **Archivos a modificar**: `src/trpc/router.ts`
- **Criterio de éxito**: Transición de rondas funcional, fases calculadas correctamente

---

### F2-06 · Módulo `decision`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-01, F2-03
- **Archivos a crear** (`src/modules/decision/`):
  - `types/index.ts`
  - `schema/index.ts`
  - `router/index.ts` — `submitDecision`, `getDecisionsByRound`, `getDecisionsByPlayer`, `getDecisionImpact`
  - `helpers/impact-calculator.ts`
  - `helpers/decision-validator.ts`
  - `components/decision-form.tsx` — Formulario de toma de decisión en ronda activa
  - `components/decision-card.tsx`
  - `components/decision-history.tsx`
  - `components/decision-impact-view.tsx`
  - `components/decision-compare.tsx`
- **Archivos a modificar**: `src/trpc/router.ts`
- **Criterio de éxito**: Jugador puede enviar decisión, impactos calculados y guardados

---

### F2-07 · Módulo `resource`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-01, F2-03
- **Archivos a crear** (`src/modules/resource/`):
  - `types/index.ts`
  - `helpers/resource-engine.ts` — Motor de recursos compartidos con regeneración
  - `helpers/resource-thresholds.ts` — Umbrales de alerta (crítico, bajo, óptimo)
  - `components/resource-dashboard.tsx`
  - `components/resource-gauge.tsx` — Indicador visual de nivel de recurso
  - `components/resource-history-chart.tsx`
  - `components/resource-alert.tsx` — Alerta cuando recurso cae a crítico
- **Criterio de éxito**: Recursos visibles en tablero, niveles actualizados tras cada decisión

---

### F2-08 · App Router: Rutas de Fase 2

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-05, F2-06, F2-07
- **Archivos a crear** (en `src/app/[lang]/(private)/[tenant]/workspace/[workspaceId]/`):
  - `simulation/[simulationId]/lobby/page.tsx`
  - `simulation/[simulationId]/board/page.tsx`
  - `simulation/[simulationId]/results/page.tsx`
- **Archivos a modificar**: `src/routes/config/index.ts`
- **Criterio de éxito**: Navegación lobby → board → results completa

---

### F2-9 · i18n: Claves de Fase 2

- **Estado**: ⬜ Pendiente
- **Archivos a modificar**:
  - `src/lib/i18n/lang/en.json` — Namespaces: `scenario`, `simulation`, `round`, `decision`, `resource`
- **Criterio de éxito**: Sin claves faltantes

---

## ⚡ FASE 3 — Tiempo Real y Comunicación

> **Estimación**: 2–3 semanas · **Prioridad**: 🟠 ALTA (MVP básico)

### F3-01 · Módulo `realtime`: Configuración Socket.IO

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-04
- **Archivos a crear** (`src/modules/realtime/`):
  - `config/socket.ts` — Setup Socket.IO server con namespaces por sesión
  - `helpers/socket-manager.ts`
  - `helpers/room-manager.ts`
  - `helpers/sync-engine.ts` — Resolución de conflictos multi-usuario
  - `hooks/use-socket.ts`
  - `hooks/use-realtime-state.ts`
  - `hooks/use-presence.ts`
  - `types/index.ts`
- **Eventos a implementar**: `simulation:state`, `round:start`, `round:end`, `decision:submitted`, `decision:broadcast`, `resource:update`, `event:triggered`, `player:joined`, `player:left`, `player:role-changed`
- **Criterio de éxito**: 2 tabs sincronizadas en la misma simulación sin drift de estado

---

### F3-02 · Prisma Schema: ChatMessage

- **Estado**: ⬜ Pendiente
- **Archivos a modificar**: `prisma/schema.prisma` — Agregar modelo `ChatMessage` con relaciones a `Simulation` y `SimulationPlayer`
- **Acción**: `npx prisma db push` + `npx prisma generate`

---

### F3-03 · Módulo `chat`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F3-01, F3-02
- **Archivos a crear** (`src/modules/chat/`):
  - `types/index.ts`
  - `hooks/use-chat.ts`
  - `components/chat-panel.tsx`
  - `components/chat-message.tsx`
  - `components/chat-input.tsx`
  - `components/chat-system-message.tsx` — Para eventos del sistema y sugerencias IA
- **Reglas de negocio**: R1-3 sin chat, R4-6 limitado (solo mensajes de texto), R7-15 abierto
- **Criterio de éxito**: Chat funcional integrado en el board, restringido por fase

---

## 🧠 FASE 4 — Evaluación y Competencias

> **Estimación**: 3–4 semanas · **Prioridad**: 🟡 MEDIA (post-MVP)

### F4-01 · Prisma Schema: Evaluación y Competencias

- **Estado**: ⬜ Pendiente
- **Archivos a modificar**: `prisma/schema.prisma` — Modelos: `Evaluation`, `Benchmark`, `CompetencyType` (enum), `CompetencyScore`
- **Acción**: `npx prisma db push` + `npx prisma generate`

---

### F4-02 · Módulo `evaluation`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F4-01, F2-07
- **Archivos a crear** (`src/modules/evaluation/`):
  - `types/index.ts`, `schema/index.ts`, `router/index.ts`
  - `helpers/evaluation-engine.ts` — `EvaluationEngine` class
  - `helpers/score-calculator.ts`
  - `helpers/dimension-weights.ts`
  - `helpers/benchmark-calculator.ts`
  - `components/evaluation-dashboard.tsx`
  - `components/evaluation-radar.tsx` — Radar chart de 5 competencias
  - `components/evaluation-comparison.tsx`
  - `components/evaluation-timeline.tsx`
  - `components/evaluation-benchmark.tsx`
  - `components/evaluation-export.tsx`
- **Archivos a modificar**: `src/trpc/router.ts`

---

### F4-03 · Módulo `competency`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F4-01, F4-02
- **Archivos a crear** (`src/modules/competency/`):
  - `types/index.ts`, `schema/index.ts`, `router/index.ts`
  - `helpers/competency-tracker.ts` — `CompetencyTracker` class
  - `helpers/pattern-detector.ts`
  - `helpers/trend-analyzer.ts`
  - `helpers/skill-recovery.ts`
  - `components/competency-profile.tsx`
  - `components/competency-evolution.tsx`
  - `components/competency-badges.tsx`
  - `components/competency-radar.tsx`
- **Archivos a modificar**: `src/trpc/router.ts`

---

## 🤖 FASE 5 — Sistema de IA

> **Estimación**: 4–6 semanas · **Prioridad**: 🟡 MEDIA (post-MVP)

### F5-01 · Módulo `ai-coach`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F4-02, F4-03, F3-01
- **Archivos a crear** (`src/modules/ai-coach/`):
  - `types/index.ts`
  - `router/index.ts`
  - `helpers/ai-coach-engine.ts`
  - `helpers/pattern-detector.ts`
  - `helpers/bias-identifier.ts`
  - `helpers/npc-personality.ts` — Perfiles de NPCs para modo Individual
  - `helpers/predictive-evaluator.ts`
  - `helpers/prompt-templates.ts`
  - `hooks/use-coach.ts`
  - `hooks/use-coach-suggestions.ts`
  - `components/coach-panel.tsx`
  - `components/coach-suggestion.tsx`
  - `components/coach-insight.tsx`
  - `components/coach-pattern-alert.tsx`
  - `components/coach-intervention.tsx`
- **Archivos a modificar**: `src/trpc/router.ts`

---

### F5-02 · Módulo `learning`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F5-01
- **Archivos a crear** (`src/modules/learning/`):
  - `types/index.ts`
  - `helpers/learning-engine.ts` — `LearningEngine` class
  - `helpers/intervention-generator.ts`
  - `helpers/learning-loop.ts` — Loop: decisión → evaluación → insight → intervención
  - `components/learning-card.tsx`
  - `components/learning-path.tsx`
  - `components/learning-questionnaire.tsx`

---

## 🔄 FASE 6 — Replay y Analíticas

> **Estimación**: 2–3 semanas · **Prioridad**: 🟢 BAJA (post-MVP)

### F6-01 · Módulo `replay`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F2-07, F4-02
- **Archivos a crear** (`src/modules/replay/`):
  - `types/index.ts`
  - `helpers/replay-engine.ts` — `ReplayEngine` class
  - `helpers/alternative-calculator.ts` — Calcular decisiones alternativas
  - `components/replay-player.tsx`
  - `components/replay-timeline.tsx`
  - `components/replay-decision-point.tsx`
  - `components/replay-comparison.tsx`

---

### F6-02 · Módulo `analytics`: Scaffold completo

- **Estado**: ⬜ Pendiente
- **Depende de**: F4-02, F4-03
- **Archivos a crear** (`src/modules/analytics/`):
  - `types/index.ts`
  - `router/index.ts`
  - `helpers/metrics-calculator.ts`
  - `helpers/report-generator.ts`
  - `components/analytics-dashboard.tsx`
  - `components/analytics-kpi-card.tsx`
  - `components/analytics-trend-chart.tsx`
  - `components/analytics-heatmap.tsx`
  - `components/analytics-export.tsx`
- **Archivos a modificar**: `src/trpc/router.ts`

---

## 🌐 FASE 7 — i18n y Polish

> **Estimación**: 1–2 semanas · **Prioridad**: 🟢 BAJA (post-MVP)

### F7-01 · Internacionalización completa

- **Estado**: ⬜ Pendiente
- **Archivos a crear/modificar**:
  - `src/lib/i18n/lang/es.json` — Español completo para todos los módulos
  - `src/lib/i18n/lang/en.json` — Revisar y completar todas las claves faltantes
- **Criterio de éxito**: Sin missing keys en build para EN y ES

---

### F7-02 · Performance y Optimización

- **Estado**: ⬜ Pendiente
- **Tareas**:
  - Implementar optimistic updates en decisiones y recursos
  - Redis caching activo para estados de simulación activos
  - Auditar uso de React Server Components (mover lógica de cliente al servidor donde sea posible)
  - Verificar índices de Prisma en columnas de alto tráfico

---

### F7-03 · Accesibilidad y Responsive

- **Estado**: ⬜ Pendiente
- **Tareas**:
  - Auditoría a11y completa (axe, VoiceOver, NVDA)
  - Responsive en tablets (breakpoint `md`)
  - Modales como bottom sheet en mobile
  - Tabs colapsables en mobile para workspace/org

---

## 🗺️ Resumen de Dependencias (MVP Critical Path)

```
F1-06 (Prisma Workspace)
  └─ F1-07 (módulo workspace)
       └─ F1-11 (rutas Fase 1)

F2-01 (Prisma Simulación)
  ├─ F2-02 (módulo scenario)
  ├─ F2-03 (helpers engine)
  │    └─ F2-04 (router simulation)
  │         └─ F2-05 (UI simulation)
  ├─ F2-06 (módulo round)
  ├─ F2-07 (módulo decision)
  └─ F2-08 (módulo resource)
       └─ F2-09 (rutas Fase 2)
            └─ F3-01 (realtime Socket.IO)
                 └─ F3-03 (módulo chat)
```

---

## ✅ Checklist de Verificación por Fase

| Check                | Descripción                                    |
| -------------------- | ---------------------------------------------- |
| `npm run build`      | Sin errores de compilación TypeScript          |
| `npm run lint`       | Sin violaciones de ESLint/Prettier             |
| `npx prisma db push` | Schema válido y migraciones aplicadas          |
| tRPC typecheck       | Tipado end-to-end sin `any`                    |
| Browser testing      | Flujos completos navegados manualmente         |
| i18n check           | Sin claves faltantes en build                  |
| Multi-tenancy        | Queries siempre filtradas por `organizationId` |
