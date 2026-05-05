import { ScenarioType, ScenarioDifficulty, Status } from "@prisma/client";
import { ScenarioMock } from "@/modules/scenario/types";

export const supplyChainScenario: ScenarioMock = {
  id: "cuid_scenario_supply_chain_001",
  name: "Supply Chain Masters",
  slug: "supply-chain-masters",
  description:
    "Red de suministro global compartida. Gestiona semiconductores, logística y talento bajo crisis geopolíticas, pandémicas y regulatorias. Cada decisión individual afecta el ecosistema completo.",
  category: ScenarioType.SUPPLY_CHAIN,
  difficulty: ScenarioDifficulty.ADVANCED,
  maxPlayers: 4,
  totalRounds: 15,
  isTemplate: true,
  status: Status.ACTIVE,
  createdById: null,
  createdAt: new Date("2026-01-15T08:00:00Z"),
  updatedAt: new Date("2026-03-10T12:00:00Z"),
  config: {
    resources: [
      {
        id: "semiconductors",
        name: "Semiconductores",
        description: "Componente central para producción de hardware tecnológico",
        totalCapacity: 1000,
        regenerationRate: 0.15,
        criticalThreshold: 200,
        criticalPenalty: "Precios se disparan x3 por escasez",
        isPrimary: true,
      },
      {
        id: "logistics",
        name: "Capacidad Logística",
        description: "Contenedores disponibles para distribución global",
        totalCapacity: 500,
        regenerationRate: 0.1,
        criticalThreshold: 100,
        criticalPenalty: "Retrasos de entrega +45 días",
        isPrimary: false,
      },
      {
        id: "talent",
        name: "Mano de Obra Especializada",
        description: "Ingenieros y especialistas globales disponibles",
        totalCapacity: 300,
        regenerationRate: 0.05,
        criticalThreshold: 60,
        criticalPenalty: "Rotación +8% por competencia agresiva",
        isPrimary: false,
      },
      {
        id: "capital",
        name: "Capital de Trabajo",
        description: "Liquidez del mercado para financiamiento operacional",
        totalCapacity: 10_000_000, // $10M en USD
        regenerationRate: 0.0, // variable según demanda agregada
        criticalThreshold: 2_000_000,
        criticalPenalty: "Tasas de interés +25%, acceso restringido",
        isPrimary: false,
      },
    ],
    phases: [
      {
        phase: 1,
        name: "Estabilidad Aparente",
        rounds: [1, 5],
        focus: "Optimización individual y establecimiento de posición competitiva",
        events: [],
      },
      {
        phase: 2,
        name: "Crisis Múltiples",
        rounds: [6, 10],
        focus: "Adaptabilidad y gestión de crisis encadenadas",
        events: [
          {
            round: 6,
            id: "pandemic_logistics",
            title: "Pandemia Global",
            description: "Cuarentenas internacionales reducen capacidad logística",
            impact: { logistics: -0.3 },
          },
          {
            round: 8,
            id: "trade_war",
            title: "Guerra Comercial",
            description: "Aranceles limitan acceso a semiconductores asiáticos",
            impact: { semiconductors: -0.4 },
          },
          {
            round: 10,
            id: "financial_crisis",
            title: "Crisis Financiera",
            description: "Contracción del crédito reduce capital disponible",
            impact: { capital: -0.5 },
          },
        ],
      },
      {
        phase: 3,
        name: "Nueva Normalidad",
        rounds: [11, 15],
        focus: "Rediseño estratégico, sostenibilidad y colaboración sistémica",
        events: [
          {
            round: 13,
            id: "green_regulation",
            title: "Regulación Ambiental",
            description: "Nuevas normas aumentan costos para operaciones no-verdes",
            impact: { capital: -0.2 },
          },
        ],
      },
    ],
    roles: [
      {
        id: "chief_supply_officer",
        name: "Chief Supply Officer",
        activePhases: [1],
        isRotating: false,
        abilities: [
          "Acceso a inventarios globales en tiempo real",
          "Proponer acuerdos de compartir pronósticos",
          "Visibilidad end-to-end de la cadena",
        ],
        responsibility: "Establecer transparencia y coordinación temprana del ecosistema",
      },
      {
        id: "crisis_manager",
        name: "Crisis Manager",
        activePhases: [2],
        isRotating: false,
        abilities: [
          "Anticipa eventos de riesgo 1 ronda antes",
          "Coordinar respuestas de emergencia inter-empresa",
          "Activar reservas estratégicas compartidas",
        ],
        responsibility: "Minimizar el impacto sistémico durante disrupciones",
      },
      {
        id: "sustainability_leader",
        name: "Sustainability Leader",
        activePhases: [3],
        isRotating: false,
        abilities: [
          "Acceso a incentivos gubernamentales verdes",
          "Liderar iniciativas de cadena sostenible",
          "Desbloqueár certificaciones ambientales grupales",
        ],
        responsibility: "Transformación verde sistémica del ecosistema",
      },
      {
        id: "partnership_director",
        name: "Strategic Partnership Director",
        activePhases: [1, 2, 3],
        isRotating: true,
        abilities: [
          "Facilitar negociaciones entre empresas rivales",
          "Crear contratos vinculantes entre rondas",
          "Mediar en disputas de recursos compartidos",
        ],
        responsibility: "Diplomacia empresarial y gobernanza del ecosistema",
      },
    ],
    decisionCategories: [
      {
        id: "procurement",
        name: "Producción & Procurement",
        timeMinutes: 8,
        options: [
          {
            id: "semiconductors_qty",
            label: "Semiconductores a adquirir",
            choices: ["0–25 (bajo)", "26–60 (moderado)", "61–100 (agresivo)"],
          },
          {
            id: "inventory_strategy",
            label: "Estrategia de inventario",
            choices: ["Stock alto (seguridad)", "Just-in-Time (eficiencia)", "Partnerships (colaboración)"],
          },
          {
            id: "supplier_diversification",
            label: "Diversificación de proveedores",
            choices: ["Proveedor único (-costo)", "Dual sourcing (balance)", "Multi-source (+costo, -riesgo)"],
          },
        ],
      },
      {
        id: "logistics",
        name: "Logística & Distribución",
        timeMinutes: 8,
        options: [
          {
            id: "containers",
            label: "Contenedores a reservar",
            choices: ["0–15 (mínimo)", "16–30 (estándar)", "31–50 (máximo)"],
          },
          {
            id: "routes",
            label: "Estrategia de rutas",
            choices: ["Directas (rápido/caro)", "Consolidadas (lento/barato)", "Híbrida (adaptativa)"],
          },
          {
            id: "warehousing",
            label: "Almacenaje",
            choices: ["Centros propios", "Compartidos con ecosystem", "Third-party logistics"],
          },
        ],
      },
      {
        id: "human_resources",
        name: "Recursos Humanos",
        timeMinutes: 8,
        options: [
          {
            id: "hiring",
            label: "Estrategia de contratación",
            choices: [
              "Competir agresivamente por talento",
              "Desarrollo interno",
              "Consorcio de formación colaborativa",
            ],
          },
          {
            id: "retention",
            label: "Retención de talento",
            choices: ["Cultura y desarrollo", "Salarios competitivos", "Equity y largo plazo"],
          },
        ],
      },
      {
        id: "financial_strategy",
        name: "Estrategia Financiera",
        timeMinutes: 8,
        options: [
          {
            id: "capital_allocation",
            label: "Uso del capital",
            choices: ["Reservas estratégicas", "Inversión en crecimiento", "Mantener liquidez máxima"],
          },
          {
            id: "sustainability_investment",
            label: "Inversión en sostenibilidad",
            choices: ["Sin inversión (corto plazo)", "Inversión moderada", "All-in verde (largo plazo)"],
          },
        ],
      },
    ],
    scoring: [
      {
        id: "financial_performance",
        name: "Performance Financiero",
        weight: 0.3,
        description: "Margen de beneficio, ROI y gestión de cash flow",
        kpis: ["Margen neto por unidad", "ROI en inversiones estratégicas", "Cash flow operacional"],
      },
      {
        id: "operational_resilience",
        name: "Resiliencia Operacional",
        weight: 0.25,
        description: "Capacidad de mantener producción durante disrupciones",
        kpis: ["% producción mantenida en crisis", "Tiempo de recuperación post-crisis", "Índice de diversificación"],
      },
      {
        id: "ecosystem_sustainability",
        name: "Sostenibilidad del Ecosistema",
        weight: 0.25,
        description: "Contribución a la regeneración y estabilidad de recursos compartidos",
        kpis: [
          "Contribución neta a recursos comunes",
          "Comportamiento extractivo vs. regenerativo",
          "Índice de colaboración",
        ],
      },
      {
        id: "leadership_innovation",
        name: "Liderazgo e Innovación",
        weight: 0.2,
        description: "Iniciativas que benefician al ecosistema completo",
        kpis: [
          "Iniciativas sistémicas lideradas",
          "Adaptación a regulaciones",
          "Nuevos modelos de colaboración creados",
        ],
      },
    ],
    competencies: [
      {
        id: "systemic_thinking",
        name: "Pensamiento Sistémico",
        range: [0, 100],
        indicator: "Decisiones que consideran efectos cascada en el ecosistema",
        benchmark: "Leaders piensan 3+ pasos adelante y mantienen 80%+ performance en crisis",
      },
      {
        id: "adaptive_leadership",
        name: "Liderazgo Adaptativo",
        range: [0, 100],
        indicator: "Flexibilidad en estrategia ante disrupciones inesperadas",
        benchmark: "Resilientes mantienen 80%+ performance durante crisis",
      },
      {
        id: "long_term_vision",
        name: "Visión a Largo Plazo",
        range: [0, 100],
        indicator: "Inversiones en sostenibilidad antes de que sean reguladas",
        benchmark: "Visionarios obtienen 40%+ de premium por sostenibilidad en rondas 11–15",
      },
      {
        id: "collaborative_leadership",
        name: "Liderazgo Colaborativo",
        range: [0, 100],
        indicator: "Iniciativas que benefician múltiples players del ecosistema",
        benchmark: "Colaboradores generan 25%+ de valor adicional vs. estrategias independientes",
      },
    ],
  },
};

