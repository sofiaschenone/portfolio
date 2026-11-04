<script setup>
import { ref, computed, onMounted } from 'vue'

const FALLBACK_REPOS = [
  {
    name: 'auth-nest',
    description: 'Backend seguro desarrollado con NestJS y TypeScript para autenticación y autorización con JWT, roles y guards.',
    language: 'TypeScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/auth-nest',
    homepage: null,
    category: 'backend',
    featured: true,
    highlights: ['JWT Auth', 'NestJS Guards', 'Role-Based Access']
  },
  {
    name: 'dysback',
    description: 'API REST backend para empresa constructora. Gestión de consultas, presupuesto, endpoints seguros y lógica de negocio.',
    language: 'JavaScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/dysback',
    homepage: 'https://dysback.vercel.app',
    category: 'backend',
    featured: true,
    highlights: ['Express REST API', 'Vercel Serverless', 'Empresa Real']
  },
  {
    name: 'dys-constructora',
    description: 'Aplicación web corporativa para empresa constructora. Arquitectura modular SPA con Angular y TypeScript.',
    language: 'TypeScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/dys-constructora',
    homepage: null,
    category: 'frontend',
    featured: true,
    highlights: ['Angular SPA', 'Modular Components', 'Empresa Real']
  },
  {
    name: 'BlackJack',
    description: 'Juego de 21 / BlackJack creado con JavaScript puro. Evolución de arquitectura: V1 sin módulos (insegura) vs V2 modularizada y encapsulada.',
    language: 'JavaScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/BlackJack',
    homepage: null,
    category: 'security',
    featured: true,
    highlights: ['Encapsulación', 'Patrón Módulo', 'Seguridad en Front']
  },
  {
    name: 'heroes-app',
    description: 'Single Page Application con Angular: rutas anidadas, rutas hijas, carga perezosa (lazy loading) y guards de autenticación.',
    language: 'TypeScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/heroes-app',
    homepage: 'https://profsofia.github.io/heroes-app/',
    category: 'frontend',
    featured: false,
    highlights: ['Lazy Loading', 'Angular Guards', 'Demo en vivo']
  },
  {
    name: 'formApp',
    description: 'Implementación avanzada de Formularios Reactivos en Angular con validaciones personalizadas y asíncronas.',
    language: 'TypeScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/formApp',
    homepage: 'https://profsofia.github.io/formApp/',
    category: 'frontend',
    featured: false,
    highlights: ['Reactive Forms', 'Custom Validators', 'Demo en vivo']
  },
  {
    name: 'creditos-canning',
    description: 'Plataforma web para simulación y gestión de créditos comerciales desplegada en producción.',
    language: 'JavaScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/creditos-canning',
    homepage: 'https://creditos-canning.vercel.app',
    category: 'frontend',
    featured: false,
    highlights: ['Cálculo de tasas', 'Deploy Vercel', 'Producción']
  },
  {
    name: 'CRUD_python',
    description: 'Sistema CRUD desarrollado en Python enfocado en estructuras de datos, persistencia y procesamiento.',
    language: 'Python',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/CRUD_python',
    homepage: null,
    category: 'backend',
    featured: false,
    highlights: ['Python', 'Persistencia', 'Manipulación de Datos']
  },
  {
    name: 'Api_Clima',
    description: 'Consumo y normalización de APIs REST externas de meteorología con manejo de asincronismo y errores en cliente.',
    language: 'JavaScript',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/Api_Clima',
    homepage: null,
    category: 'backend',
    featured: false,
    highlights: ['Fetch API', 'Async/Await', 'Data Normalization']
  },
  {
    name: 'mathgames.v1',
    description: 'Desarrollo de lógica y algoritmos de bajo nivel utilizando lenguaje C, enfocado en gestión de memoria y optimización.',
    language: 'C',
    stargazers_count: 0,
    html_url: 'https://github.com/sofiaschenone/mathgames.v1',
    homepage: null,
    category: 'security',
    featured: false,
    highlights: ['Lenguaje C', 'Gestión de Memoria', 'Algoritmos']
  }
]

