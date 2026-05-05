# Ascendia — Plan de Desarrollo

> **Versión:** 1.0 · **Creado:** Mayo 2026 · **Estado:** Activo

---

## 1. Visión General

Ascendia es una plataforma SaaS de simulación de liderazgo y toma de decisiones basada en ecosistemas de recursos compartidos. Este plan define las etapas de desarrollo priorizando un **MVP funcional del modo Individual** (usuario + NPCs con reglas), con los 3 escenarios base y 10 rondas por simulación.

### Decisiones del Plan

| Decisión         | Opción                                      | Justificación                                                                                        |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Modo MVP         | Individual (Usuario + NPCs)                 | No requiere WebSockets ni sincronización multiusuario. Valida el motor completo primero.             |
| Escenarios       | Supply Chain, Retail Marketing, Outsourcing | Los 3 mocks ya existen con configs completas. ScenarioFactory consume mocks directamente.            |
| Nivel de IA MVP  | NPCs con reglas (sin LLM)                   | Predecible, sin costos de API, suficiente para validar el flujo completo.                            |
| Rondas MVP       | 10 rondas                                   | Cubre 4 de 5 fases evolutivas (Individual → Comunicación Limitada → Negociación → Crisis Sistémica). |
| UI de Escenarios | Se conserva la existente, sin UI nueva      | Se dejará para iteración posterior. ScenarioFactory consume mocks en tiempo de ejecución.            |

### Estado Actual del Proyecto (~30-35% completo)

**Implementado:**

- Auth completo (Better Auth: credentials + OAuth + verificación + reset)
- Onboarding (3 pasos: info → organización → profesión)
- Organizaciones CRUD con switch de org activa
- Workspaces CRUD con filtro por organizationId
- Usuarios e Invitaciones con email (Resend)
- Escenarios: modelo de datos + mocks completos + router básico (create/getAll) + listado UI
- Layout privado (navbar, aside, breadcrumb, switcher)
- Sistema de UI compartido (52 componentes shadcn/ui + Radix)
- Infraestructura: Prisma, Redis, BullMQ (stubs), tRPC, i18n (en), rutas tipadas

**Pendiente (todo el motor de simulación):**

- `src/modules/simulation/` — no existe
- SimulationEngine, StateManager, ReplayEngine, LearningEngine
- ScenarioFactory, EventGenerator, ScoringCalculator
- RoundManager, TimerManager, DecisionValidator, ResourceCalculator
- AI Virtual Team (NPCs), EvaluationEngine, CompetencyTracker
- Socket.IO (real-time), chat, sincronización
- Todas las páginas de simulación (lobby, juego, debrief, resultados)
- Todos los hooks de simulación
- testing, reportes

---

## 2. Arquitectura del MVP

### Flujo Individual (MVP)

```
Briefing (10 min)
  → Contexto y objetivos del escenario
  → Presentación de recursos y reglas

Rondas 1-10 (~20 min)
  → R1-3: Decisiones Independientes (baseline conductual)
  → R4-6: Comunicación Limitada (NPCs negocian)
  → R7-9: Negociación Abierta (alianzas y coopetición)
  → R10: Crisis Sistémica (recursos críticos)

Debrief (15 min)
  → Resumen de impacto por decisión
  → Métricas de competencias
  → Insights del AI Coach (reglas)

Plan de Acción (20 min)
  → Aplicación a contexto real del participante
```

### Dependencia entre Fases

```
FASE 1 (Motor) ──→ FASE 2 (Escenarios) ──→ FASE 3 (Rondas/Decisiones) ──→ FASE 4 (NPCs/Evaluación)
                                                                         ══ MVP ══

FASE 5 (Real-time) ──→ FASE 6 (Dashboard) ──→ FASE 7 (i18n/Pulido)
```

---

## 3. Fases de Desarrollo

---

### FASE 1 — Motor de Simulación: Fundamentos (2-3 semanas)