export const retailMarketingScenario: ScenarioMock = {
  id: "cuid_scenario_retail_marketing_001",
  name: "Retail Wars",
  slug: "retail-wars",
  description:
    "Eres Director de Marketing de una cadena retail compitiendo por la atención de un consumidor saturado. Gestiona campañas, influencers y espacios publicitarios premium a través de 4 temporadas con crisis virales, cambios de algoritmo y disrupciones regulatorias.",
  category: ScenarioType.MARKETING,
  difficulty: ScenarioDifficulty.INTERMEDIATE,
  maxPlayers: 4,
  totalRounds: 12,
  isTemplate: true,
  status: Status.ACTIVE,
  createdById: null,
  createdAt: new Date("2026-01-15T08:00:00Z"),
  updatedAt: new Date("2026-03-10T12:00:00Z"),
  config: {
    resources: [
      {
        id: "consumer_attention",
        name: "Atención del Consumidor",
        description: "Mind share total disponible en el mercado por ronda",
        totalCapacity: 10_000,
        regenerationRate: 0.08,
        criticalThreshold: 12_000, // saturación, no escasez
        criticalPenalty: "Fatiga del consumidor reduce efectividad de campañas al 50%",
        isPrimary: true,
      },
      {
        id: "influencers",
        name: "Influencers & KOLs",
        description: "Pool global de creadores disponibles por ronda",
        totalCapacity: 200,
        regenerationRate: 0.075, // +15 nuevos por ronda
        criticalThreshold: 40,
        criticalPenalty: "Burn-out reduce credibilidad: -30% efectividad",
        isPrimary: false,
      },
      {
        id: "prime_media",
        name: "Prime Media Spots",
        description: "Espacios publicitarios premium: TV, Social Top, OOH",
        totalCapacity: 180, // TV 50 + Social 100 + OOH 30
        regenerationRate: 0.0, // renovación semanal, precio sube con demanda
        criticalThreshold: 30,
        criticalPenalty: "Efectividad -20% si múltiples competidores usan el mismo slot",
        isPrimary: false,
      },
      {
        id: "trend_points",
        name: "Seasonal Trend Points",
        description: "Puntos de tendencia disponibles por temporada",
        totalCapacity: 500,
        regenerationRate: 0.0, // se resetea por temporada
        criticalThreshold: 100,
        criticalPenalty: "Cada adopción adicional de tendencia reduce beneficio 15%",
        isPrimary: false,
      },
      {
        id: "research_budget",
        name: "Research Budget Pool",
        description: "Presupuesto colaborativo para insights de consumidor",
        totalCapacity: 5_000_000, // $5M USD
        regenerationRate: 0.0,
        criticalThreshold: 500_000,
        criticalPenalty: "Sin datos compartidos, costo de insights exclusivos aumenta 4x",
        isPrimary: false,
      },
    ],
    phases: [
      {
        phase: 1,
        name: "Back to School",
        rounds: [1, 3],
        focus: "Establecer posicionamiento de marca vs. competencia. Público: familias y jóvenes",
        events: [],
      },
      {
        phase: 2,
        name: "Holiday Season",
        rounds: [4, 6],
        focus: "Compradores de regalos e impulso. Tendencias: experiencias y premium gifting",
        events: [
          {
            round: 5,
            id: "brand_scandal",
            title: "Escándalo Viral de Marca Líder",
            description: "La marca dominante enfrenta controversia pública",
            impact: { consumer_attention: -0.4 }, // -40% confianza sectorial
          },
        ],
      },
      {
        phase: 3,
        name: "New Year Reset",
        rounds: [7, 9],
        focus: "Consumidores aspiracionales. Tendencias: Health & Wellness y Minimalismo",
        events: [
          {
            round: 8,
            id: "privacy_regulation",
            title: "Nueva Regulación de Privacidad",
            description: "Restricciones de datos reducen la efectividad de publicidad dirigida",
            impact: { research_budget: -0.6 },
          },
        ],
      },
      {
        phase: 4,
        name: "Spring Renewal",
        rounds: [10, 12],
        focus: "Early adopters y lifestyle. Tendencias: marcas locales y autenticidad",
        events: [
          {
            round: 11,
            id: "algorithm_change",
            title: "Cambio de Algoritmo de Plataforma Dominante",
            description: "Red social principal modifica su sistema de distribución orgánica",
            impact: { prime_media: -0.5 },
          },
        ],
      },
    ],
    roles: [
      {
        id: "brand_guardian",
        name: "Brand Guardian",
        activePhases: [1, 2],
        isRotating: false,
        abilities: [
          "Acceso a brand health metrics avanzados",
          "Liderar iniciativas de category elevation",
          "Vista anticipada de sentiment shifts",
        ],
        responsibility: "Proteger y construir equity de marca a largo plazo para toda la categoría",
      },
      {
        id: "growth_hacker",
        name: "Growth Hacker",
        activePhases: [2, 3],
        isRotating: false,
        abilities: [
          "Ve oportunidades de growth 1 ronda antes",
          "Acceso a datos de attribution avanzados",
          "Desbloqueár canales experimentales",
        ],
        responsibility: "Identificar y capitalizar oportunidades de crecimiento antes que la competencia",
      },
      {
        id: "cx_chief",
        name: "Customer Experience Chief",
        activePhases: [3, 4],
        isRotating: false,
        abilities: [
          "Datos completos del customer journey",
          "Proponer iniciativas cross-industry",
          "Acceso a loyalty data consolidado",
        ],
        responsibility: "Orquestar experiencias omnicanal que eleven el estándar de la categoría",
      },
      {
        id: "culture_catalyst",
        name: "Culture Catalyst",
        activePhases: [1, 2, 3, 4],
        isRotating: true,
        abilities: [
          "Social listening avanzado en tiempo real",
          "Liderar movements y campañas de propósito",
          "Identificar tendencias culturales emergentes",
        ],
        responsibility: "Crear conexiones emocionales auténticas entre marcas y consumidores",
      },
    ],
    decisionCategories: [
      {
        id: "campaign_strategy",
        name: "Campaign Strategy",
        timeMinutes: 10,
        options: [
          {
            id: "budget_allocation",
            label: "Asignación de presupuesto",
            choices: ["TV (alto impacto, caro)", "Digital (segmentado, medible)", "Experiential (memorable, riesgoso)"],
          },
          {
            id: "message_positioning",
            label: "Posicionamiento del mensaje",
            choices: ["Price Leadership", "Quality Premium", "Values-Driven", "Innovation Leader"],
          },
          {
            id: "target_segmentation",
            label: "Segmentación de audiencia",
            choices: ["Mass Market", "Niche Premium", "Gen Z", "Familias", "Profesionales"],
          },
        ],
      },
      {
        id: "channel_mix",
        name: "Channel Mix",
        timeMinutes: 10,
        options: [
          {
            id: "paid_media",
            label: "Paid Media",
            choices: ["TV Prime (50–500 pts)", "Social Ads (100–1000 pts)", "OOH Premium (20–200 pts)"],
          },
          {
            id: "earned_media",
            label: "Earned Media",
            choices: ["PR Stunts", "Influencer Partnerships", "Community Building"],
          },
        ],
      },
      {
        id: "creative_content",
        name: "Creative & Content",
        timeMinutes: 10,
        options: [
          {
            id: "creative_risk",
            label: "Nivel de riesgo creativo",
            choices: ["Safe / Predictable", "Bold / Controversial", "Trendjacking"],
          },
          {
            id: "content_format",
            label: "Formato de contenido",
            choices: ["Video / Stories", "Static / Display", "Interactive / AR", "User-Generated"],
          },
          {
            id: "influencer_tier",
            label: "Tipo de influencer",
            choices: [
              "Mega-influencers (alto reach, caro)",
              "Micro-influencers (engagement auténtico)",
              "Nano-influencers (confianza, escala)",
            ],
          },
        ],
      },
      {
        id: "merchandising",
        name: "Merchandising & Retail Experience",
        timeMinutes: 10,
        options: [
          {
            id: "in_store",
            label: "Experiencia en tienda",
            choices: ["Layout tradicional", "Experience zones", "Pop-up concepts"],
          },
          {
            id: "promo_strategy",
            label: "Estrategia promocional",
            choices: ["Descuentos (volumen)", "Bundles (value perception)", "Loyalty programs (retención)"],
          },
        ],
      },
      {
        id: "data_analytics",
        name: "Data & Analytics",
        timeMinutes: 10,
        options: [
          {
            id: "research_investment",
            label: "Inversión en investigación",
            choices: [
              "Insights exclusivos ($2M, solo para ti)",
              "Insights compartidos ($500K, hasta 3 players)",
              "Sin inversión (datos públicos)",
            ],
          },
          {
            id: "personalization",
            label: "Nivel de personalización",
            choices: ["Campañas masivas", "Segmentadas", "1-to-1 personalización"],
          },
        ],
      },
    ],
    scoring: [
      {
        id: "brand_awareness",
        name: "Brand Awareness & Recognition",
        weight: 0.25,
        description: "Top-of-mind recall, sentiment y share of voice",
        kpis: ["Top-of-mind en segmento objetivo", "Brand NPS", "Share of voice vs. share of market"],
      },
      {
        id: "sales_roi",
        name: "Sales Performance & ROI",
        weight: 0.3,
        description: "Revenue generado, ROAS y eficiencia de adquisición",
        kpis: ["Return on Ad Spend (ROAS)", "Customer Acquisition Cost", "Customer Lifetime Value ratio"],
      },
      {
        id: "market_leadership",
        name: "Market Leadership & Innovation",
        weight: 0.2,
        description: "Trends iniciados, reconocimiento y disrupción de categoría",
        kpis: ["Trends iniciados vs. adoptados", "Industry awards", "Disruption score"],
      },
      {
        id: "ecosystem_health",
        name: "Ecosystem Health & Sustainability",
        weight: 0.25,
        description: "Contribución a la elevación de la categoría y prácticas responsables",
        kpis: [
          "Category growth durante colaboración",
          "Prácticas de marketing responsable",
          "Iniciativas de research compartido",
        ],
      },
    ],
    competencies: [
      {
        id: "strategic_marketing_thinking",
        name: "Pensamiento Estratégico de Marketing",
        range: [0, 100],
        indicator: "Balance entre brand-building y performance marketing",
        benchmark: "Masters mantienen split 60/40 brand vs. performance",
      },
      {
        id: "consumer_empathy",
        name: "Consumer Empathy & Insight",
        range: [0, 100],
        indicator: "Precisión en predicción de respuesta del consumidor",
        benchmark: "Expertos predicen con 80%+ accuracy",
      },
      {
        id: "creative_risk_management",
        name: "Creative Risk Management",
        range: [0, 100],
        indicator: "Balance entre breakthrough creativo y riesgo de backlash",
        benchmark: "Leaders logran 2.5x mejor performance con igual nivel de riesgo",
      },
      {
        id: "digital_adaptability",
        name: "Adaptabilidad Digital",
        range: [0, 100],
        indicator: "Velocidad de adopción de nuevas plataformas y tecnologías",
        benchmark: "Digital natives capturan 60%+ del early adopter value",
      },
    ],
  },
};

