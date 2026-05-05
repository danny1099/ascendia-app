# Ascendia — Tablero de Tareas

> **Última actualización:** Mayo 2026 · **Estado:** Pendiente de inicio

---

## Leyenda

| Estado | Significado |
| ------ | ----------- |
| ⬜     | Pendiente   |
| 🔵     | En progreso |
| ✅     | Completado  |
| 🚫     | Bloqueado   |
| ⏭️     | Postergado  |

---

## FASE 1 — Motor de Simulación: Fundamentos

| ID   | Tarea                                                    | Archivo(s)                                                               | Depende de    | Estado | Prioridad |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------ | ------------- | ------ | --------- |
| 1.1  | Crear estructura de carpetas del módulo simulation       | `src/modules/simulation/{components,types,helpers,hooks,router,schemas}` | —             | ⬜     | Alta      |
| 1.2  | Definir tipos e interfaces de simulación                 | `src/modules/simulation/types/simulation.types.ts`                       | 1.1           | ⬜     | Alta      |
| 1.3  | Definir schemas Zod para simulación                      | `src/modules/simulation/schemas/simulation.schema.ts`                    | 1.2           | ⬜     | Alta      |
| 1.4  | Implementar SimulationEngine (clase base)                | `src/modules/simulation/helpers/simulation-engine.ts`                    | 1.2, 1.3      | ⬜     | Alta      |
| 1.5  | Implementar StateManager (estado global + historial)     | `src/modules/simulation/helpers/state-manager.ts`                        | 1.2           | ⬜     | Alta      |
| 1.6  | Implementar tRPC router de simulación (CRUD + lifecycle) | `src/modules/simulation/router/index.ts`                                 | 1.3, 1.4, 1.5 | ⬜     | Alta      |
| 1.7  | Registrar simulationRouter en appRouter                  | `src/trpc/router.ts`                                                     | 1.6           | ⬜     | Alta      |
| 1.8  | Agregar rutas de simulación al route config              | `src/routes/config/index.ts`                                             | 1.1           | ⬜     | Alta      |
| 1.9  | Crear página: lista de simulaciones                      | `src/app/[lang]/(private)/[org]/[ws]/simulations/page.tsx`               | 1.8           | ⬜     | Media     |
| 1.10 | Crear página: detalle de simulación                      | `src/app/[lang]/(private)/[org]/[ws]/simulations/[id]/page.tsx`          | 1.8           | ⬜     | Media     |
| 1.11 | Hook: useSimulationState                                 | `src/modules/simulation/hooks/use-simulation-state.ts`                   | 1.6           | ⬜     | Alta      |
| 1.12 | Hook: useSimulations (lista por workspace)               | `src/modules/simulation/hooks/use-simulations.ts`                        | 1.6           | ⬜     | Alta      |
| 1.13 | Componente: SimulationList                               | `src/modules/simulation/components/simulation-list.tsx`                  | 1.11, 1.12    | ⬜     | Media     |
| 1.14 | Componente: SimulationCard                               | `src/modules/simulation/components/simulation-card.tsx`                  | 1.12          | ⬜     | Media     |
| 1.15 | Componente: CreateSimulationModal                        | `src/modules/simulation/components/create-simulation-modal.tsx`          | 1.11, schemas | ⬜     | Media     |
| 1.16 | Integrar simulaciones en sidebar del workspace           | `src/modules/private/components/`                                        | 1.9           | ⬜     | Media     |

---

## FASE 2 — Sistema de Escenarios

| ID  | Tarea                                                           | Archivo(s)                                              | Depende de | Estado | Prioridad |
| --- | --------------------------------------------------------------- | ------------------------------------------------------- | ---------- | ------ | --------- |
| 2.1 | Implementar ScenarioFactory (carga mocks por slug)              | `src/modules/simulation/helpers/scenario-factory.ts`    | 1.4, mocks | ⬜     | Alta      |
| 2.2 | Implementar EventGenerator (triggers desde config)              | `src/modules/simulation/helpers/event-generator.ts`     | 2.1, 1.5   | ⬜     | Alta      |
| 2.3 | Implementar ScoringCalculator (cálculo por dimensión)           | `src/modules/simulation/helpers/scoring-calculator.ts`  | 2.1        | ⬜     | Alta      |
| 2.4 | Implementar ResourceCalculator (regeneración, costos, impactos) | `src/modules/simulation/helpers/resource-calculator.ts` | 2.1        | ⬜     | Alta      |
| 2.5 | Integrar ScenarioFactory en SimulationEngine.init()             | `src/modules/simulation/helpers/simulation-engine.ts`   | 2.1        | ⬜     | Alta      |
| 2.6 | Integrar EventGenerator en avance de ronda                      | `src/modules/simulation/helpers/simulation-engine.ts`   | 2.2        | ⬜     | Alta      |
| 2.7 | Tipos: mapeo ScenarioConfig → SimulationState                   | `src/modules/simulation/types/`                         | 2.1, 1.2   | ⬜     | Alta      |
| 2.8 | Helper: mapeo de recursos mock → estado inicial Resource[]      | `src/modules/simulation/helpers/`                       | 2.1, 2.4   | ⬜     | Alta      |
| 2.9 | Tests: ScenarioFactory, EventGenerator, ScoringCalculator       | `src/modules/simulation/__tests__/`                     | 2.1-2.4    | ⬜     | Media     |