**Objetivo:** Crear la estructura del módulo de simulación con el motor base, gestión de estado y routers tRPC que permitan crear, iniciar, pausar y completar sesiones.

**Entregables:**

| #    | Tarea                                                    | Archivo(s)                                                                      | Dependencias  |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------- |
| 1.1  | Crear estructura de carpetas del módulo simulation       | `src/modules/simulation/{components,types,helpers,hooks,router,schemas}`        | —             |
| 1.2  | Definir tipos e interfaces de simulación                 | `src/modules/simulation/types/simulation.types.ts`                              | 1.1           |
| 1.3  | Definir schemas Zod para simulación                      | `src/modules/simulation/schemas/simulation.schema.ts`                           | 1.2           |
| 1.4  | Implementar SimulationEngine (clase base)                | `src/modules/simulation/helpers/simulation-engine.ts`                           | 1.2, 1.3      |
| 1.5  | Implementar StateManager (estado global + historial)     | `src/modules/simulation/helpers/state-manager.ts`                               | 1.2           |
| 1.6  | Implementar tRPC router de simulación (CRUD + lifecycle) | `src/modules/simulation/router/index.ts`                                        | 1.3, 1.4, 1.5 |
| 1.7  | Registrar simulationRouter en appRouter                  | `src/trpc/router.ts`                                                            | 1.6           |
| 1.8  | Agregar rutas de simulación al route config              | `src/routes/config/index.ts`                                                    | 1.1           |
| 1.9  | Crear páginas de app: lista de simulaciones              | `src/app/[lang]/(private)/[organization]/[workspace]/simulations/page.tsx`      | 1.8           |
| 1.10 | Crear páginas de app: detalle de simulación              | `src/app/[lang]/(private)/[organization]/[workspace]/simulations/[id]/page.tsx` | 1.8           |
| 1.11 | Hook: useSimulationState                                 | `src/modules/simulation/hooks/use-simulation-state.ts`                          | 1.6           |
| 1.12 | Hook: useSimulations (lista por workspace)               | `src/modules/simulation/hooks/use-simulations.ts`                               | 1.6           |
| 1.13 | Componentes UI: SimulationList, SimulationCard           | `src/modules/simulation/components/`                                            | 1.11, 1.12    |
| 1.14 | Componentes UI: CreateSimulationModal                    | `src/modules/simulation/components/`                                            | 1.11, schemas |
| 1.15 | Integrar en sidebar: menú de simulaciones                | `src/modules/private/components/`                                               | 1.9           |

**Criterios de Aceptación:**

- [ ] Se puede crear una simulación desde la UI (seleccionar escenario mock, modo INDIVIDUAL)
- [ ] Se puede ver la lista de simulaciones por workspace
- [ ] SimulationEngine procesa create/start/pause/resume/complete
- [ ] StateManager persiste estado en Redis y sincroniza con Prisma
- [ ] Filtro por organizationId en todas las queries (multi-tenancy)
- [ ] Todas las respuestas tRPC siguen el patrón APIResult<T>

---

### FASE 2 — Sistema de Escenarios (1-2 semanas)

**Objetivo:** Crear el ScenarioFactory que consume los mocks existentes y alimenta al motor. Implementar EventGenerator para crisis dinámicas y ScoringCalculator para dimensiones de competencias.

**Entregables:**

