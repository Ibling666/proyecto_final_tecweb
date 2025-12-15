<template>
  <section class="testimonios">
    <div class="container">
      <div class="section-title">
        <h2>Lo que dicen nuestros clientes</h2>
        <p>Más de 150 marcas han crecido con nuestra empresa TINW</p>
      </div>
      <div class="testimonios-carousel-container">
        <div class="testimonios-inner" :style="carouselStyle">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonio-card"
            @click="handleTestimonialClick(testimonial)"
          >
            <div class="testimonio-text">
              <p>{{ testimonial.message }}</p>
            </div>
            <div class="testimonio-autor">
              <img :src="testimonial.image" :alt="testimonial.name" />
              <div>
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.company }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-indicators">
          <div
            v-for="(indicator, index) in totalSlides"
            :key="index"
            class="indicator"
            :class="{ active: index === activeIndicatorIndex }"
            @click="goToSlide(index)"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineEmits } from 'vue';
import { testimonials } from '@/data/testimonials';

// Emits
const emit = defineEmits(['testimonial-changed']);

// Data
const currentIndex = ref(0);
const cardsPerView = ref(3);
let autoSlideInterval = null;

// Computed
const carouselStyle = computed(() => {
  const cardWidth = 100 / cardsPerView.value;
  const translateX = -currentIndex.value * cardWidth;
  return {
    transform: `translateX(${translateX}%)`
  };
});

const totalSlides = computed(() => {
  return Math.ceil(testimonials.length / cardsPerView.value);
});

const activeIndicatorIndex = computed(() => {
  return Math.floor(currentIndex.value / cardsPerView.value);
});

// Methods
const updateCardsPerView = () => {
  if (window.innerWidth <= 768) {
    cardsPerView.value = 1;
  } else if (window.innerWidth <= 992) {
    cardsPerView.value = 2;
  } else {
    cardsPerView.value = 3;
  }
};

const nextSlide = () => {
  const maxIndex = testimonials.length - cardsPerView.value;
  const previousIndex = currentIndex.value;
  currentIndex.value = currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1;
  
  // Emitir evento con el testimonio visible
  const visibleTestimonial = testimonials[currentIndex.value];
  emit('testimonial-changed', {
    id: visibleTestimonial.id,
    name: visibleTestimonial.name,
    company: visibleTestimonial.company,
    currentIndex: currentIndex.value,
    previousIndex
  });
};

const goToSlide = (index) => {
  const maxIndex = testimonials.length - cardsPerView.value;
  const previousIndex = currentIndex.value;
  currentIndex.value = Math.min(Math.max(index * cardsPerView.value, 0), maxIndex);
  resetAutoSlide();
  
  // Emitir evento
  const visibleTestimonial = testimonials[currentIndex.value];
  emit('testimonial-changed', {
    id: visibleTestimonial.id,
    name: visibleTestimonial.name,
    company: visibleTestimonial.company,
    currentIndex: currentIndex.value,
    previousIndex
  });
};

const handleTestimonialClick = (testimonial) => {
  console.log(' Testimonio clickeado:', testimonial.name);
  
  // Emitir evento específico del testimonio clickeado
  emit('testimonial-changed', {
    id: testimonial.id,
    name: testimonial.name,
    company: testimonial.company,
    message: testimonial.message,
    clicked: true
  });
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 3000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
};

const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

// Lifecycle
onMounted(() => {
  updateCardsPerView();
  startAutoSlide();
  window.addEventListener('resize', updateCardsPerView);
});

onUnmounted(() => {
  stopAutoSlide();
  window.removeEventListener('resize', updateCardsPerView);
});
</script>

<style scoped>
.testimonio-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonio-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}
</style>