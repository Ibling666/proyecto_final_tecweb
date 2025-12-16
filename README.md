# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).




# Proyecto TINW – Plataforma Web en Vue 3 + Vite

Este proyecto corresponde a la migración del sitio web TINW a una arquitectura moderna basada en Vue 3, Vite y componentes modulares. El objetivo es optimizar la estructura del proyecto, mejorar el rendimiento, facilitar el mantenimiento y permitir una expansión futura ordenada.


## Tecnologías Principales

* **Vue 3 + Composition API**
* **Vite**
* **Vue Router**
* **LocalStorage (persistencia de datos)**
* **FontAwesome**
* Vercel (Deploy)
* Supabase (PostgreSQL + Realtime)
* **CSS**
* **JavaScript ES Modules**



## Requisitos Previos


* Node.js (versión recomendada LTS)
* npm (incluido con Node)

 comprobar  versiones con:

node -v
npm -v


## Instalación

Instalar dependencias del proyecto:

npm install
npm install @supabase/supabase-js


Configurar variables de entorno (.env):
VITE_SUPABASE_URL=https://tlpbctbzgviksbcvukqs.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_GVddvZJ0d_dR4a0tg5NYMQ_XfPBvqmK



Iniciar el servidor de desarrollo:
npm run dev


El proyecto estará disponible en:
http://localhost:5173/


Compilar para producción:
npm run build

## Despliegue en Vercel

El proyecto se despliega como SPA en Vercel

Se utiliza vercel.json para el manejo de rutas

Las variables de entorno se configuran desde el panel de Vercel

El proyecto estará disponible en:
https://proyecto-final-tecweb.vercel.app/


## Estructura del Proyecto

```
src/
 ├─ assets/               
 ├─ components/           # Componentes reutilizables (Home, Contact, Services…)
 ├─ data/                 # Datos mockeados: servicios, proyectos, testimonios
 ├─ router/               # Configuración de rutas con Vue Router
 ├─ views/                # Vistas principales del sitio
 ├─ App.vue               # Componente raíz
 └─ main.js               # Punto de entrada de la aplicación
```



## Funcionalidades Principales

### Sistema de Contacto

* Formulario validado
* Guardado automático en LocalStorage
* Listado de contactos
* Exportación en JSON y CSV
* Estadísticas en tiempo real
* Último contacto recibido
* Sincronización entre componentes vía eventos personalizados

### Componentes Interactivos

* Contadores reactivos
* Carrusel dinámico con animación
* Testimonios con auto-slide
* Sección de servicios con imágenes y videos
* Indicadores por tipo de proyecto
* Interfaz optimizada para dispositivos móviles



## Scripts del Proyecto

| Script            | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Inicia el entorno de desarrollo              |
| `npm run build`   | Genera la versión optimizada para producción |


## Recomendaciones de Desarrollo

* Mantener componentes pequeños y bien separados.
* Usar `<script setup>` como estándar dentro de Vue 3.
* Emplear Props y Emits para la comunicación entre componentes.
* Utilizar correctamente `ref`, `reactive`, `computed` y `watch`.
* Mantener archivos de configuración y datos dentro de `src/data`.
* Evitar lógica compleja dentro de templates.

---

## Licencia

Proyecto privado perteneciente a **TINW**.
No se permite su distribución sin autorización previa.


