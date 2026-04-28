# AGENTS.MD — ASCENDIA SIMULATION PLATFORM

> **Versión:** 3.0 · **Última actualización:** Marzo 2026 · **Mantenedor:** Equipo Ascendia

---

# PARTE 1 · IDENTIDAD Y MISIÓN

Eres un agente de desarrollo senior especializado en el proyecto **Ascendia**, una aplicación web SaaS multi-tenant construida con **Next.js App Router**. Tu responsabilidad es implementar features de forma precisa, coherente y con calidad de producción, respetando al 100% las convenciones del proyecto.

Tu valor no está en imponer preferencias propias, sino en **amplificar la calidad del proyecto respetando su identidad**. Lee primero, planea segundo, decide el patrón correcto, implementa tercero.

---

# PARTE 2 · CONTEXTO DEL PRODUCTO

## Visión General

**Ascendia** es una plataforma SaaS de simulación de toma de decisiones y liderazgo basada en **ecosistemas de recursos compartidos**, diseñada para:

- Desarrollar competencias de liderazgo en contextos reales
- Simular entornos empresariales complejos e interdependientes
- Evaluar comportamiento bajo presión y en colaboración
- Generar aprendizaje adaptativo con IA

---

## Principio Core: Recursos Compartidos

El corazón de toda simulación en Ascendia:

- Recursos finitos con regeneración limitada
- Decisiones individuales que afectan al ecosistema completo
- Tensión permanente: beneficio individual vs. colectivo
- Consecuencias acumulativas y sistémicas de largo plazo

---

## Sistema de Rondas Evolutivas

```
Fase 1 (R1-3)  → Decisiones Independientes  (baseline de comportamiento)
Fase 2 (R4-6)  → Comunicación Limitada      (primeras negociaciones)
Fase 3 (R7-9)  → Negociación Abierta        (alianzas y coopetencia)
Fase 4 (R10-12) → Crisis Sistémica          (recursos críticos)
Fase 5 (R13-15) → Recuperación Colaborativa (rediseño estratégico)
```

---

## Modalidades de Operación

### Corporativa (Grupal)

- **Participantes:** 3–4 personas por grupo
- **Sincronía:** Tiempo real con WebSockets
- **Roles:** Definidos y rotativos entre rondas
- **Output:** Métricas grupales + dinámicas de equipo

```
Briefing        (20 min) → Contexto y objetivos
Rondas iniciales (60 min) → Establecer patrones
Crisis simulada  (45 min) → Probar adaptabilidad
Debrief grupal  (45 min) → Reflexión y aprendizajes
Plan de acción  (30 min) → Aplicación al mundo real
```

### Individual

- **Participantes:** Usuario + IA (NPCs como equipo virtual)
- **Asincronía:** A su propio ritmo
- **Output:** Assessment predictivo + plan de desarrollo personal

```
Briefing         (10 min) → Contexto y objetivos
Rondas iniciales (20 min) → Establecer patrones
Crisis simulada  (15 min) → Probar adaptabilidad
Debrief          (15 min) → Reflexión y aprendizajes
Plan de acción   (20 min) → Aplicación al mundo real
```

---

## Escenarios Disponibles

| Escenario                | Recurso Principal        | Crisis Clave                         |
| ------------------------ | ------------------------ | ------------------------------------ |
| **Supply Chain**         | Semiconductores globales | Pandemia, tensiones geopolíticas     |
| **Outsourcing Alliance** | Talento especializado    | Guerra de salarios, data breach      |
| **Retail Marketing**     | Atención del consumidor  | Escándalo viral, cambio de algoritmo |

---

## Competencias Evaluadas

| Competencia            | Rango | Descripción                      |
| ---------------------- | ----- | -------------------------------- |
| Pensamiento Sistémico  | 0–100 | Capacidad de ver interconexiones |
| Liderazgo Adaptativo   | 0–100 | Flexibilidad ante cambios        |
| Comunicación Efectiva  | 0–100 | Claridad en propuestas           |
| Visión a Largo Plazo   | 0–100 | Balance presente–futuro          |
| Inteligencia Emocional | 0–100 | Manejo de conflictos             |

---

## Sistema de IA y Evaluación

### Engines de Evaluación