---

## FASE 3 — Sistema de Rondas y Decisiones

| ID   | Tarea                                                   | Archivo(s)                                              | Depende de    | Estado | Prioridad |
| ---- | ------------------------------------------------------- | ------------------------------------------------------- | ------------- | ------ | --------- |
| 3.1  | Implementar RoundManager (fases evolutivas, progresión) | `src/modules/simulation/helpers/round-manager.ts`       | 1.4, 2.1      | ⬜     | Alta      |
| 3.2  | Implementar TimerManager (countdown, notificaciones)    | `src/modules/simulation/helpers/timer-manager.ts`       | 3.1           | ⬜     | Alta      |
| 3.3  | Implementar DecisionValidator (validación Zod)          | `src/modules/simulation/helpers/decision-validator.ts`  | 2.1, schemas  | ⬜     | Alta      |
| 3.4  | Implementar DecisionProcessor (cálculo de impactos)     | `src/modules/simulation/helpers/decision-processor.ts`  | 3.3, 2.3, 2.4 | ⬜     | Alta      |
| 3.5  | tRPC router: rounds                                     | `src/modules/simulation/router/round-router.ts`         | 3.1           | ⬜     | Alta      |
| 3.6  | tRPC router: decisions                                  | `src/modules/simulation/router/decision-router.ts`      | 3.3, 3.4      | ⬜     | Alta      |
| 3.7  | tRPC router: resources                                  | `src/modules/simulation/router/resource-router.ts`      | 2.4           | ⬜     | Media     |
| 3.8  | tRPC router: events                                     | `src/modules/simulation/router/event-router.ts`         | 2.2           | ⬜     | Media     |
| 3.9  | Hook: useRoundState                                     | `src/modules/simulation/hooks/use-round-state.ts`       | 3.5           | ⬜     | Alta      |
| 3.10 | Hook: useDecisions                                      | `src/modules/simulation/hooks/use-decisions.ts`         | 3.6           | ⬜     | Alta      |
| 3.11 | Hook: useResources                                      | `src/modules/simulation/hooks/use-resources.ts`         | 3.7           | ⬜     | Media     |
| 3.12 | Hook: useSimulationTimer                                | `src/modules/simulation/hooks/use-simulation-timer.ts`  | 3.2           | ⬜     | Alta      |
| 3.13 | Hook: useEvents                                         | `src/modules/simulation/hooks/use-events.ts`            | 3.8           | ⬜     | Media     |
| 3.14 | Página: juego principal (layout de simulación)          | `src/app/.../simulations/[id]/play/page.tsx`            | 3.9-3.13      | ⬜     | Alta      |
| 3.15 | Componente: DecisionForm                                | `src/modules/simulation/components/decision-form.tsx`   | 3.10, 2.1     | ⬜     | Alta      |
| 3.16 | Componente: ResourceBar                                 | `src/modules/simulation/components/resource-bar.tsx`    | 3.11          | ⬜     | Alta      |
| 3.17 | Componente: RoundTimer                                  | `src/modules/simulation/components/round-timer.tsx`     | 3.12          | ⬜     | Alta      |
| 3.18 | Componente: RoundSummary                                | `src/modules/simulation/components/round-summary.tsx`   | 3.9           | ⬜     | Media     |
| 3.19 | Componente: EventCard                                   | `src/modules/simulation/components/event-card.tsx`      | 3.13          | ⬜     | Media     |
| 3.20 | Componente: PhaseIndicator                              | `src/modules/simulation/components/phase-indicator.tsx` | 3.9           | ⬜     | Media     |
| 3.21 | Integración: flujo crear → jugar → avanzar ronda        | `src/modules/simulation/`                               | 3.1-3.20      | ⬜     | Alta      |

---

## FASE 4 — Modo Individual con NPCs y Evaluación ⭐ MVP

