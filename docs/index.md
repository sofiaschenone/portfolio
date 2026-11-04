# <span class="typewriter">Sofía Schenone</span>

## Backend Development · Automatización de Sistemas · Arquitectura & Seguridad

Soy desarrolladora de software con formación técnica universitaria, especializada en **backend**, **automatización de procesos con n8n** e **integración de sistemas**. 

Construyo soluciones basadas en principios de **seguridad desde el diseño**, **escalabilidad modular** y **código predecible y mantenible**. Mi objetivo es entender las necesidades del negocio antes de escribir código, evitando complejidad accidental y garantizando alta disponibilidad.

---

<ClientOnly>
  <RecruiterGame />
</ClientOnly>

---

## 🎯 Pilares Técnicos: Seguridad & Escalabilidad

<ClientOnly>
  <TechPillars />
</ClientOnly>

---

## 💻 Repositorios y Proyectos en Vivo (GitHub)

Explorá mis repositorios públicos sincronizados directamente con GitHub. Podés filtrar por stack tecnológico, revisar el código fuente o acceder a las demos desplegadas:

<ClientOnly>
  <GitHubProjects />
</ClientOnly>

---

## 🧠 Cómo razono los problemas de ingeniería

Gran parte de mi formación universitaria se basa en **lógica, algoritmos y gestión de memoria** (C y estructuras de datos). Antes de apresurarme con un framework o interfaz, diseño el modelo de datos, la máquina de estados y las transacciones críticas:

```c
/* Control de flujo, manejo de estado y prevención de desbordamientos */
int score = 0;

for (int i = 0; i < total_questions; i++) {
    printf("[Security Check %d]: %s\n", i + 1, questions[i].question);
    if (scanf("%d", &answer) != 1) {
        printf("Error: Entrada no válida. Sanitizando buffer.\n");
        break;
    }

    if (answer == questions[i].correct) {
        score++;
    }
}

printf("Auditoría completada. Puntuación de integridad: %d/%d\n", score, total_questions);
```

> Lo que cambia con el tiempo es la herramienta o el lenguaje; **el criterio de arquitectura, control de errores y seguridad permanece**.

---

## 🌐 Proyectos implementados en empresas reales

Además de proyectos personales y de código abierto, desarrollo y participo en el mantenimiento de soluciones utilizadas en entornos productivos por empresas reales:

### 🧑‍⚖️ Jurídico González
- Sitio institucional y canal digital para estudio jurídico integral con presentación de servicios y captación de clientes.
- 👉 [Ver documentación y detalles del proyecto](/projects/juridico-gonzalez)

### 🛡️ Grupo MG S.R.L. (Ex GRM Seguridad)
- Plataforma web corporativa y marketplace para empresa de seguridad integral y custodia patrimonial.
- 🌐 Sitio en producción activo: [mggrupo.com.ar](https://mggrupo.com.ar/)
- 👉 [Ver documentación y video demo interactivo](/projects/grm-seguridad)

### 🏗️ DYS Constructora
- Plataforma institucional y catálogo de obras para empresa constructora, con backend en Node.js y front modular.
- 👉 [Ver documentación y detalles del proyecto](/projects/dys-constructora)

---

## 🤖 Soluciones de Automatización con IA

### 💬 Bot de WhatsApp con n8n & OpenAI
- Flujo automatizado de atención al cliente utilizando WhatsApp Cloud API, webhooks resilientes y orquestación con IA para responder consultas de negocio.
- 👉 [Explorar flujo de n8n y arquitectura](/projects/whatsapp-bot-n8n)

---

<div class="stats-container">
  <ClientOnly>
    <LiveStats />
  </ClientOnly>
</div>