| Engine                | Función                                                           |
| --------------------- | ----------------------------------------------------------------- |
| **SimulationEngine**  | Procesa decisiones, aplica reglas, calcula impactos               |
| **ScenarioFactory**   | Define escenarios con templates reutilizables                     |
| **EventGenerator**    | Genera crisis dinámicas con sistema de triggers                   |
| **StateManager**      | Manejo de estado global, historial, sincronización en tiempo real |
| **EvaluationEngine**  | Analiza decisiones, genera métricas de competencias               |
| **ReplayEngine**      | Reconstrucción de decisiones para aprendizaje activo              |
| **LearningEngine**    | Genera intervenciones de micro-learning contextual                |
| **CompetencyTracker** | Maneja evolución y recuperación de competencias                   |

### IA Coach

- Detecta patrones de comportamiento en tiempo real
- Sugiere acciones en momentos críticos de la simulación
- Identifica sesgos de decisión del participante
- Genera perfil de liderazgo dinámico con evolución temporal

### Loop de Aprendizaje

```
Decisión → Evaluación → Insight → Intervención → Nueva decisión
```

Cada decisión genera: intención detectada · impacto corto plazo · impacto largo plazo · impacto sistémico · competencias afectadas.

---

# PARTE 3 · ARQUITECTURA TÉCNICA

## Stack Tecnológico

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

### Infraestructura

```typescript
Caching: Redis  (sesiones activas, estado en tiempo real)
Storage: S3-compatible  (reportes, exports)
Queue:   Bull  (background jobs)
```

---

## Estructura de Carpetas (Screaming Architecture)

```
src/
├── modules/
│   ├── auth/              # Autenticación y sesiones
│   ├── organizations/     # Gestión de organizaciones (tenants)
│   ├── workspaces/        # Espacios de trabajo
│   ├── simulation/        # Motor de simulación core
│   │   ├── components/    # UI components
│   │   ├── types/         # TypeScript types & interfaces
│   │   ├── helpers/       # Utility functions
│   │   ├── hooks/         # React hooks
│   │   ├── router/        # tRPC routes
│   │   └── schemas/       # Zod validation schemas
│   └── ...
├── shared/
│   ├── components/        # UI primitivos compartidos
│   ├── utils/             # Utilidades globales (tryCatch, etc.)
│   └── types/             # Tipos globales (APIResult, etc.)
└── lib/
    ├── prisma.ts
    ├── redis.ts
    └── i18n/
```

---

## Separación de Responsabilidades

| Capa           | Rol                             | Notas                            |
| -------------- | ------------------------------- | -------------------------------- |
| **Components** | Solo UI y presentación          | Preferir React Server Components |
| **Hooks**      | Lógica de estado y side effects | Solo client-side                 |
| **Helpers**    | Funciones puras y utilidades    | Sin side effects                 |
| **Routers**    | Endpoints tRPC                  | Tipado fuerte, validación Zod    |
| **Schemas**    | Definición de inputs            | Siempre con Zod                  |
| **Types**      | Interfaces reutilizables        | Sin `any`                        |

---

## Multi-Tenancy

### Jerarquía de Entidades

```
organization → workspace → simulation → rounds → decisions
```

### Reglas de Aislamiento

- **Siempre** filtrar por `organizationId` en todas las queries.
- Nunca exponer datos de una organizacion a otro, sin excepción.
- Validación de pertenencia antes de cualquier mutación.

```typescript
// ✅ CORRECTO — Filtro obligatorio por organización
const sessions = await ctx.db.simulationSession.findMany({
  where: {
    organizationId: ctx.session.user.organizationId, // ← CRÍTICO
    workspaceId: input.workspaceId,
  },
})

// ❌ INCORRECTO — Query sin scope de tenant
const sessions = await ctx.db.simulationSession.findMany({
  where: { workspaceId: input.workspaceId },
})
```

---

## Convenciones de Código

### Nomenclatura

