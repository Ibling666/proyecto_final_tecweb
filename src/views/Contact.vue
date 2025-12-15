<template>
  <div class="contact-page">
    <!-- Hero con video de fondo -->
    <section class="hero-contacto">
      <div class="hero-video">
        <video autoplay muted loop playsinline>
          <source
            src="/mp4/servicios/PixVerse_V5_Image_Text_360P_Genera_un_video_co.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el elemento video.
        </video>
      </div>
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1>Contáctanos</h1>
          <p>
            Estamos aquí para ayudarte a transformar tu idea en una realidad
            digital. Completa el formulario y nos pondremos en contacto contigo lo
            antes posible.
          </p>
          <a href="#formulario" class="btn">Enviar Mensaje</a>
        </div>
      </div>
    </section>

    <!-- Sección de tarjetas informativas -->
    <section class="info-cards-section">
      <div class="container">
        <div class="info-cards-grid">
          <div 
            v-for="card in infoCards" 
            :key="card.id" 
            class="info-card"
          >
            <div class="info-card-icon">
              <i :class="card.icon"></i>
            </div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulario de contacto -->
    <section class="contacto" id="formulario">
      <div class="container">
        <div class="section-title">
          <h2>Ponte en Contacto</h2>
          <p>
            Completa el formulario y nos pondremos en contacto contigo en menos de
            24 horas.
          </p>
        </div>

        <!-- Grid con formulario e información -->
        <div class="contacto-grid">
          <ContactForm @submitted="handleContactSubmitted" />
          <ContactInfo />
        </div>

        <!-- Último contacto recibido -->
        <transition name="fade">
          <div v-if="lastContact" class="ultimo-contacto">
            <h3>Último contacto recibido</h3>
            <div class="contacto-detalle">
              <p><strong>Nombre:</strong> {{ lastContact.nombre }}</p>
              <p><strong>Correo:</strong> {{ lastContact.email }}</p>
              <p><strong>Proyecto:</strong> {{ formatearTipoProyecto(lastContact.tipoProyecto) }}</p>
              <p><strong>Fecha:</strong> {{ formatearFecha(lastContact.fecha) }}</p>
            </div>
          </div>
        </transition>

        <!-- Lista de contactos guardados -->
        <ContactList @contactosActualizados="recargarEstadisticas" />

        <!-- Estadísticas en tiempo real -->
        <ContactStats 
          ref="contactStatsRef"
          @estadisticasActualizadas="handleStats" 
          @estadisticasLimpiadas="handleLimpiar"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ContactForm from '@/components/contact/ContactForm.vue';
import ContactInfo from '@/components/contact/ContactInfo.vue';
import ContactList from '@/components/contact/ContactList.vue';
import ContactStats from '@/components/contact/ContactStats.vue';

export default {
  name: 'Contact',
  components: {
    ContactForm,
    ContactInfo,
    ContactList,
    ContactStats
  },
  data() {
    return {
      infoCards: [
        {
          id: 1,
          icon: 'fas fa-clock',
          title: 'Respuesta Rápida',
          description: 'Respondemos todas las consultas en menos de 24 horas hábiles.'
        },
        {
          id: 2,
          icon: 'fas fa-headset',
          title: 'Soporte Continuo',
          description:
            'Ofrecemos soporte técnico durante y después del desarrollo de tu proyecto.'
        },
        {
          id: 3,
          icon: 'fas fa-shield-alt',
          title: 'Garantía de Calidad',
          description:
            'Todos nuestros proyectos incluyen garantía de funcionamiento y calidad.'
        }
      ],
      lastContact: null,
      totalContactos: 0
    };
  },
  mounted() {
    // Escuchar eventos de actualización de contactos
    window.addEventListener('contactosActualizados', this.recargarEstadisticas);
  },
  beforeUnmount() {
    // Limpiar listeners al destruir el componente
    window.removeEventListener('contactosActualizados', this.recargarEstadisticas);
  },
  methods: {
    handleContactSubmitted(contact) {
      console.log('Nuevo contacto recibido:', contact);
      this.lastContact = contact;
      
      // Actualizar estadísticas después de un breve delay
      setTimeout(() => {
        this.recargarEstadisticas();
      }, 500);
    },
    
    handleStats(data) {
      console.log('Estadísticas actualizadas:', data);
      this.totalContactos = data.total;
    },
    
    handleLimpiar() {
      console.log('Estadísticas limpiadas');
      this.lastContact = null;
      this.totalContactos = 0;
    },
    
    recargarEstadisticas() {
      // Forzar recarga del componente ContactStats si existe
      if (this.$refs.contactStatsRef) {
        console.log('Recargando estadísticas...');
        // El componente se recargará automáticamente gracias a los event listeners
      }
    },
    
    formatearTipoProyecto(tipo) {
      const tipos = {
        web: 'Sitio Web Corporativo',
        ecommerce: 'Tienda en Línea',
        app: 'Aplicación Web',
        rediseño: 'Rediseño de Sitio',
        otros: 'Otros Proyectos'
      };
      return tipos[tipo] || tipo;
    },
    
    formatearFecha(fecha) {
      if (!fecha) return '';
      const d = new Date(fecha);
      return d.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>