| ID   | Tarea                                                | Archivo(s)                                                | Depende de | Estado | Prioridad |
| ---- | ---------------------------------------------------- | --------------------------------------------------------- | ---------- | ------ | --------- |
| 4.1  | Definir perfiles NPC (personalidades, tendencias)    | `src/modules/simulation/helpers/npc-profiles.ts`          | 2.1        | ⬜     | Alta      |
| 4.2  | Implementar NPCDecisionEngine (reglas)               | `src/modules/simulation/helpers/npc-decision-engine.ts`   | 4.1, 3.3   | ⬜     | Alta      |
| 4.3  | Implementar NPCBehaviorEngine (interacciones)        | `src/modules/simulation/helpers/npc-behavior-engine.ts`   | 4.2        | ⬜     | Alta      |
| 4.4  | Implementar EvaluationEngine (decisiones → métricas) | `src/modules/simulation/helpers/evaluation-engine.ts`     | 2.3, 3.4   | ⬜     | Alta      |
| 4.5  | Implementar CompetencyTracker (evolución + recovery) | `src/modules/simulation/helpers/competency-tracker.ts`    | 4.4        | ⬜     | Alta      |
| 4.6  | Implementar InsightGenerator (reglas)                | `src/modules/simulation/helpers/insight-generator.ts`     | 4.4, 4.5   | ⬜     | Alta      |
| 4.7  | Implementar DebriefGenerator (resumen post-sim)      | `src/modules/simulation/helpers/debrief-generator.ts`     | 4.4, 4.5   | ⬜     | Alta      |
| 4.8  | Conectar BullMQ evaluation worker                    | `src/lib/queue/workers/evaluation.ts`                     | 4.4        | ⬜     | Media     |
| 4.9  | Conectar BullMQ ai worker                            | `src/lib/queue/workers/ai.ts`                             | 4.6        | ⬜     | Media     |
| 4.10 | tRPC router: players                                 | `src/modules/simulation/router/player-router.ts`          | 4.2        | ⬜     | Alta      |
| 4.11 | tRPC router: evaluations                             | `src/modules/simulation/router/evaluation-router.ts`      | 4.4, 4.5   | ⬜     | Alta      |
| 4.12 | tRPC router: insights                                | `src/modules/simulation/router/insight-router.ts`         | 4.6        | ⬜     | Alta      |
| 4.13 | Hook: usePlayers                                     | `src/modules/simulation/hooks/use-players.ts`             | 4.10       | ⬜     | Alta      |
| 4.14 | Hook: useEvaluation                                  | `src/modules/simulation/hooks/use-evaluation.ts`          | 4.11       | ⬜     | Alta      |
| 4.15 | Hook: useInsights                                    | `src/modules/simulation/hooks/use-insights.ts`            | 4.12       | ⬜     | Media     |
| 4.16 | Página: Briefing                                     | `src/app/.../simulations/[id]/briefing/page.tsx`          | —          | ⬜     | Alta      |
| 4.17 | Componente: NPCTeamPanel                             | `src/modules/simulation/components/npc-team-panel.tsx`    | 4.13       | ⬜     | Alta      |
| 4.18 | Componente: CompetencyRadar                          | `src/modules/simulation/components/competency-radar.tsx`  | 4.14       | ⬜     | Alta      |
| 4.19 | Componente: InsightPanel                             | `src/modules/simulation/components/insight-panel.tsx`     | 4.15       | ⬜     | Media     |
| 4.20 | Página: Debrief                                      | `src/app/.../simulations/[id]/debrief/page.tsx`           | 4.7        | ⬜     | Alta      |
| 4.21 | Página: ActionPlan                                   | `src/app/.../simulations/[id]/action-plan/page.tsx`       | 4.7        | ⬜     | Media     |
| 4.22 | Componente: ResultsDashboard                         | `src/modules/simulation/components/results-dashboard.tsx` | 4.14, 4.7  | ⬜     | Alta      |
| 4.23 | Integración: flujo completo Individual               | `src/modules/simulation/`                                 | 4.1-4.22   | ⬜     | Alta      |
| 4.24 | Validación: los 3 escenarios jugables end-to-end     | —                                                         | 4.23       | ⬜     | Alta      |

---

## FASE 5 — Real-time y Eventos (Post-MVP)