```typescript
// Archivos
decision - form.tsx // components  → kebab-case
use - simulation - timer.ts // hooks       → kebab-case con prefijo 'use'
simulation - engine.ts // services    → kebab-case
calculation.ts // helpers     → kebab-case
simulation.types.ts // types       → kebab-case con sufijo '.types'

// Variables y funciones
const userId = '123' // camelCase
function calculateImpact() // camelCase
const MAX_ROUNDS = 15 // UPPER_SNAKE_CASE para constantes

// Tipos, interfaces y clases
interface User {} // PascalCase
type SessionStatus = 'active' | 'paused' // PascalCase
enum DecisionCategory {} // PascalCase
class SimulationEngine {} // PascalCase
```

### Orden de Imports

```typescript
import { useState } from 'react' // 1. Externos
import { prisma } from '@/lib/prisma' // 2. Configuración/lib
import { Button } from '@/components' // 3. Componentes UI
import { useAuth } from '@/modules/auth' // 4. Módulos
import type { Session } from '@/modules/simulation/types' // 5. Types
```

### Patrones de Componentes

```typescript
// ✅ Server Component por defecto
export default async function SimulationDashboard({ params }: Props) {
  const session = await getSession()
  return <div>...</div>
}

// ✅ Client Component solo cuando hay interactividad
'use client'
export function DecisionForm() {
  const [state, setState] = useState()
  return <form>...</form>
}

// ✅ Hook personalizado cuando el componente supera ~80 líneas de JSX
export function useSimulationState(sessionId: string) {
  return useQuery({
    queryKey: ['simulation', sessionId],
    queryFn: () => api.simulation.getSession.query({ sessionId }),
  })
}
```

### Convenciones tRPC

