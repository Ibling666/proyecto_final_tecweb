<template>
  <div class="countdown-timer">
    <p>La oferta termina en:</p>
    <div v-if="!expired">
      <span>{{ days }}d</span>
      <span>{{ hours }}h</span>
      <span>{{ minutes }}m</span>
      <span>{{ seconds }}s</span>
    </div>
    <div v-else>¡LA OFERTA HA EXPIRADO!</div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
      countdownInterval: null
    };
  },
  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    startCountdown() {
      const countDownDate = new Date('Dec 31, 2025 23:59:59').getTime();

      this.countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
          this.expired = true;
          clearInterval(this.countdownInterval);
          return;
        }

        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }, 1000);
    }
  }
};
</script>
