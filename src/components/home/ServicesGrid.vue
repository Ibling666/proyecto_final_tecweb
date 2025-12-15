<template>
  <section class="servicios">
    <div class="container">
      <div class="section-title">
        <h2>Nuestras Soluciones</h2>
        <p>
          Ofrecemos servicios integrales de desarrollo web adaptados a las
          necesidades de tu negocio
        </p>
      </div>
      <div class="servicios-grid">
        <div
          v-for="service in services"
          :key="service.id"
          class="servicio-card"
        >
          <div class="servicio-icon">
            <i :class="service.icon"></i>
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { homeServices } from '@/data/services';

export default {
  name: 'ServicesGrid',
  data() {
    return {
      services: homeServices
    };
  }
  
  
};

</script>