```typescript
import { procedure, router } from '@/trpc/init'
import { tryCatch }          from '@/shared/utils'
import { authSchema }        from '@/modules/auth/schema'
import type { User }         from '@/modules/auth/types'

// - Schema siempre desde el folder del módulo
// - ctx.db es el Prisma client inyectado por el contexto
// - APIResult<T> es el tipo estándar de respuesta
// - tryCatch envuelve operaciones que pueden fallar
// - Mensajes de success/error en @/lib/i18n/lang (nunca inline)

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

### Sistema de Rutas

- Usa siempre el sistema centralizado de rutas con `RouteParams` tipado.
- **Nunca** construyas rutas con string literals directos.
- Respeta la jerarquía: `org → workspace → recurso`.

---

## Requerimientos No Funcionales

### Seguridad

- Multi-tenancy con aislamiento estricto por `organizationId`
- Validación con Zod en todos los inputs de tRPC
- Sanitización de contenido user-generated
- Nunca exponer errores internos al cliente

### Performance

- Redis para estado de sesiones activas
- Optimistic updates en UI (no esperar al backend para reflejar cambios)
- Paginación siempre en listas grandes
- Índices verificados en columnas filtradas frecuentemente

### Escalabilidad

- API routes stateless (sin estado de sesión en memoria)
- Background jobs con Bull para procesos largos
- WebSockets con namespaces aislados por sesión

### Real-time

- Un namespace de WebSocket por sesión activa
- Sincronización multi-usuario con resolución de conflictos en el StateManager
- Chat integrado dentro del canal de la simulación

---

# PARTE 4 · PROTOCOLO DE TRABAJO

---

## FASE 0 — ORIENTACIÓN OBLIGATORIA

> **Ejecutar SIEMPRE al inicio de cualquier tarea, sin excepción.**

### 0.1 · Leer el plan de desarrollo

Busca archivos como `PLAN.md`, `ROADMAP.md`, `TODO.md`, `docs/plan.md` o similares.

Si existe, identifica:

- ¿Qué features están pendientes y cuál es la prioridad actual?
- ¿Hay decisiones de arquitectura documentadas que deba respetar?

Si **no existe**, notifícalo y procede con la tarea solicitada.

### 0.2 · Validar el estado actual

- Revisa los archivos relevantes para la tarea en curso.
- Identifica patrones existentes (naming, estructura de carpetas, exports, hooks).
- Detecta implementaciones parciales o incompletas relacionadas.
- **Nunca asumas** — lee el código real antes de actuar.

### 0.3 · Aplicar Skills disponibles

Antes de proceder, identifica y lee los skills aplicables a la tarea:

| Skill | Cuándo aplicarlo |
| --- | --- |
| `brainstorming` | Cuando la solución no es obvia o hay múltiples enfoques posibles. Úsalo en Fase 1 antes de comprometerte con un approach. |
| `vercel-react-best-practices` | Antes de escribir cualquier componente React o configurar Next.js. Este skill es la fuente de verdad para patrones de App Router. |
| `web-design-guidelines` | Antes de implementar cualquier componente visual. Este skill define el estándar de diseño del proyecto. |

> Los skills en `/mnt/skills/` complementan este documento. En caso de conflicto, el skill tiene precedencia sobre las reglas generales de este archivo, excepto en convenciones específicas de Ascendia (multi-tenancy, sistema de rutas, tRPC patterns).

---

## FASE 1 — ANÁLISIS Y PLANEACIÓN

Antes de implementar, responde explícitamente estas preguntas:

1. **¿Qué se va a construir?** — Describe la feature con tus propias palabras.
2. **¿Dónde vive en la arquitectura?** — Ruta, módulo, contexto (org / workspace).
3. **¿Qué archivos existentes se modificarán?** — Lista completa con paths.
4. **¿Qué archivos nuevos se crearán?** — Con su path exacto.
5. **¿Hay dependencias o efectos secundarios?** — Rutas, stores, tipos, etc.
6. **¿Existen patrones en el proyecto que deba seguir?** — Cita ejemplos concretos.
7. **¿Cuál es el patrón de UI correcto?** — Aplica el árbol de decisión de Fase 3.

> Si la solución tiene múltiples enfoques válidos y no es obvia, aplica el skill `brainstorming` aquí antes de continuar.

No procedas a implementar hasta tener este análisis completo.

---

## FASE 2 — ESTÁNDARES DE CÓDIGO

### Principios Generales

- **Consistencia sobre preferencia personal** — Si el proyecto usa un patrón, úsalo.
- **Lee antes de escribir** — Examina archivos existentes para entender convenciones locales.
- **Sin código muerto** — No dejes `console.log`, imports no usados ni código comentado.
- **TypeScript estricto** — Tipos explícitos siempre. Sin `any`.

### Next.js y React

> **Aplica el skill `vercel-react-best-practices`** antes de escribir componentes o configurar rutas. Este skill es la fuente de verdad para las convenciones de App Router, Server/Client Components, y patrones de data fetching.

Convenciones específicas de Ascendia que complementan el skill:

- Server Components por defecto; Client Components solo cuando hay interactividad real.
- Extrae lógica a custom hooks cuando el componente supera ~80 líneas de JSX.
- Un componente = una responsabilidad.
- Usa el sistema centralizado de rutas con `RouteParams` tipado (nunca string literals).

### Estructura y Organización

- Respeta la estructura de carpetas existente (ver Parte 3).
- Coloca cada archivo exactamente donde el proyecto lo espera.
- Sigue el casing del proyecto sin desviaciones.

---

## FASE 3 — ARQUITECTURA DE UI Y PATRONES DE INTERACCIÓN

Define **cómo y dónde** se presenta cada feature. Aplica estas reglas antes de escribir cualquier componente visual.

### 3.1 · Regla de Formularios

La complejidad determina el contenedor:

#### MODAL — Formularios pequeños (≤ 3 campos)

Úsalo cuando:

- El formulario tiene **3 campos o menos**.
- La acción es puntual y no requiere contexto adicional.
- El usuario no necesita navegar a otro lugar para completarla.

Criterios de calidad:

- Título claro que describe la acción (no la entidad).
- Un solo CTA primario; cancelar siempre disponible.
- Validación inline, nunca en alert/toast.
- El modal no debe hacer scroll — si necesita scroll, el formulario es demasiado grande.
- Cierre automático al completar con éxito + feedback (toast/badge).

✅ Ejemplos: "Crear workspace" (nombre) · "Renombrar elemento" · "Invitar miembro" (email + rol)

#### PÁGINA DEDICADA — Formularios complejos (> 3 campos)

Úsala cuando:

- El formulario tiene **más de 3 campos**.
- Requiere secciones, grupos lógicos o pasos.
- El usuario necesita contexto visual mientras llena.

Estructura de ruta esperada:

```
/[organization]/[workspace]/[entidad]/new
/[organization]/[workspace]/[entidad]/[id]/edit
```

Criterios de calidad:

- Header con breadcrumb que contextualiza dónde está el usuario.
- Campos agrupados en secciones con títulos descriptivos.
- Acciones fijas (sticky) al fondo o en el header — nunca enterradas al final del scroll.
- Posibilidad de guardar borrador si el formulario es extenso.
- Navegación de vuelta clara con confirmación si hay cambios sin guardar.

✅ Ejemplos: "Configuración de organización" · "Crear proyecto" (nombre, descripción, visibilidad, miembros, fechas)

---

### 3.2 · Regla de Agrupación por Entidad

Cuando múltiples features o acciones pertenecen a la misma entidad, **no las disperses**.

#### ACCIONES CONTEXTUALES (entidad sin página propia)

- Agrupa las acciones en un **dropdown menu** o **action bar** asociado al ítem.
- Cada acción dispara su propio modal (respetando la regla de formularios).
- Las acciones destructivas van separadas visualmente (divider) y requieren confirmación.

✅ Ejemplo: Card de miembro → `[···]` → "Cambiar rol" | "Transferir" | ─── | "Eliminar"

#### TABS — Entidad con página propia y múltiples aspectos

Úsalos cuando existe una **página de detalle** (`/org/[id]`, `/workspace/[id]`) y hay múltiples dominios relacionados con esa entidad.

Criterios de calidad:

- La URL debe reflejar el tab activo: `/org/[id]?tab=members` o `/org/[id]/members`.
- El tab activo persiste al recargar.
- Cada tab carga su contenido de forma independiente.
- Los tabs con contadores muestran el número junto al label: `Miembros (12)`.

Estructura de tabs para entidades principales:

```
Organización
├── General     → Nombre, logo, configuración base
├── Miembros    → Lista + invitar (modal 2 campos) + gestionar roles
├── Invitaciones → Pendientes + reenviar + revocar
├── Workspaces  → Lista + crear (modal o página según campos)
├── Facturación → Plan actual, historial, métodos de pago
└── Peligro     → Acciones destructivas (transferir, eliminar)

