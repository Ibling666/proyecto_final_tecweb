<template>
  <div class="paquetes-view">
    <!-- ✅ MENÚ FLOTANTE -->
    <div class="menu-flotante">
      <h4>Ir a Paquete</h4>
      <a href="#web">Desarrollo Web</a>
      <a href="#proyectos">Proyectos Digitales</a>
      <a href="#ia">Generación de IA</a>
      <a href="#mantenimiento">Mantenimiento y Soporte</a>
      <a href="#gestion">Gestión Tecnológica</a>
    </div>

    <!-- ✅ SECCIONES -->
    <section
      v-for="cat in categories"
      :id="cat.id"
      :key="cat.id"
      class="section-paquetes"
    >
      <div class="container">
        <!-- ✅ TÍTULO DE SECCIÓN -->
        <div class="section-title">
          <div
            v-if="cat.id === 'web'"
            id="dailyMessageContainer"
            class="daily-message"
          >
            {{ dailyMessage }}
          </div>

          <h2>{{ cat.title }}</h2>
          <p>{{ cat.description }}</p>
        </div>

        <!-- ✅ GRID DE CARDS -->
        <div class="paquetes-grid">
          <PackageCard
            v-for="item in getPackages(cat.id)"
            :key="item.id"
            :pkg="item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PackageCard from "@/components/packages/PackageCard.vue";
import { packages } from "@/data/packages.js";

import { ref } from "vue";

/* ✅ Categorías igual que tu HTML */
const categories = [
  {
    id: "web",
    title: "Desarrollo Web",
    description: "Elige el paquete ideal para crear tu sitio web profesional.",
  },
  {
    id: "proyectos",
    title: "Proyectos Digitales",
    description: "Impulsa tus ideas con proyectos digitales innovadores.",
  },
  {
    id: "ia",
    title: "Generación de IA",
    description: "Soluciones inteligentes con IA personalizada.",
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento y Soporte",
    description: "Mantén tus sistemas actualizados y funcionando.",
  },
  {
    id: "gestion",
    title: "Gestión Tecnológica",
    description: "Optimiza recursos y proyectos tecnológicos.",
  },
];

const dailyMessage = ref("");

/* ✅ MENSAJE DEL DÍA */
function setDailyMessage() {
  const day = new Date().getDay();

  switch (day) {
    case 1:
      dailyMessage.value =
        "¡Feliz Lunes! Es un gran día para empezar un nuevo proyecto web.";
      break;
    case 3:
      dailyMessage.value =
        "¡Mitad de semana! ¿Ya pensaste cómo mejorar tu presencia digital?";
      break;
    case 5:
      dailyMessage.value =
        "¡Es Viernes! Perfecto para lanzar tu nueva página web.";
      break;
    default:
      dailyMessage.value =
        "Consulta nuestros paquetes y encuentra la solución perfecta.";
  }
}
setDailyMessage();

/* ✅ FILTRAR PACKAGES POR CATEGORÍA */
function getPackages(categoryId) {
  return packages.filter((p) => p.category === categoryId);
}
</script>