| #   | Tarea                                                               | Archivo(s)                                              | Dependencias           |
| --- | ------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------- |
| 2.1 | Implementar ScenarioFactory (carga mocks por slug)                  | `src/modules/simulation/helpers/scenario-factory.ts`    | 1.4, mocks existentes  |
| 2.2 | Implementar EventGenerator (triggers desde PhaseDefinition.events)  | `src/modules/simulation/helpers/event-generator.ts`     | 2.1, 1.5               |
| 2.3 | Implementar ScoringCalculator (cálculo por dimensión)               | `src/modules/simulation/helpers/scoring-calculator.ts`  | 2.1                    |
| 2.4 | Implementar ResourceCalculator (regeneración, costos, impactos)     | `src/modules/simulation/helpers/resource-calculator.ts` | 2.1                    |
| 2.5 | Integrar ScenarioFactory en SimulationEngine.init()                 | `src/modules/simulation/helpers/simulation-engine.ts`   | 2.1                    |
| 2.6 | Integrar EventGenerator en avance de ronda                          | `src/modules/simulation/helpers/simulation-engine.ts`   | 2.2                    |
| 2.7 | Tipos: ScenarioConfig integración con simulation types              | `src/modules/simulation/types/`                         | 2.1, tipos de scenario |
| 2.8 | Helpers: mapeo de recursos mock → estado inicial Resource[]         | `src/modules/simulation/helpers/`                       | 2.1, 2.4               |
| 2.9 | Tests unitarios: ScenarioFactory, EventGenerator, ScoringCalculator | `src/modules/simulation/__tests__/`                     | 2.1-2.4                |

**Criterios de Aceptación:**

- [ ] ScenarioFactory.getScenario("supply-chain-masters") devuelve config completa tipada
- [ ] Los 3 escenarios (Supply Chain, Retail Marketing, Outsourcing) cargan correctamente
- [ ] EventGenerator genera eventos según la ronda y fase del mock
- [ ] ScoringCalculator calcula score por dimensión con pesos correctos
- [ ] ResourceCalculator aplica regeneración + costos de decisiones + impactos de eventos
- [ ] SimulationEngine.init() inicializa recursos desde ScenarioFactory

---

### FASE 3 — Sistema de Rondas y Decisiones (2-3 semanas)

**Objetivo:** Implementar el sistema completo de rondas con fases evolutivas, timer, validación de decisiones, y la UI de juego principal.

**Entregables:**

| #    | Tarea                                                        | Archivo(s)                                              | Dependencias  |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------- | ------------- |
| 3.1  | Implementar RoundManager (fases evolutivas, progresión)      | `src/modules/simulation/helpers/round-manager.ts`       | 1.4, 2.1      |
| 3.2  | Implementar TimerManager (countdown, notificaciones)         | `src/modules/simulation/helpers/timer-manager.ts`       | 3.1           |
| 3.3  | Implementar DecisionValidator (validación Zod por categoría) | `src/modules/simulation/helpers/decision-validator.ts`  | 2.1, schemas  |
| 3.4  | Implementar DecisionProcessor (cálculo de impactos)          | `src/modules/simulation/helpers/decision-processor.ts`  | 3.3, 2.3, 2.4 |
| 3.5  | tRPC router: rounds (getRound, advance, getPhase)            | `src/modules/simulation/router/`                        | 3.1           |
| 3.6  | tRPC router: decisions (submit, getByRound)                  | `src/modules/simulation/router/`                        | 3.3, 3.4      |
| 3.7  | tRPC router: resources (getCurrent, getHistory)              | `src/modules/simulation/router/`                        | 2.4           |
| 3.8  | tRPC router: events (getByRound)                             | `src/modules/simulation/router/`                        | 2.2           |
| 3.9  | Hook: useRoundState                                          | `src/modules/simulation/hooks/use-round-state.ts`       | 3.5           |
| 3.10 | Hook: useDecisions                                           | `src/modules/simulation/hooks/use-decisions.ts`         | 3.6           |
| 3.11 | Hook: useResources                                           | `src/modules/simulation/hooks/use-resources.ts`         | 3.7           |
| 3.12 | Hook: useSimulationTimer                                     | `src/modules/simulation/hooks/use-simulation-timer.ts`  | 3.2           |
| 3.13 | Hook: useEvents                                              | `src/modules/simulation/hooks/use-events.ts`            | 3.8           |
| 3.14 | UI: Página de juego principal (layout de simulación)         | `src/app/.../simulations/[id]/play/page.tsx`            | 3.9-3.13      |
| 3.15 | UI: DecisionForm (formulario por categoría del escenario)    | `src/modules/simulation/components/decision-form.tsx`   | 3.10, 2.1     |
| 3.16 | UI: ResourceBar (barras de recursos con niveles)             | `src/modules/simulation/components/resource-bar.tsx`    | 3.11          |
| 3.17 | UI: RoundTimer (countdown visual)                            | `src/modules/simulation/components/round-timer.tsx`     | 3.12          |
| 3.18 | UI: RoundSummary (resumen post-ronda)                        | `src/modules/simulation/components/round-summary.tsx`   | 3.9           |
| 3.19 | UI: EventCard (visualización de crisis/eventos)              | `src/modules/simulation/components/event-card.tsx`      | 3.13          |
| 3.20 | UI: PhaseIndicator (indicador de fase evolutiva actual)      | `src/modules/simulation/components/phase-indicator.tsx` | 3.9           |
| 3.21 | Integración: flujo completo crear → jugar → avanzar ronda    | `src/modules/simulation/`                               | 3.1-3.20      |

