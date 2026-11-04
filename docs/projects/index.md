# Proyectos & Arquitectura

Esta sección reúne proyectos donde aplico lógica de sistemas, desarrollo backend, arquitectura escalable y automatizaciones para resolver problemas reales del mundo profesional.

Cada solución documentada detalla:
- **El problema de negocio a resolver**
- **La arquitectura técnica y decisiones de diseño**
- **Implementación de seguridad y escalabilidad**
- **Aprendizajes y lecciones aprendidas**

---

## 💻 Repositorios y Desarrollos en GitHub en Vivo

<ClientOnly>
  <GitHubProjects />
</ClientOnly>

---

## 📦 Proyectos Destacados con Documentación Completa

### 🤖 Bot de WhatsApp con IA (n8n & Webhooks)
- **Problema:** Automatizar la atención inicial al cliente 24/7 sin colapsar por saturación ni perder contexto.
- **Stack:** n8n · WhatsApp Cloud API · OpenAI · Docker · Webhooks resilientes.
- **Criterio de Seguridad & Resiliencia:** Webhook con respuesta HTTP 200 inmediata para prevenir reintentos de Meta, procesamiento asíncrono y variables de entorno protegidas.
- 👉 [Leer arquitectura completa del Bot](/projects/whatsapp-bot-n8n)

### 🛒 API REST para E-commerce
- **Problema:** Backend robusto y transaccional para gestionar usuarios, catálogo de productos y órdenes de compra.
- **Stack:** Node.js · Express · MongoDB · JWT · Middleware RBAC.
- **Criterio de Seguridad & Resiliencia:** Autenticación con JSON Web Tokens, sanitización de datos contra inyecciones NoSQL y arquitectura en capas desacopladas (Controller / Service / Repository).
- 👉 [Leer arquitectura de la API](/projects/api-ecommerce)

---

## 🌐 Proyectos en Producción para Empresas Reales

### 🏗️ DYS Constructora
- **Propósito:** Sitio corporativo y portal de obras para empresa del sector de la construcción.
- **Stack:** Angular · TypeScript · Node.js API (`dysback`) · Vercel.
- 👉 [Ver caso de estudio DYS Constructora](/projects/dys-constructora)

### 🛡️ Grupo MG S.R.L. (Ex GRM Seguridad)
- **Propósito:** Web corporativa para empresa de seguridad integral, vigilancia y marketplace especializado.
- **Sitio en producción:** [https://mggrupo.com.ar/](https://mggrupo.com.ar/)
- 👉 [Ver caso de estudio y video demo de Grupo MG](/projects/grm-seguridad)

### 🧑‍⚖️ Jurídico González
- **Propósito:** Presencia web y canal digital de asesoría para estudio legal.
- 👉 [Ver caso de estudio Jurídico González](/projects/juridico-gonzalez)
