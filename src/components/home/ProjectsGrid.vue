<template>
  <section class="proyectos">
    <div class="container">
      <div class="section-title">
        <h2>Nuestros Proyectos</h2>
        <p>Conoce algunos de nuestros trabajos más recientes</p>
      </div>
      <div class="proyectos-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          class="proyecto-card"
          @click="handleProjectClick(project)"
        >
          <img :src="project.image" :alt="project.title" />
          <div class="proyecto-overlay">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <span class="view-indicator">👁️ Click para ver más</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineEmits } from 'vue';
import { projects } from '@/data/projects';

// Emits
const emit = defineEmits(['project-viewed']);

// Methods
const handleProjectClick = (project) => {
  console.log('📁 Proyecto visualizado:', project.title);
  
  // Emitir evento al padre
  emit('project-viewed', {
    id: project.id,
    name: project.title,
    title: project.title,
    description: project.description
  });
  
  // Feedback visual
  console.log(`✅ "${project.title}" agregado a tu perfil de interés`);
};
</script>

<style scoped>
.proyecto-card {
  cursor: pointer;
  position: relative;
}

.view-indicator {
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  opacity: 0.9;
  color: #fff;
}

.proyecto-card:hover .view-indicator {
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>