Workspace
├── General     → Nombre, descripción, configuración
├── Miembros    → Miembros + agregar desde org
├── Permisos    → Roles y accesos
└── Configuración → Integraciones, notificaciones, danger zone
```

---

### 3.3 · Árbol de Decisión Rápida

Ante cualquier feature nueva:

```
¿Es una acción sobre una entidad existente?
│
├── SÍ → ¿Existe página single de esa entidad?
│         ├── SÍ → ¿Es un aspecto distinto?      → NUEVO TAB
│         │        ¿Es una acción puntual?         → ACCIÓN EN EL TAB
│         └── NO → ¿Tiene formulario?
│                   ├── ≤ 3 campos                → MODAL
│                   └── > 3 campos                → PÁGINA DEDICADA
│
└── NO → ¿Es creación de entidad nueva?
          ├── ≤ 3 campos                           → MODAL
          └── > 3 campos                           → PÁGINA /new
```

---

## FASE 4 — DISEÑO VISUAL

> **Aplica el skill `web-design-guidelines`** antes de implementar cualquier componente visual. Ese skill define el estándar de diseño del proyecto.

Las siguientes reglas son **específicas de Ascendia** y complementan (sin reemplazar) el skill:

### Restricciones del Proyecto

- **Obligatorio:** Usa exclusivamente los componentes del UI system del proyecto (shadcn/ui + Radix).
- Antes de crear un componente visual, verifica si ya existe en el UI system.
- Compón primitivos del sistema; no reinventes botones, inputs, modales, tabs.

> **Uso de componentes** los componentes del UI system estan la carpeta @/shared/components. los componentes con base shadcn/ui + Radix se utilizan según la documentación o uso especifico, los componentes reutilizables se utilizan en coherencia con la nececidad (ejemplos: titulos o headings usa el componente `Title`, para textos se usa el componente `P`, para los iconos se utiliza `Icon` con sus variantes)

### Tokens del Sistema

- Colores semánticos: `--primary`, `--muted`, `--destructive`, `--background`, etc.
- Spacing basado en los tokens de Tailwind del proyecto (no valores arbitrarios).
- Escala tipográfica definida en el proyecto — no inventes tamaños.

### Estados Obligatorios

Todos los elementos interactivos deben implementar: `default` · `hover` · `focus` · `disabled` · `loading`.

### Responsividad

- Todo componente debe funcionar en mobile, tablet y desktop.
- Los modales en mobile ocupan pantalla completa (bottom sheet o full modal).
- Las tabs en mobile colapsan a selector/dropdown si no caben.

### Empty y Error States

- Empty states: ilustración/icono + copy accionable (nunca dejar en blanco).
- Error states: causa clara + acción concreta para resolver.
- Loading states: skeletons sobre spinners cuando sea posible.

---

## FASE 5 — PROCESO DE IMPLEMENTACIÓN

### Orden de Trabajo

1. Completar Fase 0 (leer plan, código existente y skills relevantes).
2. Completar Fase 1 (análisis escrito antes de escribir código).
3. Decidir el patrón de UI correcto (Fase 3) y documentarlo.
4. Implementar tipos/interfaces primero si aplica.
5. Implementar lógica (hooks, server actions, helpers).
6. Implementar UI sobre la lógica ya lista.
7. Verificar integración con el sistema de rutas y el sidebar contextual.

### Checklist Antes de Entregar

- [ ] Se leyó el plan de desarrollo y el estado actual de implementaciones.
- [ ] Se identificaron y aplicaron los skills relevantes (`brainstorming`, `vercel-react-best-practices`, `web-design-guidelines`).
- [ ] Se eligió el patrón de UI correcto con justificación explícita.
- [ ] Se usaron los componentes del UI system — ningún elemento visual se reinventó.
- [ ] Las acciones de una misma entidad están agrupadas coherentemente.
- [ ] Todos los estados visuales están implementados (`default`, `hover`, `focus`, `disabled`, `loading`).
- [ ] Los tipos son correctos y completos (sin `any`).
- [ ] El sistema de rutas se usa correctamente con `RouteParams`.
- [ ] No hay imports no usados, `console.log` ni código comentado.
- [ ] El aislamiento multi-tenant está aplicado en todas las queries (`organizationId`).

---

# PARTE 5 · COMPORTAMIENTO Y COMUNICACIÓN

## Lo que SIEMPRE haces

- Reportas qué encontraste en el plan de desarrollo antes de actuar.
- Declaras explícitamente qué patrón de UI elegiste y por qué.
- Explicas brevemente tu decisión de arquitectura si no es obvia.
- Preguntas UNA sola cosa concreta si algo es ambiguo — antes de proceder.
- Indicas qué archivos creaste/modificaste al final con una lista clara.

## Lo que NUNCA haces

- Asumir la estructura del proyecto sin leerla primero.
- Crear componentes visuales sin usar el UI system del proyecto.
- Saltarte la Fase 0 porque "parece sencillo".
- Construir rutas como string literals.
- Mezclar acciones de distintas entidades sin agrupación coherente.
- Poner formularios complejos en modales o formularios simples en páginas dedicadas.
- Dispersar features de una entidad en distintos lugares de la UI.
- Entregar código con `any`, imports muertos o `console.log`.
- Ignorar los skills disponibles antes de implementar.

---

## UX Writing — Tono del Producto

**Objetivo:** Hablar como un coach humano — empático, directo y con curiosidad genuina.

| ✅  | Cercano pero profesional    |
| --- | --------------------------- |
| ✅  | Acompañante, no autoritario |
| ✅  | Reflexivo pero ligero       |
| ✅  | Positivo sin exagerar       |

```typescript
// ✅ CORRECTO
const messages = {
  decisionSaved: '¡Decisión registrada! Veremos su impacto al finalizar la ronda.',
  roundComplete: 'Ronda completada. Veamos cómo les fue como equipo...',
  lowResources: 'Los recursos están bajando rápidamente. Es momento de colaborar 🤝',
  aiSuggestion: 'He notado un patrón interesante. ¿Quieres que te lo muestre?',
}

// ❌ INCORRECTO
const messages = {
  decisionSaved: 'Decision registered successfully in database.',
  roundComplete: 'Round status updated to completed.',
  lowResources: 'Resource threshold warning triggered.',
  aiSuggestion: 'Pattern detected. Click here for analysis.',
}
```
