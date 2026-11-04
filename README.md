# 💼 Portfolio Personal – Sofía Schenone

Portfolio profesional y técnico construido con **VitePress** y **Vue 3**, enfocado en **Desarrollo Backend**, **Automatización e Integración de Sistemas**, **Seguridad** y **Escalabilidad**.

---

## 🎯 Enfoque y Características Clave

* **🛡️ Seguridad por Diseño:** Documentación y buenas prácticas de autenticación (JWT, RBAC), sanitización de esquemas, manejo de secretos y mitigación de vulnerabilidades.
* **⚡ Escalabilidad & Clean Architecture:** Estructuras modulares desacopladas (Controladores, Servicios, Repositorios) y procesamiento asíncrono para prevenir cuellos de botella.
* **💻 Sincronización en Vivo con GitHub:** Componente interactivo que consulta la API pública de GitHub con sistema de caché en `localStorage` y fallback offline resiliente.
* **🎯 Mini-Juego para Reclutadores:** Experiencia interactiva para recruiters y líderes técnicos con preguntas situacionales de arquitectura para validar compatibilidad y descargar el CV técnico.
* **🌐 Proyectos en Producción:** Implementaciones reales para empresas (DYS Constructora, Grupo MG S.R.L., Jurídico González) y workflows con n8n y WhatsApp Cloud API.

---

## 🛠️ Stack Tecnológico

* **Framework:** [VitePress](https://vitepress.dev/) + [Vue 3](https://vuejs.org/)
* **Backend:** Node.js, Express, NestJS, TypeScript, Python, C
* **Automatización:** n8n, WhatsApp Cloud API, OpenAI API, Webhooks
* **Bases de Datos:** PostgreSQL / SQL, MongoDB
* **Deploy:** Vercel / Netlify con CI/CD automático

---

## 📂 Estructura del Proyecto

```
.
├─ docs/
│  ├─ index.md                # Portada con Desafío Reclutador, Pilares y GitHub Live
│  ├─ about.md                # Perfil de ingeniería, factor científico y CVs
│  ├─ learning.md             # Bitácora de aprendizaje técnico continuo
│  ├─ projects/
│  │  ├─ index.md             # Directorio de proyectos y explorador interactivo
│  │  ├─ api-ecommerce.md     # Arquitectura API REST por capas y JWT
│  │  ├─ whatsapp-bot-n8n.md  # Orquestación con n8n, IA y webhooks
│  │  ├─ dys-constructora.md  # Sitio corporativo y API en producción
│  │  ├─ grm-seguridad.md     # Web corporativa y servicios de seguridad
│  │  └─ juridico-gonzalez.md # Canal digital para estudio legal
│  └─ .vitepress/
│     ├─ config.ts            # Navegación y metadatos
│     └─ theme/
│        ├─ index.ts          # Registro de componentes globales Vue 3
│        ├─ style.css         # Animaciones escalables y accesibilidad
│        └─ components/
│           ├─ RecruiterGame.vue    # Mini-juego interactivo para reclutadores
│           ├─ GitHubProjects.vue   # Explorador en vivo de repositorios GitHub
│           ├─ TechPillars.vue      # Pilares de Seguridad, Escalabilidad y Automatización
│           └─ LiveStats.vue        # Contador y métricas locales
```

---

## 🚀 Ejecución en Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run docs:dev

# Construir sitio estático para producción
npm run docs:build

# Previsualizar build local
npm run docs:preview
```

---

## 👩‍💻 Autora

**Sofía Schenone**  
*Desarrolladora de Software · Backend & Automatización*

* 🌐 Portfolio: [https://sofiadevsoftware.com.ar/](https://sofiadevsoftware.com.ar/)
* 💼 LinkedIn: [https://www.linkedin.com/in/sofiaschenone/](https://www.linkedin.com/in/sofiaschenone/)
* 💻 GitHub: [https://github.com/sofiaschenone](https://github.com/sofiaschenone)
