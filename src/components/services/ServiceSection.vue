<template>
  <div :id="service.id" class="servicio-seccion">
    <div class="servicio-header">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
    </div>
    <div class="servicio-compacto animate-on-scroll">
      <div class="servicio-info">
        <h4>{{ getSubtitle(service.id) }}</h4>
        <p>{{ service.fullDescription }}</p>
        <p><strong>Ejemplos de proyectos:</strong> {{ service.examples }}</p>
        <div class="servicio-acciones">
          <router-link :to="`/paquetes#${service.id}`" class="btn-paquetes">
              Ver Paquetes de {{ service.title }}
          </router-link>

        </div>
      </div>
      <div class="servicio-ejemplos">
        <!-- Images -->
        <div
          v-for="(image, index) in service.images"
          :key="`img-${index}`"
          class="ejemplo-item"
        >
          <img :src="image" :alt="`${service.title} ejemplo ${index + 1}`" />
        </div>
        <!-- Videos if any -->
        <div
          v-for="(video, index) in service.videos"
          :key="`video-${index}`"
          class="ejemplo-item-video"
        >
          <video autoplay muted loop playsinline>
            <source :src="video" type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceSection',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods: {
    getSubtitle(serviceId) {
      const subtitles = {
        web: 'Soluciones Web Completas',
        proyectos: 'Innovación Digital',
        ia: 'Inteligencia Artificial Aplicada',
        mantenimiento: 'Soporte Integral',
        gestion: 'Optimización Tecnológica'
      };
      return subtitles[serviceId] || 'Nuestros Servicios';
    }
  }
};
</script>