**Criterios de Aceptación:**

- [ ] RoundManager detecta la fase evolutiva según el número de ronda
- [ ] TimerManager cuenta regresiva y notifica al expirar (auto-avance de ronda)
- [ ] DecisionValidator rechaza decisiones inválidas con mensajes claros
- [ ] DecisionProcessor calcula impactos (corto plazo, largo plazo, sistémico, competencias)
- [ ] UI: el jugador puede seleccionar opciones por categoría y enviar su decisión
- [ ] UI: las barras de recursos se actualizan después de cada ronda
- [ ] UI: los eventos de crisis aparecen al iniciar la ronda correspondiente
- [ ] El flujo completo (10 rondas) se puede jugar de inicio a fin

---

### FASE 4 — Modo Individual con NPCs y Evaluación (2-3 semanas) ⭐ MVP

**Objetivo:** Implementar el modo Individual completo con equipo virtual NPC, sistema de evaluación de competencias, debrief post-simulación y plan de acción. **Esto marca el MVP funcional.**

**Entregables:**

| #    | Tarea                                                                          | Archivo(s)                                                | Dependencias |
| ---- | ------------------------------------------------------------------------------ | --------------------------------------------------------- | ------------ |
| 4.1  | Definir perfiles NPC (personalidades, tendencias de decisión)                  | `src/modules/simulation/helpers/npc-profiles.ts`          | 2.1          |
| 4.2  | Implementar NPCDecisionEngine (decisión basada en reglas)                      | `src/modules/simulation/helpers/npc-decision-engine.ts`   | 4.1, 3.3     |
| 4.3  | Implementar NPCBehaviorEngine (interacción entre NPCs y jugador)               | `src/modules/simulation/helpers/npc-behavior-engine.ts`   | 4.2          |
| 4.4  | Implementar EvaluationEngine (análisis de decisiones → métricas)               | `src/modules/simulation/helpers/evaluation-engine.ts`     | 2.3, 3.4     |
| 4.5  | Implementar CompetencyTracker (evolución + recuperación)                       | `src/modules/simulation/helpers/competency-tracker.ts`    | 4.4          |
| 4.6  | Implementar InsightGenerator (insights basados en reglas)                      | `src/modules/simulation/helpers/insight-generator.ts`     | 4.4, 4.5     |
| 4.7  | Implementar DebriefGenerator (resumen post-simulación)                         | `src/modules/simulation/helpers/debrief-generator.ts`     | 4.4, 4.5     |
| 4.8  | Conectar BullMQ evaluation worker con EvaluationEngine                         | `src/lib/queue/workers/evaluation.ts`                     | 4.4          |
| 4.9  | Conectar BullMQ ai worker con InsightGenerator                                 | `src/lib/queue/workers/ai.ts`                             | 4.6          |
| 4.10 | tRPC router: players (getNPCs, getPlayerState)                                 | `src/modules/simulation/router/`                          | 4.2          |
| 4.11 | tRPC router: evaluations (getByPlayer, getEvolution)                           | `src/modules/simulation/router/`                          | 4.4, 4.5     |
| 4.12 | tRPC router: insights (getBySimulation, markRead, dismiss)                     | `src/modules/simulation/router/`                          | 4.6          |
| 4.13 | Hook: usePlayers                                                               | `src/modules/simulation/hooks/use-players.ts`             | 4.10         |
| 4.14 | Hook: useEvaluation                                                            | `src/modules/simulation/hooks/use-evaluation.ts`          | 4.11         |
| 4.15 | Hook: useInsights                                                              | `src/modules/simulation/hooks/use-insights.ts`            | 4.12         |
| 4.16 | UI: BriefingPage (contexto, objetivos, reglas)                                 | `src/app/.../simulations/[id]/briefing/page.tsx`          | —            |
| 4.17 | UI: NPCTeamPanel (equipo virtual con roles y estados)                          | `src/modules/simulation/components/npc-team-panel.tsx`    | 4.13         |
| 4.18 | UI: CompetencyRadar (gráfico de competencias)                                  | `src/modules/simulation/components/competency-radar.tsx`  | 4.14         |
| 4.19 | UI: InsightPanel (insights del AI Coach)                                       | `src/modules/simulation/components/insight-panel.tsx`     | 4.15         |
| 4.20 | UI: DebriefPage (resumen completo post-simulación)                             | `src/app/.../simulations/[id]/debrief/page.tsx`           | 4.7          |
| 4.21 | UI: ActionPlanPage (plan de acción personal)                                   | `src/app/.../simulations/[id]/action-plan/page.tsx`       | 4.7          |
| 4.22 | UI: ResultsDashboard (métricas finales, benchmark)                             | `src/modules/simulation/components/results-dashboard.tsx` | 4.14, 4.7    |
| 4.23 | Integración: flujo completo Individual (briefing → 10 rondas → debrief → plan) | `src/modules/simulation/`                                 | 4.1-4.22     |
| 4.24 | Validación end-to-end: los 3 escenarios jugables                               | —                                                         | 4.23         |

