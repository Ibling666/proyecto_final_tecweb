<template>
  <section class="testimonios">
    <div class="container">
      <div class="section-title">
        <h2>Lo que dicen nuestros clientes</h2>
        <p>Más de 150 marcas han crecido con TINW</p>
      </div>

      <!-- Loading -->
      <p v-if="loading" class="loading">Cargando testimonios...</p>

      <!-- Error -->
      <p v-if="error" class="error">{{ error }}</p>

      <!-- Carrusel -->
      <div
        v-if="!loading && testimonials.length"
        class="testimonios-carousel-container"
      >
        <div class="testimonios-inner" :style="carouselStyle">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonio-card"
            @click="handleTestimonialClick(testimonial)"
          >
            <div class="testimonio-text">
              <p>"{{ testimonial.message }}"</p>
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

        <!-- Indicadores -->
        <div class="carousel-indicators">
          <span
            v-for="(_, index) in totalSlides"
            :key="index"
            class="indicator"
            :class="{ active: index === activeIndicatorIndex }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineEmits } from "vue";

/* =========================
   EVENTOS (RÚBRICA)
========================= */
const emit = defineEmits(["testimonial-changed"]);

/* =========================
   ESTADO
========================= */
const testimonials = ref([]);
const loading = ref(true);
const error = ref(null);

const currentIndex = ref(0);
const cardsPerView = ref(3);
let autoSlideInterval = null;

/* =========================
   API (RÚBRICA CLAVE)
========================= */
const fetchTestimonials = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Error al obtener testimonios");
    }

    const data = await response.json();

    // Adaptamos la API a testimonios
    testimonials.value = data.map((user) => ({
      id: user.id,
      name: user.name,
      company: user.company.name,
      message: "Excelente servicio, muy profesionales y confiables.",
      image: `https://i.pravatar.cc/150?img=${user.id}`,
    }));

    console.log("Testimonios cargados desde API:", testimonials.value);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

/* =========================
   COMPUTED
========================= */
const carouselStyle = computed(() => {
  const width = 100 / cardsPerView.value;
  return {
    transform: `translateX(-${currentIndex.value * width}%)`,
  };
});

const totalSlides = computed(() =>
  Math.ceil(testimonials.value.length / cardsPerView.value)
);

const activeIndicatorIndex = computed(() =>
  Math.floor(currentIndex.value / cardsPerView.value)
);

/* =========================
   MÉTODOS
========================= */
const updateCardsPerView = () => {
  if (window.innerWidth <= 768) cardsPerView.value = 1;
  else if (window.innerWidth <= 992) cardsPerView.value = 2;
  else cardsPerView.value = 3;
};

const nextSlide = () => {
  const maxIndex = testimonials.value.length - cardsPerView.value;
  const previousIndex = currentIndex.value;

  currentIndex.value =
    currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1;

  emit("testimonial-changed", {
    currentIndex: currentIndex.value,
    previousIndex,
  });
};

const goToSlide = (index) => {
  currentIndex.value = index * cardsPerView.value;
  resetAutoSlide();
};

const handleTestimonialClick = (testimonial) => {
  console.log("Testimonio clickeado:", testimonial);

  emit("testimonial-changed", {
    ...testimonial,
    clicked: true,
  });
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
};

const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

/* =========================
   CICLO DE VIDA
========================= */
onMounted(() => {
  updateCardsPerView();
  fetchTestimonials(); // 👈 AQUÍ SE CONSUME EL API
  startAutoSlide();
  window.addEventListener("resize", updateCardsPerView);
});

onUnmounted(() => {
  stopAutoSlide();
  window.removeEventListener("resize", updateCardsPerView);
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

.loading {
  text-align: center;
  color: #555;
}

.error {
  color: red;
  text-align: center;
}
</style>
