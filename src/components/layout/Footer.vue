<template>
  <footer>
    <div class="container">
          <BackgroundParticles />

      <div class="footer-grid">
        <!-- Sobre la empresa -->
        <div class="footer-col">
          <h3>TINW</h3>
          <p>
            Somos tu aliado en desarrollo web, proyectos digitales y soluciones
            tecnológicas. Creamos experiencias digitales únicas y ofrecemos
            soporte integral para impulsar tu negocio en el mundo digital.
          </p>
          <p><em>Innovación y tecnología a tu alcance</em></p>
        </div>

        <!-- Servicios -->
        <div class="footer-col">
          <h3>Servicios</h3>
          <ul>
            <li v-for="service in footerServices" :key="service.id">
              <router-link :to="service.link">{{ service.name }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Proyectos -->
        <div class="footer-col">
          <h3>Proyectos</h3>
          <ul>
            <li v-for="project in footerProjects" :key="project.id">
              <router-link :to="project.link">{{ project.name }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Paquetes -->
        <div class="footer-col">
          <h3>Paquetes</h3>
          <ul>
            <li v-for="pkg in footerPackages" :key="pkg.id">
              <router-link :to="pkg.link">{{ pkg.name }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Contacto -->
        <div class="footer-col">
          <h3>Contacto</h3>
          <ul>
            <li>
              <i class="fas fa-map-marker-alt"></i> {{ contactInfo.location }}
            </li>
            <li><i class="fas fa-phone"></i> {{ contactInfo.phone }}</li>
            <li><i class="fas fa-envelope"></i> {{ contactInfo.email }}</li>
            <li>
              <i class="fab fa-whatsapp"></i>
              <a :href="contactInfo.whatsappLink" target="_blank"
                >Chat WhatsApp</a
              >
            </li>
            <li><strong>Horario:</strong> {{ contactInfo.schedule }}</li>
          </ul>
        </div>

        <!-- Redes Sociales -->
        <div class="footer-col">
          <h3>Síguenos</h3>
          <p>Mantente actualizado con nuestras innovaciones</p>
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} TINW. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import BackgroundParticles from "./BackgroundParticles.vue";

export default {
  name: 'Footer',
  components: { BackgroundParticles },

  data() {
    return {
      currentYear: new Date().getFullYear(),
      footerServices: [
        { id: 1, name: 'Desarrollo Web', link: '/servicios#web' },
        { id: 2, name: 'Proyectos Digitales', link: '/servicios#proyectos' },
        { id: 3, name: 'Generación de IA', link: '/servicios#ia' },
        { id: 4, name: 'Mantenimiento y Soporte', link: '/servicios#mantenimiento' },
        { id: 5, name: 'Gestión Tecnológica', link: '/servicios#gestion' }
      ],
      footerProjects: [
        { id: 1, name: 'Proyectos Web', link: '/proyectos#web' },
        { id: 2, name: 'Proyectos IA', link: '/proyectos#ia' },
        { id: 3, name: 'Proyectos Corporativos', link: '/proyectos#corporativos' }
      ],
      footerPackages: [
        { id: 1, name: 'Desarrollo web', link: '/paquetes#web' },
        { id: 2, name: 'Proyectos digitales', link: '/paquetes#proyectos' },
        { id: 3, name: 'Generación de IA', link: '/paquetes#ia' },
        { id: 4, name: 'Mantenimiento y Soporte', link: '/paquetes#mantenimiento' },
        { id: 5, name: 'Gestión Tecnológica', link: '/paquetes#gestion' }
      ],
      contactInfo: {
        location: 'La Paz, Bolivia',
        phone: '+591 70000000',
        email: 'contacto@tinw.com',
        whatsappLink: 'https://wa.me/59170000000',
        schedule: 'Lunes - Viernes, 9:00 - 18:00'
      },
      socialLinks: [
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
        { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
        { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
        { name: 'YouTube', icon: 'fab fa-youtube', url: '#' }
      ]
    };
  }
};
</script>
