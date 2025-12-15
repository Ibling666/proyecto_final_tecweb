<template>
  <div class="tarjeta-proyecto" @click="emitirProyecto">
    <img :src="project.image" :alt="project.title" class="imagen-proyecto" />

    <div class="contenido">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>

      <!-- ✅ Botón que muestra solo la parte visual del proyecto -->
      <button
        class="btn-visualizar"
        @click.stop="$emit('visualizar-proyecto', project)"
      >
        Visualización de la página
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitirProyecto() {
      // Evento que abre el detalle normal del proyecto
      this.$emit("ver-proyecto", this.project);
    },
  },
};
</script>