**Criterios de Aceptación:**

- [ ] 3 NPCs con personalidades distintas toman decisiones cada ronda
- [ ] Las decisiones NPC afectan los recursos compartidos del ecosistema
- [ ] EvaluationEngine calcula 5 competencias (0-100) después de cada ronda
- [ ] CompetencyTracker muestra evolución ronda a ronda
- [ ] InsightGenerator produce al menos 1 insight post-ronda relevante
- [ ] DebriefGenerator produce resumen completo con: métricas, fortalezas, áreas de mejora
- [ ] Flujo end-to-end: briefing → 10 rondas con NPCs → debrief → plan de acción
- [ ] Los 3 escenarios se pueden jugar completamente en modo Individual
- [ ] BullMQ workers procesan evaluación e insights en background
- [ ] Multi-tenancy: todas las queries filtran por organizationId

---

### FASE 5 — Real-time y Eventos (2-3 semanas) — Post-MVP

**Objetivo:** Implementar Socket.IO para sincronización multiusuario en modo Corporativo.

**Entregables:**

| #    | Tarea                                                    | Archivo(s)                                                                | Dependencias |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------- | ------------ |
| 5.1  | Instalar socket.io + socket.io-client                    | `package.json`                                                            | —            |
| 5.2  | Implementar Socket.IO server (custom server / API route) | `src/lib/socket/index.ts`                                                 | 5.1          |
| 5.3  | Implementar namespaces por sesión                        | `src/lib/socket/`                                                         | 5.2          |
| 5.4  | Implementar autenticación WebSocket                      | `src/lib/socket/auth.ts`                                                  | 5.2          |
| 5.5  | Implementar client provider + hook                       | `src/lib/providers/socket-provider.tsx`, `src/shared/hooks/use-socket.ts` | 5.3          |
| 5.6  | Real-time: decisión enviada broadcast                    | `src/lib/socket/handlers/`                                                | 5.3          |
| 5.7  | Real-time: avance de ronda broadcast                     | `src/lib/socket/handlers/`                                                | 5.3          |
| 5.8  | Real-time: eventos de crisis broadcast                   | `src/lib/socket/handlers/`                                                | 5.3          |
| 5.9  | Real-time: sincronización de timer                       | `src/lib/socket/handlers/`                                                | 5.3, 3.2     |
| 5.10 | Chat: mensajes en canal de simulación                    | `src/lib/socket/handlers/`, tRPC router                                   | 5.3          |
| 5.11 | Redis pub/sub para multi-instancia                       | `src/lib/redis/`                                                          | 5.3          |
| 5.12 | Resolution de conflictos en StateManager                 | `src/modules/simulation/helpers/state-manager.ts`                         | 5.6-5.9      |
| 5.13 | UI: ChatPanel                                            | `src/modules/simulation/components/chat-panel.tsx`                        | 5.10         |
| 5.14 | UI: PlayerList (participantes online)                    | `src/modules/simulation/components/player-list.tsx`                       | 5.5          |
| 5.15 | UI: Indicadores de presencia                             | `src/modules/simulation/components/`                                      | 5.5          |

