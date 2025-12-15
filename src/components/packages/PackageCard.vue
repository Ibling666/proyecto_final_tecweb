<template>
  <div class="paquete-card">
    <div class="paquete-header">
      <h3>{{ pkg.name }}</h3>
      <div class="paquete-precio">
        <span v-if="pkg.originalPrice" class="original-price">
          Bs {{ pkg.originalPrice }}
        </span>
        Bs {{ pkg.price }}
      </div>
      <p>{{ pkg.description }}</p>
      <CountdownTimer v-if="pkg.hasOffer" />
    </div>
    <div class="paquete-body">
      <ul class="paquete-lista">
        <li v-for="(feature, index) in pkg.features" :key="index">
          {{ feature }}
        </li>
      </ul>
      <a href="#" class="btn" @click.prevent="handleContract">
        {{ pkg.hasOffer ? "Aprovechar Oferta" : "Contratar " + pkg.name }}
      </a>
    </div>
  </div>
</template>

<script>
import CountdownTimer from "./CountdownTimer.vue";

export default {
  name: "PackageCard",
  components: {
    CountdownTimer,
  },
  props: {
    pkg: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleContract() {
      this.$router.push("/contacto");
    },
  },
};
</script>