export const outsourcingScenario: ScenarioMock = {
  id: "cuid_scenario_outsourcing_001",
  name: "Outsourcing Alliance",
  slug: "outsourcing-alliance",
  description:
    "Eres Managing Director de una firma de outsourcing especializada (IT, BPO, KPO) compitiendo y colaborando simultáneamente en un ecosistema global de servicios. Gestiona talento, contratos enterprise y reputación sectorial a lo largo de 4 trimestres con crisis de datos, guerras de talento y disrupciones de IA.",
  category: ScenarioType.OUTSOURCING,
  difficulty: ScenarioDifficulty.EXPERT,
  maxPlayers: 4,
  totalRounds: 16,
  isTemplate: true,
  status: Status.ACTIVE,
  createdById: null,
  createdAt: new Date("2026-01-15T08:00:00Z"),
  updatedAt: new Date("2026-03-10T12:00:00Z"),
  config: {
    resources: [
      {
        id: "specialized_talent",
        name: "Talento Especializado Global",
        description: "Pool de profesionales Senior, Mid-level y Junior disponibles por ronda",
        totalCapacity: 2000,
        regenerationRate: 0.075,
        criticalThreshold: 400,
        criticalPenalty: "Sobre-demanda aumenta rotación sectorial 25%; war of salaries se activa",
        isPrimary: true,
      },
      {
        id: "enterprise_contracts",
        name: "Contratos Corporativos Enterprise",
        description: "RFPs activos por trimestre en el ecosistema",
        totalCapacity: 50,
        regenerationRate: 0.0,
        criticalThreshold: 10,
        criticalPenalty: "Competencia extrema colapsa márgenes; price wars inevitables",
        isPrimary: false,
      },
      {
        id: "certifications",
        name: "Certificaciones & Compliance",
        description: "Auditorías disponibles: ISO, CMMI, GDPR, SOX, HIPAA",
        totalCapacity: 5,
        regenerationRate: 0.0,
        criticalThreshold: 1,
        criticalPenalty: "Sin certificaciones relevantes, probabilidad de ganar RFPs -30%",
        isPrimary: false,
      },
      {
        id: "shared_infrastructure",
        name: "Infraestructura Tecnológica Compartida",
        description: "Cloud credits y capacidad de centros de datos globales",
        totalCapacity: 2_000_000,
        regenerationRate: 0.0,
        criticalThreshold: 400_000,
        criticalPenalty: "Picos de demanda no cubiertos; SLA breach risk +60%",
        isPrimary: false,
      },
      {
        id: "reputation_capital",
        name: "Reputation Capital Sectorial",
        description: "Awards, case studies y speaking slots disponibles en el ecosistema",
        totalCapacity: 315, // 15 awards + 100 case studies + 200 speaking slots
        regenerationRate: 0.0, // anual
        criticalThreshold: 60,
        criticalPenalty: "Sector reputation bajo presión; pricing power -20%",
        isPrimary: false,
      },
    ],
    phases: [
      {
        phase: 1,
        name: "Q1: Planning & Positioning",
        rounds: [1, 4],
        focus: "Establecer capabilities y market positioning. RFPs dominantes: cost optimization",
        events: [
          {
            round: 3,
            id: "client_consolidation",
            title: "Consolidación de Vendors por Cliente Major",
            description: "Un cliente enterprise anuncia reducción de su base de proveedores",
            impact: { enterprise_contracts: -0.3 },
          },
        ],
      },
      {
        phase: 2,
        name: "Q2: Execution & Scale",
        rounds: [5, 8],
        focus: "Delivery excellence y expansión de contratos. RFPs dominantes: digital transformation",
        events: [
          {
            round: 6,
            id: "data_breach",
            title: "Data Breach en Competidor Líder",
            description: "Brecha de seguridad masiva afecta la confianza en todo el sector",
            impact: { reputation_capital: -0.4 },
          },
          {
            round: 7,
            id: "talent_war",
            title: "Guerra de Talento: Big Tech Sube Salarios 50%",
            description: "Las grandes tecnológicas lanzan offensive de contratación masiva",
            impact: { specialized_talent: -0.35 },
          },
        ],
      },
      {
        phase: 3,
        name: "Q3: Innovation & Partnerships",
        rounds: [9, 12],
        focus: "Servicios next-gen y alianzas estratégicas. RFPs dominantes: AI/ML, cloud migration",
        events: [
          {
            round: 10,
            id: "ai_regulation",
            title: "Nueva Regulación de Compliance para IA",
            description: "Gobiernos exigen auditorías obligatorias para servicios basados en IA",
            impact: { certifications: 1 }, // requiere nueva certificación
          },
          {
            round: 11,
            id: "economic_downturn",
            title: "Desaceleración Económica",
            description: "Clientes corporativos reducen presupuestos de outsourcing",
            impact: { enterprise_contracts: -0.35 },
          },
        ],
      },
      {
        phase: 4,
        name: "Q4: Optimization & Planning",
        rounds: [13, 16],
        focus: "Eficiencia, retención y planificación estratégica del próximo año",
        events: [
          {
            round: 14,
            id: "remote_work_shift",
            title: "Cambio Masivo a Remote Work",
            description: "Crisis sanitaria redefine los modelos de delivery globalmente",
            impact: { shared_infrastructure: -0.4 },
          },
          {
            round: 15,
            id: "consolidation_wave",
            title: "Ola de Consolidación: Fusión de Players Major",
            description: "Dos de los mayores competidores del mercado se fusionan",
            impact: { enterprise_contracts: -0.2, specialized_talent: -0.15 },
          },
        ],
      },
    ],
    roles: [
      {
        id: "client_partner_champion",
        name: "Client Partner Champion",
        activePhases: [1, 2],
        isRotating: false,
        abilities: [
          "Acceso a client satisfaction metrics avanzados",
          "Facilitar joint proposals entre competidores",
          "Vista anticipada de RFPs estratégicos",
        ],
        responsibility: "Elevar la satisfacción general del cliente en todo el ecosistema",
      },
      {
        id: "delivery_excellence_leader",
        name: "Delivery Excellence Leader",
        activePhases: [2, 3],
        isRotating: false,
        abilities: [
          "Visibilidad de best practices cross-industry",
          "Liderar iniciativas de quality standardization",
          "Acceso a SLA benchmarks confidenciales",
        ],
        responsibility: "Establecer estándares de delivery que beneficien a todo el sector",
      },
      {
        id: "innovation_catalyst",
        name: "Innovation Catalyst",
        activePhases: [3, 4],
        isRotating: false,
        abilities: [
          "Early access a emerging technology trends",
          "Proponer iniciativas de innovación industry-wide",
          "Acceso a startup ecosystem para partnerships",
        ],
        responsibility: "Impulsar la evolución de servicios next-generation en el ecosistema",
      },
      {
        id: "ecosystem_orchestrator",
        name: "Ecosystem Orchestrator",
        activePhases: [1, 2, 3, 4],
        isRotating: true,
        abilities: [
          "Facilitar mega-deals que requieren múltiples providers",
          "Acceso a competitive intelligence sanitizado",
          "Crear estructuras de coopetición formales",
        ],
        responsibility: "Generar escenarios win-win para la salud del ecosistema completo",
      },
    ],
    decisionCategories: [
      {
        id: "talent_strategy",
        name: "Talent Strategy & Workforce",
        timeMinutes: 12,
        options: [
          {
            id: "hiring_strategy",
            label: "Estrategia de contratación",
            choices: ["Aggressive recruitment", "Organic growth", "Acquisition de equipos"],
          },
          {
            id: "compensation",
            label: "Modelo de compensación",
            choices: ["Market rate (eficiencia)", "Premium (retención)", "Equity sharing (largo plazo)"],
          },
          {
            id: "workforce_model",
            label: "Modelo de workforce",
            choices: ["Full-time (estabilidad)", "Contract (flexibilidad)", "Gig economy blend (escala)"],
          },
          {
            id: "training",
            label: "Inversión en formación",
            choices: ["Technical upskilling", "Soft skills", "Certification programs colaborativos"],
          },
        ],
      },
      {
        id: "client_portfolio",
        name: "Client Portfolio Management",
        timeMinutes: 12,
        options: [
          {
            id: "rfp_strategy",
            label: "Estrategia de RFPs",
            choices: [
              "Aggressive bidding (bajo margen, alto volumen)",
              "Premium positioning (margen alto)",
              "Selective (nichos especializados)",
            ],
          },
          {
            id: "contract_terms",
            label: "Términos contractuales",
            choices: ["Fixed-price (predecible)", "Time & Materials (flexible)", "Outcome-based (compartir riesgo)"],
          },
          {
            id: "client_relationship",
            label: "Tipo de relación con cliente",
            choices: ["Transaccional (eficiencia)", "Strategic partnership", "Joint ventures (co-inversión)"],
          },
        ],
      },
      {
        id: "partnerships_ecosystem",
        name: "Partnership & Ecosystem",
        timeMinutes: 12,
        options: [
          {
            id: "subcontracting",
            label: "Modelo de delivery",
            choices: [
              "Solo delivery (control total)",
              "Partner ecosystem (co-delivery)",
              "Prime contractor (orquestar)",
            ],
          },
          {
            id: "competitor_collaboration",
            label: "Colaboración con competidores",
            choices: ["Coopetición en mega-deals", "Competencia pura", "Alianza estratégica sectorial"],
          },
          {
            id: "certification_strategy",
            label: "Estrategia de certificaciones",
            choices: [
              "Certificación individual ($800K, ventaja exclusiva)",
              "Certificación grupal 3+ ($200K c/u, beneficio compartido)",
              "Sin certificación (ahorro, riesgo en RFPs)",
            ],
          },
        ],
      },
      {
        id: "operational_excellence",
        name: "Operational Excellence",
        timeMinutes: 12,
        options: [
          {
            id: "process_innovation",
            label: "Innovación de procesos",
            choices: ["Automation-first", "Human-centric", "Hybrid (AI + human)"],
          },
          {
            id: "risk_management",
            label: "Gestión de riesgos",
            choices: ["Conservador (alto costo compliance)", "Calculado (balance)", "Agresivo (máximo ROI)"],
          },
        ],
      },
      {
        id: "strategic_positioning",
        name: "Strategic Positioning",
        timeMinutes: 12,
        options: [
          {
            id: "market_focus",
            label: "Foco de mercado",
            choices: ["Horizontal (multi-industria)", "Vertical specialization", "Niche expertise"],
          },
          {
            id: "brand_building",
            label: "Construcción de marca",
            choices: [
              "Thought leadership (awards, speaking)",
              "Case study marketing",
              "Relationship-driven (networking)",
            ],
          },
          {
            id: "innovation_investment",
            label: "Inversión en innovación",
            choices: ["R&D labs internos", "Co-innovación con clientes", "Partnerships con startups"],
          },
        ],
      },
    ],
    scoring: [
      {
        id: "financial_performance",
        name: "Financial Performance",
        weight: 0.25,
        description: "Revenue growth, márgenes y eficiencia de capital de trabajo",
        kpis: ["Revenue growth YoY", "Profit margin por contrato", "Cash flow operacional"],
      },
      {
        id: "client_satisfaction",
        name: "Client Satisfaction & Retention",
        weight: 0.3,
        description: "SLA compliance, NPS y expansión de contratos",
        kpis: ["SLA compliance rate (>95%)", "Client NPS", "Contract expansion & referral rate"],
      },
      {
        id: "operational_excellence",
        name: "Operational Excellence",
        weight: 0.2,
        description: "Calidad de entrega, eficiencia y gestión de riesgos",
        kpis: ["Delivery quality metrics", "Process automation adoption", "Risk incident rate"],
      },
      {
        id: "ecosystem_leadership",
        name: "Ecosystem Leadership & Innovation",
        weight: 0.25,
        description: "Contribución a estándares, partnerships e innovación sectorial",
        kpis: ["Industry standards contribution", "Successful collaborative bids", "Revenue from next-gen services"],
      },
    ],
    competencies: [
      {
        id: "strategic_partnership_management",
        name: "Strategic Partnership Management",
        range: [0, 100],
        indicator: "Success rate de collaborative bids vs. solo bids",
        benchmark: "Masters logran 40%+ mayor win rate cuando colaboran vs. cuando compiten solos",
      },
      {
        id: "client_value_creation",
        name: "Client Value Creation",
        range: [0, 100],
        indicator: "Contract expansion rate y tendencia de satisfacción del cliente",
        benchmark: "Leaders generan 60%+ más revenue por relación de cliente",
      },
      {
        id: "operational_scalability",
        name: "Operational Scalability",
        range: [0, 100],
        indicator: "Capacidad de manejar picos de demanda manteniendo calidad",
        benchmark: "Excellent performers mantienen 95%+ SLA con picos de demanda 200%+",
      },
      {
        id: "ecosystem_leadership_competency",
        name: "Ecosystem Leadership",
        range: [0, 100],
        indicator: "Iniciativas que mejoran la reputación de toda la industria",
        benchmark: "Leaders contribuyen a 25%+ de mejora en reputación sectorial durante su liderazgo",
      },
      {
        id: "innovation_readiness",
        name: "Innovation & Future-Readiness",
        range: [0, 100],
        indicator: "Velocidad de adopción de tecnologías emergentes y nuevos modelos de servicio",
        benchmark: "Innovators logran 35%+ de revenue de servicios lanzados hace menos de 2 años",
      },
    ],
  },
};

export const SCENARIO_MOCKS: ScenarioMock[] = [supplyChainScenario, retailMarketingScenario, outsourcingScenario];

export const SCENARIO_BY_SLUG: Record<string, ScenarioMock> = Object.fromEntries(
  SCENARIO_MOCKS.map((s) => [s.slug, s])
);