**Criterios de Aceptación:**

- [ ] Socket.IO server corre en namespaces aislados por simulación
- [ ] WebSocket auth valida sesión antes de conectar
- [ ] Decisiones de un jugador se reflejan en tiempo real para otros
- [ ] Timer se sincroniza entre todos los participantes
- [ ] Chat funciona dentro del canal de simulación
- [ ] Redis pub/sub permite escalar a múltiples instancias
- [ ] Conflict resolution maneja decisiones simultáneas

---

### FASE 6 — Dashboard de Gestión (1-2 semanas) — Post-MVP

**Objetivo:** Vista de administración para facilitadores con control de sesiones.

**Entregables:**

| #   | Tarea                                                           | Archivo(s)                                                   | Dependencias |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| 6.1 | Página: workspace simulations dashboard                         | `src/app/.../dashboard/page.tsx` (mejorar existente)         | FASE 1       |
| 6.2 | Componente: SessionMonitor (estado en tiempo real)              | `src/modules/simulation/components/session-monitor.tsx`      | 5.5          |
| 6.3 | Componente: FlowControl (pause/resume/abort)                    | `src/modules/simulation/components/flow-control.tsx`         | FASE 1       |
| 6.4 | Componente: ParticipantsManager                                 | `src/modules/simulation/components/participants-manager.tsx` | FASE 4       |
| 6.5 | tRPC: mutations de facilitador (forceAdvance, overrideDecision) | `src/modules/simulation/router/`                             | FASE 3       |

**Criterios de Aceptación:**

- [ ] Facilitador ve todas las simulaciones activas del workspace
- [ ] Puede pausar/reanudar/abortar sesiones
- [ ] Ve estado de participantes y recursos en tiempo real

---

### FASE 7 — Internacionalización y Pulido (1-2 semanas) — Post-MVP

**Objetivo:** Completar i18n, optimizar performance, testing y documentación.

**Entregables:**

