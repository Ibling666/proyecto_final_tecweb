<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="modal-content">
      <button class="cerrar" @click="cerrar">✖</button>

      <img :src="project.image" alt="" class="modal-img" />

      <h2>{{ project.title }}</h2>
      <p class="descripcion">{{ project.description }}</p>

      <button class="btn-contactar" @click="contactar">
        Contactar por este proyecto
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectModal",
  props: {
    project: { type: Object, required: true },
  },
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
    contactar() {
      this.$emit("contactar", this.project);
    },
  },
};
</script>
