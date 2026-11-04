<script setup>
import { ref, computed } from 'vue'

const gameStarted = ref(false)
const currentStep = ref(0)
const score = ref(0)
const selectedAnswer = ref(null)
const isAnswered = ref(false)
const gameFinished = ref(false)

const questions = [
  {
    role: 'Backend & Seguridad',
    question: 'Un endpoint de autenticación está recibiendo miles de peticiones sospechosas por minuto. ¿Cuál es la primera línea de defensa que implementás?',
    options: [
      {
        text: 'Aumentar la memoria del servidor y esperar a que pase el pico de tráfico.',
        correct: false,
        feedback: '⚠️ No resuelve el problema de fondo e incrementa los costos innecesariamente.'
      },
      {
        text: 'Implementar Rate Limiting por IP/cuenta + validación estricta de esquemas y bloqueo temporal de intentos fallidos.',
        correct: true,
        feedback: '🎯 ¡Exacto! Principio de seguridad proactiva: limitación de tasa, esquemas validados y prevención de fuerza bruta.'
      },
      {
        text: 'Eliminar el middleware de autenticación temporalmente para reducir el consumo de CPU.',
        correct: false,
        feedback: '❌ Vulnerabilidad crítica: nunca se debe desproteger una ruta sensible ante sobrecarga.'
      }
    ]
  },
  {
    role: 'Automatización & Resiliencia',
    question: 'En un bot con n8n y WhatsApp Cloud API, un servicio de IA tarda 8 segundos en responder. ¿Cómo evitás que Meta dé timeout al webhook?',
    options: [
      {
        text: 'Responder inmediatamente HTTP 200 OK a Meta y procesar la llamada a la IA de forma asíncrona enviando el mensaje luego.',
        correct: true,
        feedback: '🎯 ¡Excelente arquitectura! El webhook se libera de inmediato evitando reintentos infinitos, y el flujo continúa asíncronamente.'
      },
      {
        text: 'Hacer que el webhook espere en una promesa sincrónica hasta que la IA termine.',
        correct: false,
        feedback: '⚠️ Riesgo de fallo: los webhooks de Meta tienen timeouts estrictos (3 a 5 seg) y reenviarán el mensaje duplicándolo.'
      },
      {
        text: 'Reenviar al usuario a una página web externa sin responderle por chat.',
        correct: false,
        feedback: '❌ Mala experiencia de usuario y rompe la promesa del canal conversacional.'
      }
    ]
  },
  {
    role: 'Arquitectura & Escalabilidad',
    question: 'El proyecto empezó como un script simple pero ahora crecerá con múltiples modelos y reglas de negocio. ¿Cómo organizás el código?',
    options: [
      {
        text: 'Dejar todo en un único archivo app.js para evitar saltar entre carpetas.',
        correct: false,
        feedback: '⚠️ Deuda técnica: se vuelve inmanejable, difícil de testear y propenso a errores cruzados.'
      },
      {
        text: 'Arquitectura por capas: Controladores para HTTP, Servicios para lógica pura, Repositorios para datos y Modelos tipados.',
        correct: true,
        feedback: '🎯 ¡Clean Architecture! Alta cohesión y bajo acoplamiento: permite refactorizar o cambiar la base de datos sin romper la lógica.'
      },
      {
        text: 'Reescribir todo en un framework nuevo cada semana.',
        correct: false,
        feedback: '❌ Parálisis por análisis: la estructura y la lógica importan más que la moda del framework.'
      }
    ]
  }
]

const currentQ = computed(() => questions[currentStep.value])

const selectOption = (index) => {
  if (isAnswered.value) return
  selectedAnswer.value = index
  isAnswered.value = true
  if (currentQ.value.options[index].correct) {
    score.value += 1
  }
}

const nextQuestion = () => {
  if (currentStep.value < questions.length - 1) {
    currentStep.value += 1
    selectedAnswer.value = null
    isAnswered.value = false
  } else {
    gameFinished.value = true
  }
}

const restartGame = () => {
  gameStarted.value = true
  currentStep.value = 0
  score.value = 0
  selectedAnswer.value = null
  isAnswered.value = false
  gameFinished.value = false
}
</script>