| ID   | Tarea                                 | Archivo(s)                                               | Depende de | Estado | Prioridad |
| ---- | ------------------------------------- | -------------------------------------------------------- | ---------- | ------ | --------- |
| 5.1  | Instalar socket.io + socket.io-client | `package.json`                                           | —          | ⬜     | Alta      |
| 5.2  | Implementar Socket.IO server          | `src/lib/socket/index.ts`                                | 5.1        | ⬜     | Alta      |
| 5.3  | Implementar namespaces por sesión     | `src/lib/socket/`                                        | 5.2        | ⬜     | Alta      |
| 5.4  | Implementar autenticación WebSocket   | `src/lib/socket/auth.ts`                                 | 5.2        | ⬜     | Alta      |
| 5.5  | Implementar client provider + hook    | `src/lib/providers/socket-provider.tsx`, `use-socket.ts` | 5.3        | ⬜     | Alta      |
| 5.6  | Handler: decisión enviada broadcast   | `src/lib/socket/handlers/`                               | 5.3        | ⬜     | Alta      |
| 5.7  | Handler: avance de ronda broadcast    | `src/lib/socket/handlers/`                               | 5.3        | ⬜     | Alta      |
| 5.8  | Handler: eventos de crisis broadcast  | `src/lib/socket/handlers/`                               | 5.3        | ⬜     | Media     |
| 5.9  | Handler: sincronización de timer      | `src/lib/socket/handlers/`                               | 5.3, 3.2   | ⬜     | Alta      |
| 5.10 | Chat: mensajes en canal de simulación | `src/lib/socket/handlers/`, router                       | 5.3        | ⬜     | Alta      |
| 5.11 | Redis pub/sub para multi-instancia    | `src/lib/redis/`                                         | 5.3        | ⬜     | Media     |
| 5.12 | Conflict resolution en StateManager   | `state-manager.ts`                                       | 5.6-5.9    | ⬜     | Alta      |
| 5.13 | Componente: ChatPanel                 | `src/modules/simulation/components/chat-panel.tsx`       | 5.10       | ⬜     | Alta      |
| 5.14 | Componente: PlayerList (online)       | `src/modules/simulation/components/player-list.tsx`      | 5.5        | ⬜     | Media     |
| 5.15 | Componente: Indicadores de presencia  | `src/modules/simulation/components/`                     | 5.5        | ⬜     | Baja      |

---

## FASE 6 — Dashboard de Gestión (Post-MVP)

| ID  | Tarea                                        | Archivo(s)                       | Depende de | Estado | Prioridad |
| --- | -------------------------------------------- | -------------------------------- | ---------- | ------ | --------- |
| 6.1 | Página: workspace simulations dashboard      | `dashboard/page.tsx`             | F1         | ⬜     | Alta      |
| 6.2 | Componente: SessionMonitor                   | `session-monitor.tsx`            | 5.5        | ⬜     | Alta      |
| 6.3 | Componente: FlowControl (pause/resume/abort) | `flow-control.tsx`               | F1         | ⬜     | Alta      |
| 6.4 | Componente: ParticipantsManager              | `participants-manager.tsx`       | F4         | ⬜     | Media     |
| 6.5 | tRPC: mutations de facilitador               | `src/modules/simulation/router/` | F3         | ⬜     | Media     |

---

## FASE 7 — i18n y Pulido (Post-MVP)

| ID  | Tarea                                  | Archivo(s)                          | Depende de | Estado | Prioridad |
| --- | -------------------------------------- | ----------------------------------- | ---------- | ------ | --------- |
| 7.1 | Agregar locale `es` en routing         | `src/lib/i18n/core/routing.ts`      | —          | ⬜     | Alta      |
| 7.2 | Traducciones ES para módulo simulation | `src/lib/i18n/locales/es/`          | —          | ⬜     | Alta      |
| 7.3 | Migrar strings simulation → i18n keys  | `src/modules/simulation/**`         | 7.2        | ⬜     | Alta      |
| 7.4 | Performance: optimistic updates        | `src/modules/simulation/hooks/`     | F3         | ⬜     | Media     |
| 7.5 | Performance: paginación en listas      | `src/modules/simulation/router/`    | F1         | ⬜     | Media     |
| 7.6 | Testing: unitarios helpers             | `src/modules/simulation/__tests__/` | F2-4       | ⬜     | Alta      |
| 7.7 | Testing: integración flujos completos  | `src/modules/simulation/__tests__/` | F4         | ⬜     | Alta      |
| 7.8 | Reportes: exportación PDF/CSV          | `report-generator.ts`               | F4         | ⬜     | Media     |
| 7.9 | Documentación: API docs y guías        | `docs/`                             | F4         | ⬜     | Baja      |

---

## Resumen por Fase

| Fase      | Tareas | MVP    | Prioridad más común |
| --------- | ------ | ------ | ------------------- |
| FASE 1    | 16     | Sí     | Alta                |
| FASE 2    | 9      | Sí     | Alta/Media          |
| FASE 3    | 21     | Sí     | Alta/Media          |
| FASE 4    | 24     | Sí ⭐  | Alta                |
| FASE 5    | 15     | No     | Alta/Media          |
| FASE 6    | 5      | No     | Alta/Media          |
| FASE 7    | 9      | No     | Alta/Media          |
| **Total** | **99** | **70** |                     |
