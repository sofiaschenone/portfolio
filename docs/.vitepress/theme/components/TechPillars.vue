<script setup>
import { ref } from 'vue'

const pillars = [
  {
    icon: '🛡️',
    title: 'Seguridad por Diseño',
    badge: 'Security-First',
    description: 'La seguridad no es una capa posterior, sino un principio desde la primera línea de código.',
    items: [
      'Autenticación robusta con JWT, hashing seguro (bcrypt/Argon2) y protección de rutas sensibles.',
      'Validación y sanitización estricta de esquemas de entrada para mitigar inyecciones y datos corruptos.',
      'Gestión estricta de secretos mediante variables de entorno (.env) sin exposición en clientes.',
      'Rate-limiting, CORS restrictivo y cabeceras de seguridad HTTP.'
    ]
  },
  {
    icon: '⚡',
    title: 'Escalabilidad & Arquitectura',
    badge: 'Clean Architecture',
    description: 'Sistemas preparados para crecer de forma modular sin degradar rendimiento ni legibilidad.',
    items: [
      'Separación limpia de responsabilidades en capas: Controladores, Servicios, Repositorios y Modelos.',
      'Diseño de APIs REST stateless y predecibles con paginación y manejo consistente de errores.',
      'Manejo asíncrono y desacoplamiento para procesos intensivos o llamadas a servicios de terceros.',
      'Estrategias de caching y optimización de consultas en bases de datos (SQL y NoSQL).'
    ]
  },
  {
    icon: '🤖',
    title: 'Automatización Resiliente',
    badge: 'n8n & Webhooks',
    description: 'Orquestación de flujos de negocio que reducen costos operativos y eliminan tareas repetitivas.',
    items: [
      'Flujos n8n preparados para producción con control de fallos, reintentos y logs de auditoría.',
      'Integración fluida con webhooks externos (WhatsApp Cloud API, pasarelas de pago, CRMs).',
      'Orquestación de modelos de Inteligencia Artificial contextualizados a reglas de negocio.',
      'Entornos de prueba con mock data antes del pase a producción.'
    ]
  }
]

const activePillar = ref(0)
</script>

<template>
  <div class="pillars-container">
    <div class="pillars-header">
      <span class="pillars-tag">Filosofía de Ingeniería</span>
      <h3>Seguridad, Escalabilidad y Automatización</h3>
      <p>Criterios técnicos con los que construyo cada solución, desde un script hasta una API en producción.</p>
    </div>

    <div class="pillars-tabs">
      <button
        v-for="(pillar, idx) in pillars"
        :key="idx"
        class="tab-btn"
        :class="{ active: activePillar === idx }"
        @click="activePillar = idx"
      >
        <span class="tab-icon">{{ pillar.icon }}</span>
        <span class="tab-label">{{ pillar.title }}</span>
      </button>
    </div>

    <div class="pillar-card">
      <div class="pillar-card-header">
        <span class="pillar-badge">{{ pillars[activePillar].badge }}</span>
        <h4>{{ pillars[activePillar].icon }} {{ pillars[activePillar].title }}</h4>
        <p class="pillar-lead">{{ pillars[activePillar].description }}</p>
      </div>

      <ul class="pillar-checklist">
        <li v-for="(item, i) in pillars[activePillar].items" :key="i">
          <span class="check-icon">✓</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pillars-container {
  margin: 2.5rem 0;
  padding: 1.5rem;
  border-radius: 14px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
}

.pillars-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.pillars-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand, #646cff);
  background: rgba(100, 108, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.5rem;
}

.pillars-header h3 {
  margin: 0.4rem 0 0.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  border: none;
  padding: 0;
}

.pillars-header p {
  color: var(--vp-c-text-2, #6b7280);
  margin: 0;
  font-size: 0.95rem;
}

.pillars-tabs {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #1f2937);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand, #646cff);
  transform: translateY(-1px);
}

.tab-btn.active {
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
  border-color: var(--vp-c-brand, #646cff);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.pillar-card {
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 10px;
  padding: 1.5rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.pillar-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand, #646cff);
  background: rgba(100, 108, 255, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.pillar-card-header h4 {
  margin: 0.2rem 0 0.4rem;
  font-size: 1.2rem;
  border: none;
  padding: 0;
}

.pillar-lead {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.95rem;
  margin: 0 0 1rem;
}

.pillar-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pillar-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--vp-c-text-1, #374151);
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  min-width: 20px;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.75rem;
  margin-top: 2px;
}
</style>
