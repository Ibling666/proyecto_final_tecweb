<template>
  <div class="home">
    <HeroCarousel />
    <InteractiveCounter 
      @proyectoIncrementado="handleProyecto"
      @clienteIncrementado="handleCliente"
    />
    
    <ServicesGrid />
    <ProjectsGrid />
    <TestimonialsCarousel />
    <MisionVision />
    <WhyChooseUs />
  </div>
</template>

<script>
import InteractiveCounter from '@/components/home/InteractiveCounter.vue';
import HeroCarousel from '@/components/home/HeroCarousel.vue';
import ServicesGrid from '@/components/home/ServicesGrid.vue';
import ProjectsGrid from '@/components/home/ProjectsGrid.vue';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel.vue';
import MisionVision from '@/components/home/MisionVision.vue';
import WhyChooseUs from '@/components/home/WhyChooseUs.vue';

export default {
  name: 'Home',
  components: {
    HeroCarousel,
    InteractiveCounter, 
    ServicesGrid,
    ProjectsGrid,
    TestimonialsCarousel,
    MisionVision,
    WhyChooseUs
  },
  methods: {
    handleProyecto(total) {
      console.log('Total proyectos:', total);
    },
    handleCliente(total) {
      console.log('Total clientes:', total);
    } 
  }

};
</script>