const repos = ref(FALLBACK_REPOS)
const loading = ref(false)
const selectedCategory = ref('all')
const searchQuery = ref('')
const liveSyncStatus = ref('offline-ready') // 'live' | 'cached' | 'fallback'

const categorizeRepo = (r) => {
  const name = (r.name || '').toLowerCase()
  const desc = (r.description || '').toLowerCase()
  const lang = (r.language || '').toLowerCase()

  if (name.includes('back') || name.includes('api') || name.includes('nest') || name.includes('crud') || lang === 'python' || lang === 'java') {
    return 'backend'
  }
  if (name.includes('bot') || name.includes('n8n') || desc.includes('automatiz') || desc.includes('webhook')) {
    return 'automation'
  }
  if (name.includes('c') || name.includes('math') || name.includes('jack') || desc.includes('segur') || desc.includes('modular')) {
    return 'security'
  }
  return 'frontend'
}

const fetchLiveRepos = async () => {
  const CACHE_KEY = 'sofia_github_repos_v1'
  const CACHE_TIME_KEY = 'sofia_github_repos_time'
  const ONE_HOUR = 60 * 60 * 1000

  // 1. Check cached data
  try {
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY)
    const cachedData = localStorage.getItem(CACHE_KEY)
    if (cachedTime && cachedData && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
      repos.value = JSON.parse(cachedData)
      liveSyncStatus.value = 'cached'
      return
    }
  } catch (e) {
    // localStorage may be unavailable in some secure browser contexts
  }

  // 2. Fetch from GitHub API
  loading.value = true
  try {
    const response = await fetch('https://api.github.com/users/sofiaschenone/repos?sort=updated&per_page=30')
    if (!response.ok) throw new Error(`HTTP error ${response.status}`)
    const data = await response.json()

    if (Array.isArray(data) && data.length > 0) {
      // Map and enrich
      const enriched = data
        .filter(r => !r.fork)
        .map(r => {
          const fallbackMatch = FALLBACK_REPOS.find(f => f.name.toLowerCase() === r.name.toLowerCase())
          return {
            name: r.name,
            description: r.description || (fallbackMatch ? fallbackMatch.description : 'Proyecto de código abierto en GitHub'),
            language: r.language || (fallbackMatch ? fallbackMatch.language : 'Código'),
            stargazers_count: r.stargazers_count || 0,
            html_url: r.html_url,
            homepage: r.homepage || (fallbackMatch ? fallbackMatch.homepage : null),
            category: fallbackMatch ? fallbackMatch.category : categorizeRepo(r),
            featured: fallbackMatch ? fallbackMatch.featured : false,
            highlights: fallbackMatch ? fallbackMatch.highlights : [r.language || 'Software', 'GitHub']
          }
        })

      repos.value = enriched
      liveSyncStatus.value = 'live'

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(enriched))
        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()))
      } catch (e) {}
    }
  } catch (err) {
    console.warn('Usando fallback curado de repositorios:', err.message)
    liveSyncStatus.value = 'fallback'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLiveRepos()
})

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'automation', label: 'Automatización & n8n' },
  { id: 'security', label: 'Seguridad & Algoritmos' },
  { id: 'frontend', label: 'Frontend & Fullstack' }
]

const filteredRepos = computed(() => {
  return repos.value.filter(r => {
    const matchesCat = selectedCategory.value === 'all' || r.category === selectedCategory.value
    const q = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !q ||
      r.name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q))
    return matchesCat && matchesSearch
  })
})
</script>

