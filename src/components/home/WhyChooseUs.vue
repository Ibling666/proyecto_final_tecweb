<template>
  <section class="por-que-contratarnos">
    <div class="container">
      <div class="section-title">
        <h2>¿Por Qué Elegir TINW?</h2>
        <p>
          Descubre las ventajas de trabajar con un equipo especializado en
          desarrollo web, gestión tecnológica y soluciones digitales inteligentes.
        </p>
      </div>
      <div class="beneficios-grid">
        <div
          v-for="benefit in benefits"
          :key="benefit.id"
          class="beneficio-card"
        >
          <div class="beneficio-icon">
            <img :src="benefit.icon" :alt="benefit.title" />
          </div>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WhyChooseUs',
  data() {
    return {
      benefits: [
        {
          id: 1,
          icon: '/img/index/web.webp',
          title: 'Proyectos Web Innovadores',
          description:
            'Desarrollamos sitios web funcionales, modernos y adaptativos que ofrecen experiencias únicas a los usuarios y potencian la presencia digital de tu marca.'
        },
        {
          id: 2,
          icon: '/img/index/IA.webp',
          title: 'IA y Creatividad',
          description:
            'Generamos contenido digital mediante inteligencia artificial, incluyendo imágenes, videos y recursos interactivos que hacen destacar tu negocio en el entorno digital.'
        },
        {
          id: 3,
          icon: '/img/index/solucion.webp',
          title: 'Soluciones Tecnológicas Personalizadas',
          description:
            'Diseñamos y desarrollamos proyectos a medida, ajustados a las necesidades de cada cliente, optimizando procesos y garantizando eficiencia y escalabilidad.'
        },
        {
          id: 4,
          icon: '/img/index/innovacion.webp',
          title: 'Innovación y Vanguardia',
          description:
            'Implementamos las últimas tecnologías y herramientas para garantizar que cada proyecto digital esté a la altura de los estándares más altos del mercado.'
        },
        {
          id: 5,
          icon: '/img/index/mantenimiento.webp',
          title: 'Mantenimiento y Soporte',
          description:
            'Ofrecemos soporte continuo y mantenimiento de tus plataformas y proyectos digitales, asegurando su correcto funcionamiento y actualización constante.'
        },
        {
          id: 6,
          icon: '/img/index/optimizacion.webp',
          title: 'Optimización Basada en Datos',
          description:
            'Nuestras decisiones y mejoras se fundamentan en análisis y métricas precisas, asegurando que cada proyecto digital alcance su máximo potencial.'
        }
      ]
    };
  }
};
</script>
