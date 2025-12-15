<template>
  <div class="formulario-contacto">
    <TimeInfo />

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre completo</label>
        <input
          type="text"
          id="nombre"
          v-model="formData.nombre"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input type="tel" id="telefono" v-model="formData.telefono" class="form-control" />
      </div>

      <div class="form-group">
        <label for="tipo-proyecto">Tipo de proyecto</label>
        <select
          id="tipo-proyecto"
          v-model="formData.tipoProyecto"
          @change="updateProjectInfo"
          class="form-control"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="web">Sitio Web Corporativo</option>
          <option value="ecommerce">Tienda en Línea</option>
          <option value="app">Aplicación Web</option>
          <option value="rediseño">Rediseño de Sitio</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div class="form-group">
        <label for="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          v-model="formData.mensaje"
          class="form-control"
          required
        ></textarea>
      </div>

      <button type="submit" class="btn">Enviar Mensaje</button>
    </form>

    <div v-if="projectInfo" class="info-proyecto">
      <h4>{{ projectInfo.title }}</h4>
      <p>{{ projectInfo.description }}</p>
    </div>

    <div class="lista-servicios">
      <h4>Nuestros Servicios Incluyen:</h4>
      <ul>
        <li v-for="(service, index) in services" :key="index">{{ service }}</li>
      </ul>
    </div>

    <div class="contador-contactos">
      <h4>Contactos Recibidos</h4>
      <p>
        Hemos recibido <strong>{{ contactCount }}</strong> consultas hasta ahora.
      </p>
      <p v-if="contactCount >= 5" class="special-message">
        ¡Gracias por confiar en nosotros! Seguimos creciendo juntos.
      </p>
    </div>

    <div v-if="message" :class="['mensaje-envio', messageClass]">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import TimeInfo from './TimeInfo.vue';

export default {
  name: 'ContactForm',
  components: {
    TimeInfo
  },
  emits: ['submitted'],
  data() {
    return {
      formData: {
        nombre: '',
        email: '',
        telefono: '',
        tipoProyecto: '',
        mensaje: ''
      },
      projectInfo: null,
      services: [
        'Desarrollo Web Personalizado',
        'Diseño UI/UX Responsivo',
        'Optimización SEO',
        'Integración de Pasarelas de Pago',
        'Sistemas de Gestión de Contenidos',
        'Aplicaciones Web Progresivas',
        'Consultoría Tecnológica',
        'Mantenimiento y Soporte Continuo'
      ],
      contactCount: 0,
      message: '',
      messageClass: ''
    };
  },
  mounted() {
    this.loadContactCount();
  },
  methods: {
    handleSubmit() {
      if (this.validateForm()) {
        const savedContact = this.saveContact();
        this.message =
          '¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.';
        this.messageClass = 'mensaje-exito';
        this.resetForm();
        this.contactCount++;
        this.saveContactCount();
        this.$emit('submitted', savedContact);

        setTimeout(() => {
          this.message = '';
        }, 5000);
      } else {
        this.message = 'Por favor, completa todos los campos obligatorios correctamente.';
        this.messageClass = 'mensaje-error';

        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
    },
    validateForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        this.formData.nombre &&
        this.formData.email &&
        emailRegex.test(this.formData.email) &&
        this.formData.tipoProyecto &&
        this.formData.mensaje
      );
    },
    saveContact() {
      const contact = {
        ...this.formData,
        fecha: new Date().toISOString(),
        id: Date.now()
      };
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      return contact;
    },
    resetForm() {
      this.formData = {
        nombre: '',
        email: '',
        telefono: '',
        tipoProyecto: '',
        mensaje: ''
      };
      this.projectInfo = null;
    },
    loadContactCount() {
      const count = localStorage.getItem('contadorContactos');
      this.contactCount = count ? parseInt(count) : 0;
    },
    saveContactCount() {
      localStorage.setItem('contadorContactos', this.contactCount.toString());
    },
    updateProjectInfo() {
      const projectInfoMap = {
        web: {
          title: 'Sitio Web Corporativo',
          description:
            'Desarrollamos sitios web profesionales que representan tu marca y conectan con tu audiencia. Incluye diseño responsivo, optimización SEO y panel de administración.'
        },
        ecommerce: {
          title: 'Tienda en Línea',
          description:
            'Creamos tiendas online completas con carrito de compras, pasarelas de pago, gestión de inventario y análisis de ventas. Ideal para expandir tu negocio.'
        },
        app: {
          title: 'Aplicación Web',
          description:
            'Desarrollamos aplicaciones web progresivas (PWA) con funcionalidades avanzadas, bases de datos y APIs personalizadas para automatizar procesos.'
        },
        rediseño: {
          title: 'Rediseño de Sitio',
          description:
            'Modernizamos tu sitio web existente mejorando su diseño, funcionalidad, velocidad y experiencia de usuario para aumentar conversiones.'
        },
        otros: {
          title: 'Otros Proyectos',
          description:
            '¿Tienes un proyecto especial? Cuéntanos tus ideas y trabajaremos juntos para desarrollar una solución a medida para tus necesidades.'
        }
      };

      this.projectInfo = projectInfoMap[this.formData.tipoProyecto] || null;
    }
  }
};
</script>

