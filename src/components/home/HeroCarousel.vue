<template>
  <section class="hero" @mousemove="handleMouseMove">
    <div class="hero-carousel">
      <div class="carousel-track" :style="carouselStyle">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
          :style="{ backgroundImage: `url(${slide})` }"
        ></div>
      </div>
    </div>

    <div class="hero-content" :style="heroContentStyle">
      <h1 class="animated-text">TU IDEA, NUESTRA WEB</h1>
      <p class="animated-text">
        Creamos sitios web profesionales, modernos y funcionales que impulsan tu negocio.
      </p>
      <router-link to="/contacto" class="btn">Contrata tu sitio ahora</router-link>
    </div>

    <div class="carousel-nav">
      <button class="carousel-nav-btn prev-btn" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-nav-btn next-btn" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroCarousel',
  data() {
    return {
      currentSlide: 0,
      slides: [
        '/img/index/carrusel1.webp',
        '/img/index/carrusel2.webp',
        '/img/index/carrusel3.webp'
      ],
      autoSlideInterval: null,
      mouseX: 0,
      mouseY: 0
    };
  },
  computed: {
    carouselStyle() {
      return {
        width: `${this.slides.length * 100}%`,
        transform: `translateX(-${(this.currentSlide * 100) / this.slides.length}%)`
      };
    },
    heroContentStyle() {
      return {
        transform: `translate(${this.mouseX * 0.03}px, ${this.mouseY * 0.03}px)`
      };
    }
  },
  mounted() {
    this.startAutoSlide();
    window.addEventListener('scroll', this.handleScrollParallax);
  },
  beforeUnmount() {
    this.stopAutoSlide();
    window.removeEventListener('scroll', this.handleScrollParallax);
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.resetAutoSlide();
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.resetAutoSlide();
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(this.nextSlide, 4000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
    resetAutoSlide() {
      this.stopAutoSlide();
      this.startAutoSlide();
    },
    handleScrollParallax() {
      const offset = window.scrollY * 0.3;
      document.querySelector('.carousel-track').style.transform =
        `translateY(${offset}px) translateX(-${(this.currentSlide * 100) / this.slides.length}%)`;
    },
    handleMouseMove(e) {
      this.mouseX = e.clientX - window.innerWidth / 2;
      this.mouseY = e.clientY - window.innerHeight / 2;
    }
  }
};
</script>