<template>
  <div class="recruiter-game">
    <!-- PANTALLA INICIAL -->
    <div v-if="!gameStarted && !gameFinished" class="game-welcome">
      <div class="welcome-badge">🚀 Mini-Juego para Reclutadores & Tech Leads</div>
      <h3>¿Hacemos Match Técnico?</h3>
      <p>
        Tomá 60 segundos para resolver 3 decisiones reales de arquitectura, seguridad y automatización con las que me enfrento a diario.
      </p>

      <div class="game-preview-badges">
        <span>🛡️ Seguridad API</span>
        <span>⚡ Asincronismo & Webhooks</span>
        <span>🏗️ Clean Architecture</span>
      </div>

      <div class="welcome-actions">
        <button class="btn-primary" @click="gameStarted = true">
          ▶ Iniciar Desafío (1 min)
        </button>
        <a
          href="https://docs.google.com/document/d/1CNOtnBTH6mBwbnYe9cU5AILjNMOZw7ZqT9G2LOllY_k/edit?usp=sharing"
          target="_blank"
          class="btn-secondary"
        >
          📄 Saltar directo al CV
        </a>
      </div>
    </div>

    <!-- PANTALLA DE PREGUNTAS -->
    <div v-else-if="gameStarted && !gameFinished" class="game-board">
      <div class="board-header">
        <span class="role-tag">{{ currentQ.role }}</span>
        <span class="step-indicator">Pregunta {{ currentStep + 1 }} de {{ questions.length }}</span>
      </div>

      <!-- Barra de progreso -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: ((currentStep + 1) / questions.length) * 100 + '%' }"></div>
      </div>

      <h4 class="question-text">{{ currentQ.question }}</h4>

      <div class="options-list">
        <button
          v-for="(option, idx) in currentQ.options"
          :key="idx"
          class="option-btn"
          :class="{
            'selected': selectedAnswer === idx,
            'is-correct': isAnswered && option.correct,
            'is-wrong': isAnswered && selectedAnswer === idx && !option.correct
          }"
          :disabled="isAnswered"
          @click="selectOption(idx)"
        >
          <span class="opt-letter">{{ ['A', 'B', 'C'][idx] }}</span>
          <span class="opt-text">{{ option.text }}</span>
        </button>
      </div>

      <!-- FEEDBACK INMEDIATO -->
      <div v-if="isAnswered" class="feedback-card" :class="currentQ.options[selectedAnswer].correct ? 'correct' : 'incorrect'">
        <p class="feedback-text">{{ currentQ.options[selectedAnswer].feedback }}</p>
        <button class="btn-next" @click="nextQuestion">
          {{ currentStep < questions.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultado Final 🏆' }}
        </button>
      </div>
    </div>

    <!-- PANTALLA FINAL -->
    <div v-else-if="gameFinished" class="game-results">
      <div class="confetti-icon">🎉</div>
      <span class="result-badge">Hiring Compatibility: {{ score === 3 ? '100% Match' : '90% Match' }}</span>
      <h3>¡Desafío Completado!</h3>
      <p class="result-desc">
        Puntaje obtenido: <strong>{{ score }} de {{ questions.length }}</strong> decisiones acertadas.
        Compartimos la misma visión: <strong>código legible, arquitectura escalable y seguridad desde el primer día</strong>.
      </p>

      <div class="hiring-perks">
        <div class="perk-card">
          <span class="perk-icon">🧠</span>
          <strong>Lógica Sólida</strong>
          <span>Formación universitaria en C y algoritmos.</span>
        </div>
        <div class="perk-card">
          <span class="perk-icon">⚡</span>
          <strong>Autonomía</strong>
          <span>Experiencia en sitios para empresas reales y flujos con n8n.</span>
        </div>
        <div class="perk-card">
          <span class="perk-icon">🎯</span>
          <strong>Orientada al Negocio</strong>
          <span>Resolución de cuellos de botella y automatización de procesos.</span>
        </div>
      </div>

      <div class="results-actions">
        <a
          href="https://docs.google.com/document/d/1CNOtnBTH6mBwbnYe9cU5AILjNMOZw7ZqT9G2LOllY_k/edit?usp=sharing"
          target="_blank"
          class="btn-cta btn-cv"
        >
          📄 Descargar CV Técnico
        </a>
        <a
          href="https://www.linkedin.com/in/sofiaschenone/"
          target="_blank"
          class="btn-cta btn-linkedin"
        >
          💼 Conectar en LinkedIn
        </a>
        <button class="btn-replay" @click="restartGame">
          🔄 Volver a jugar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recruiter-game {
  margin: 2.5rem 0;
  padding: 1.8rem;
  background: linear-gradient(135deg, rgba(100, 108, 255, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%);
  border: 2px dashed rgba(100, 108, 255, 0.35);
  border-radius: 18px;
  position: relative;
  overflow: hidden;
}

.welcome-badge {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--vp-c-brand, #646cff);
  background: rgba(100, 108, 255, 0.12);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 0.8rem;
}

.game-welcome h3, .game-results h3 {
  margin: 0.3rem 0 0.6rem;
  font-size: 1.5rem;
  border: none;
  padding: 0;
}

.game-welcome p, .result-desc {
  color: var(--vp-c-text-2, #4b5563);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1.2rem;
}

.game-preview-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.game-preview-badges span {
  font-size: 0.78rem;
  font-weight: 600;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  color: var(--vp-c-text-1, #1e293b);
}

.welcome-actions, .results-actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
}

.btn-primary, .btn-secondary, .btn-next, .btn-cta, .btn-replay {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none !important;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(100, 108, 255, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(100, 108, 255, 0.45);
}

.btn-secondary {
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #1e293b);
  border: 1px solid var(--vp-c-divider, #cbd5e1);
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand, #646cff);
  color: var(--vp-c-brand, #646cff);
}

/* Tablero de preguntas */
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.role-tag {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vp-c-brand, #646cff);
  background: rgba(100, 108, 255, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.step-indicator {
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #64748b);
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--vp-c-divider, #e2e8f0);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.2rem;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand, #646cff);
  transition: width 0.3s ease;
}

.question-text {
  font-size: 1.1rem;
  line-height: 1.45;
  margin: 0 0 1.2rem;
  border: none;
  padding: 0;
  color: var(--vp-c-text-1, #0f172a);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.2rem;
}

.option-btn {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider, #cbd5e1);
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #1e293b);
  cursor: pointer;
  text-align: left;
  font-size: 0.92rem;
  line-height: 1.4;
  transition: all 0.2s ease;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand, #646cff);
  transform: translateX(4px);
  background: rgba(100, 108, 255, 0.04);
}

.option-btn.is-correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  color: #065f46;
}

.option-btn.is-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  color: #991b1b;
}

.opt-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt, #f1f5f9);
  font-weight: 700;
  font-size: 0.78rem;
}

.feedback-card {
  padding: 1rem 1.2rem;
  border-radius: 10px;
  margin-top: 1rem;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-card.correct {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.feedback-card.incorrect {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.feedback-text {
  margin: 0 0 0.8rem;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--vp-c-text-1, #1e293b);
}

.btn-next {
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
}

.btn-next:hover {
  background: #535bf2;
}

/* Pantalla final */
.confetti-icon {
  font-size: 2.2rem;
  margin-bottom: 0.3rem;
}

.result-badge {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #059669;
  background: rgba(16, 185, 129, 0.15);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.5rem;
}

.hiring-perks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
  margin: 1.4rem 0;
}

.perk-card {
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 10px;
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.perk-icon {
  font-size: 1.3rem;
}

.perk-card strong {
  font-size: 0.9rem;
  color: var(--vp-c-text-1, #0f172a);
}

.perk-card span {
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #64748b);
  line-height: 1.35;
}

.btn-cv {
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
}

.btn-linkedin {
  background: #0a66c2;
  color: #ffffff;
}

.btn-replay {
  background: transparent;
  color: var(--vp-c-text-2, #64748b);
  border: 1px solid var(--vp-c-divider, #cbd5e1);
}

.btn-replay:hover {
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #0f172a);
}
</style>
