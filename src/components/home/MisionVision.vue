<template>
  <section class="mision-vision" @mouseenter="handleSectionView">
    <div class="container">
      <div class="section-title">
        <h2>Nuestra Identidad</h2>
        <p>
          Conoce los principios que guían nuestro trabajo y nos impulsan a superar
          expectativas
        </p>
      </div>
      <div class="mision-vision-grid">
        <div class="mision-card">
          <div class="card-icon">
            <img src="/img/index/mision.webp" alt="Icono Misión" />
          </div>
          <h3>Nuestra Misión</h3>
          <p>
            Desarrollar soluciones web y tecnológicas innovadoras que ayuden a
            empresas y emprendedores a optimizar sus procesos, crear experiencias
            digitales únicas y aprovechar el potencial de la inteligencia
            artificial en fotos, videos y proyectos digitales. Nos comprometemos a
            ofrecer herramientas eficientes y un soporte integral que garantice el
            éxito de nuestros clientes en el entorno digital.
          </p>
        </div>
        <div class="vision-card">
          <div class="card-icon">
            <img src="/img/index/vision.webp" alt="Icono Visión" />
          </div>
          <h3>Nuestra Visión</h3>
          <p>
            Ser un referente en el desarrollo de soluciones digitales y gestión
            tecnológica en Latinoamérica, reconocidos por nuestra capacidad de
            transformar ideas en proyectos innovadores mediante la combinación de
            creatividad, inteligencia artificial y desarrollo web de vanguardia.
            Aspiramos a acompañar a nuestros clientes en su crecimiento sostenible
            y en la transformación digital de sus negocios.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineEmits } from 'vue';

// Emits
const emit = defineEmits(['section-viewed']);

// Methods
const handleSectionView = () => {
  console.log('Sección Misión y Visión vista');
  emit('section-viewed', 'Misión y Visión');
};
</script>