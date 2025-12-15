<template>
  <div class="services-page">
    <HeroVideo />
    <section class="servicios" id="servicios">
      <div class="container">
        <div class="section-title">
          <h2>Servicios Especializados</h2>
          <p>Ofrecemos soluciones integrales para potenciar tu presencia digital</p>
        </div>
        <ServiceSection
          v-for="service in services"
          :key="service.id"
          :service="service"
        />
      </div>
    </section>
  </div>
</template>

<script>
import HeroVideo from '@/components/services/HeroVideo.vue';
import ServiceSection from '@/components/services/ServiceSection.vue';
import { services } from '@/data/services';

export default {
  name: 'Services',
  components: {
    HeroVideo,
    ServiceSection
  },
  data() {
    return {
      services: services
    };
  }
};
</script>
