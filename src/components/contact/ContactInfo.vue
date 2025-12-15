<template>
  <div class="info-contacto">
    <div v-for="item in contactItems" :key="item.id" class="info-item">
      <div class="info-icon">
        <i :class="item.icon"></i>
      </div>
      <div class="info-text">
        <h3>{{ item.title }}</h3>
        <p v-if="item.link">
          <a :href="item.link" :target="item.target || '_self'">{{ item.text }}</a>
        </p>
        <p v-else>{{ item.text }}</p>
      </div>
    </div>

    <div class="horario-atencion">
      <h3>Horario de Atención</h3>
      <p><strong>Lunes - Viernes:</strong> 9:00 - 18:00</p>
      <p><strong>Sábados:</strong> 9:00 - 13:00</p>
      <p><strong>Domingos:</strong> Cerrado</p>
      <div :class="['mensaje-horario', availabilityClass]">
        <p>{{ availabilityMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  data() {
    return {
      contactItems: [
        {
          id: 1,
          icon: 'fas fa-map-marker-alt',
          title: 'Ubicación',
          text: 'La Paz, Bolivia'
        },
        {
          id: 2,
          icon: 'fas fa-phone',
          title: 'Teléfono',
          text: '+591 70000000'
        },
        {
          id: 3,
          icon: 'fas fa-envelope',
          title: 'Correo electrónico',
          text: 'contacto@tinw.com'
        },
        {
          id: 4,
          icon: 'fab fa-whatsapp',
          title: 'WhatsApp',
          text: '+591 70000000',
          link: 'https://wa.me/59170000000',
          target: '_blank'
        }
      ],
      availabilityMessage: '',
      availabilityClass: ''
    };
  },
  mounted() {
    this.checkAvailability();
  },
  methods: {
    checkAvailability() {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      if (day === 0) {
        // Domingo
        this.availabilityMessage =
          'Hoy es domingo. Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 13:00.';
        this.availabilityClass = 'mensaje-no-disponible';
      } else if (day >= 1 && day <= 5) {
        // Lunes a Viernes
        if (hour >= 9 && hour < 18) {
          this.availabilityMessage =
            '¡Estamos disponibles! Horario de atención: Lunes a Viernes de 9:00 a 18:00.';
          this.availabilityClass = 'mensaje-disponible';
        } else {
          this.availabilityMessage =
            'Fuera del horario de atención. Estaremos disponibles de lunes a viernes de 9:00 a 18:00.';
          this.availabilityClass = 'mensaje-no-disponible';
        }
      } else if (day === 6) {
        // Sábado
        if (hour >= 9 && hour < 13) {
          this.availabilityMessage =
            '¡Estamos disponibles! Horario de atención: Sábados de 9:00 a 13:00.';
          this.availabilityClass = 'mensaje-disponible';
        } else {
          this.availabilityMessage =
            'Fuera del horario de atención. Estaremos disponibles el próximo lunes de 9:00 a 18:00.';
          this.availabilityClass = 'mensaje-no-disponible';
        }
      }
    }
  }
};
</script>
