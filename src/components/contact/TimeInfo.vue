<template>
  <div class="info-tiempo">
    <p><strong>Fecha y hora actual:</strong> {{ currentDateTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'TimeInfo',
  data() {
    return {
      currentDateTime: '',
      intervalId: null
    };
  },
  mounted() {
    this.updateDateTime();
    this.intervalId = setInterval(this.updateDateTime, 1000);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      this.currentDateTime = now.toLocaleDateString('es-ES', opciones);
    }
  }
};
</script>