<template>
  <div class="github-showcase">
    <div class="showcase-top">
      <div class="showcase-info">
        <div class="sync-pill" :class="liveSyncStatus">
          <span class="status-dot"></span>
          <span v-if="liveSyncStatus === 'live'">Conectado a GitHub API en vivo</span>
          <span v-else-if="liveSyncStatus === 'cached'">GitHub Cache Optimizado (Fast Load)</span>
          <span v-else>Repositorios Activos de GitHub</span>
        </div>
        <h3>Explorador de Repositorios en Vivo</h3>
        <p>Sincronización directa con <strong>@sofiaschenone</strong>. Podés filtrar por tecnología, inspeccionar el código o probar las demos en vivo.</p>
      </div>

      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por tecnología, nombre o concepto..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Filtros de Categorías -->
    <div class="category-filters">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-pill"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Grid de Proyectos -->
    <div v-if="filteredRepos.length > 0" class="repo-grid">
      <div
        v-for="repo in filteredRepos"
        :key="repo.name"
        class="repo-card"
        :class="{ 'is-featured': repo.featured }"
      >
        <div class="repo-header">
          <div class="repo-title-box">
            <span class="repo-icon">📦</span>
            <h4 class="repo-name">{{ repo.name }}</h4>
          </div>
          <span v-if="repo.language" class="lang-tag" :data-lang="repo.language">
            {{ repo.language }}
          </span>
        </div>

        <p class="repo-desc">{{ repo.description }}</p>

        <div v-if="repo.highlights && repo.highlights.length" class="highlights-row">
          <span v-for="(h, i) in repo.highlights" :key="i" class="highlight-chip">
            {{ h }}
          </span>
        </div>

        <div class="repo-footer">
          <a
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="action-btn btn-code"
          >
            <span>GitHub</span>
            <span class="arrow">↗</span>
          </a>

          <a
            v-if="repo.homepage"
            :href="repo.homepage"
            target="_blank"
            rel="noopener noreferrer"
            class="action-btn btn-demo"
          >
            <span>Ver Demo</span>
            <span class="pulse-dot"></span>
          </a>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No se encontraron repositorios que coincidan con la búsqueda.</p>
      <button class="clear-btn" @click="searchQuery = ''; selectedCategory = 'all'">Ver todos los proyectos</button>
    </div>
  </div>
</template>

<style scoped>
.github-showcase {
  margin: 2.5rem 0;
  padding: 1.6rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 16px;
}

.showcase-top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

@media (min-width: 768px) {
  .showcase-top {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.sync-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  margin-bottom: 0.4rem;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  animation: pulseDot 2s infinite ease-in-out;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

.showcase-info h3 {
  margin: 0 0 0.3rem;
  font-size: 1.35rem;
  border: none;
  padding: 0;
}

.showcase-info p {
  margin: 0;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.92rem;
}

.search-input {
  width: 100%;
  min-width: 260px;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider, #cbd5e1);
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #1e293b);
  font-size: 0.88rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand, #646cff);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.15);
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filter-pill {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 600;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  color: var(--vp-c-text-2, #64748b);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  border-color: var(--vp-c-brand, #646cff);
  color: var(--vp-c-brand, #646cff);
}

.filter-pill.active {
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
  border-color: var(--vp-c-brand, #646cff);
}

.repo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.1rem;
}

@media (min-width: 640px) {
  .repo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.repo-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.repo-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand, #646cff);
  box-shadow: 0 8px 24px rgba(100, 108, 255, 0.12);
}

.repo-card.is-featured {
  border-left: 4px solid var(--vp-c-brand, #646cff);
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.repo-title-box {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.repo-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #0f172a);
}

.lang-tag {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: rgba(100, 108, 255, 0.1);
  color: var(--vp-c-brand, #646cff);
}

.repo-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2, #64748b);
  line-height: 1.45;
  margin: 0 0 0.85rem;
  flex-grow: 1;
}

.highlights-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.highlight-chip {
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--vp-c-bg-alt, #f1f5f9);
  color: var(--vp-c-text-2, #475569);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.repo-footer {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid var(--vp-c-divider, #f1f5f9);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.btn-code {
  background: var(--vp-c-bg-alt, #f1f5f9);
  color: var(--vp-c-text-1, #1e293b);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
}

.btn-code:hover {
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
  border-color: var(--vp-c-brand, #646cff);
}

.btn-demo {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.btn-demo:hover {
  background: #10b981;
  color: #ffffff;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  display: inline-block;
}

.empty-state {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--vp-c-text-2, #64748b);
}

.clear-btn {
  margin-top: 0.8rem;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-brand, #646cff);
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
</style>