| #   | Tarea                                                      | Archivo(s)                                           | Dependencias |
| --- | ---------------------------------------------------------- | ---------------------------------------------------- | ------------ |
| 7.1 | Agregar locale `es` en routing config                      | `src/lib/i18n/core/routing.ts`                       | —            |
| 7.2 | Crear archivos de traducción ES para simulation            | `src/lib/i18n/locales/es/`                           | —            |
| 7.3 | Migrar todos los strings del módulo simulation a i18n keys | `src/modules/simulation/**`                          | 7.2          |
| 7.4 | Performance: optimistic updates en decisiones              | `src/modules/simulation/hooks/`                      | FASE 3       |
| 7.5 | Performance: paginación en listas largas                   | `src/modules/simulation/router/`                     | FASE 1       |
| 7.6 | Testing: unitarios para helpers del motor                  | `src/modules/simulation/__tests__/`                  | FASE 2-4     |
| 7.7 | Testing: integración para flujos completos                 | `src/modules/simulation/__tests__/`                  | FASE 4       |
| 7.8 | Reportes: exportación básica (PDF/CSV)                     | `src/modules/simulation/helpers/report-generator.ts` | FASE 4       |
| 7.9 | Documentación: API docs y guías de uso                     | `docs/`                                              | FASE 4       |

**Criterios de Aceptación:**

- [ ] Toda la UI de simulación funciona en EN y ES
- [ ] No hay strings hardcodeados en componentes
- [ ] Tests unitarios cubren helpers clave (>70%)
- [ ] Flujo completo Individual pasa tests de integración
- [ ] Se puede exportar un reporte post-simulación

---

## 4. Estimación Total

| Fase                            | Duración          | Tipo     |
| ------------------------------- | ----------------- | -------- |
| FASE 1 — Motor de Simulación    | 2-3 semanas       | MVP      |
| FASE 2 — Sistema de Escenarios  | 1-2 semanas       | MVP      |
| FASE 3 — Rondas y Decisiones    | 2-3 semanas       | MVP      |
| FASE 4 — Modo Individual + NPCs | 2-3 semanas       | MVP      |
| **Total MVP**                   | **7-11 semanas**  |          |
| FASE 5 — Real-time              | 2-3 semanas       | Post-MVP |
| FASE 6 — Dashboard              | 1-2 semanas       | Post-MVP |
| FASE 7 — i18n y Pulido          | 1-2 semanas       | Post-MVP |
| **Total Post-MVP**              | **4-7 semanas**   |          |
| **Total Proyecto**              | **11-18 semanas** |          |

---

## 5. Riesgos y Mitigaciones

| Riesgo                                                     | Impacto                      | Mitigación                                                                                             |
| ---------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| Complejidad del SimulationEngine mayor a la estimada       | Retraso Fase 1               | Mantener motor minimal: solo procesar decisiones y actualizar estado. Optimizar después.               |
| NPCs con reglas producen comportamiento predecible/irreal  | Experiencia de usuario pobre | Definir 3-4 personalidades distintas con variabilidad aleatoria. Evaluar en Fase 4 si se necesita LLM. |
| Redis no escala para estado de sesión en alta concurrencia | Cuello de botella            | Diseñar StateManager con fallback a BD. Redis solo para sesiones activas.                              |
| Schema Prisma requiere cambios para el motor               | Migración necesaria          | Auditar schema vs. tipos del motor en Fase 1. Aplicar migración temprana.                              |

---

## 6. Notas de Implementación

### Convenciones Obligatorias

- Filtro por `organizationId` en TODAS las queries (multi-tenancy estricto)
- Respuestas tRPC con `APIResult<T>` + `tryCatch`
- Schemas Zod para TODOS los inputs de tRPC
- Server Components por defecto; Client Components solo con interactividad real
- Hooks para lógica cuando el componente supera ~80 líneas JSX
- Rutas con sistema centralizado (RouteParams), nunca string literals
- i18n keys (no strings inline) para mensajes de usuario
- Sin `any`, sin `console.log`, sin imports muertos

### Patrón de Integración de Escenarios

```
ScenarioFactory.getScenario(slug)
  → ScenarioConfig (recursos, fases, roles, decisiones, competencias)
  → SimulationEngine.init(config)
  → StateManager.initialize(resources, phases)
  → RoundManager.setPhases(phases)
  → NPCDecisionEngine.loadProfiles(roles)
```
