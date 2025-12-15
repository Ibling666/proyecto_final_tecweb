<template>
  <div class="projects-page">
    <!-- ✅ Hero de proyectos -->
    <ProjectsHero />

    <!-- ✅ Galería de proyectos -->
    <section class="galeria-proyectos">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @ver-proyecto="mostrarProyecto"
        @visualizar-proyecto="mostrarVisualizacion"
      />
    </section>

    <!-- ✅ Modal informativo original -->
    <ProjectModal
      v-if="proyectoSeleccionado"
      :project="proyectoSeleccionado"
      @cerrar="cerrarModal"
      @contactar="contactarProyecto"
    />

    <!-- ✅ Nuevo popup de visualización -->
    <transition name="fade">
      <div
        v-if="proyectoVisual"
        class="overlay"
        @click.self="cerrarVisualizacion"
      >
        <div class="modal-visual">
          <div class="modal-header">
            <h2>{{ proyectoVisual.title }}</h2>
            <button class="cerrar-btn" @click="cerrarVisualizacion">✖</button>
          </div>

          <div class="modal-contenido">
            <!-- 🔹 Si tiene previewUrl -->
            <iframe
              v-if="proyectoVisual.previewUrl"
              :src="proyectoVisual.previewUrl"
              frameborder="0"
              class="preview-frame"
            ></iframe>

            <!-- 🔹 Si no tiene previewUrl: modo "en desarrollo" -->
            <div v-else class="preview-fallback">
              <div class="engranaje-contenedor">
                <div class="gear"></div>
              </div>
              <h3>En desarrollo...</h3>
              <p>Este proyecto se encuentra en proceso de implementación.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ProjectsHero from "@/components/projects/ProjectsHero.vue";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import ProjectModal from "@/components/projects/ProjectModal.vue";
import { projects } from "@/data/projects";

export default {
  name: "Projects",
  components: {
    ProjectsHero,
    ProjectCard,
    ProjectModal,
  },
  data() {
    return {
      projects: projects,
      proyectoSeleccionado: null, // modal informativo
      proyectoVisual: null, // modal visual
    };
  },
  methods: {
    mostrarProyecto(proyecto) {
      this.proyectoSeleccionado = proyecto;
    },
    cerrarModal() {
      this.proyectoSeleccionado = null;
    },
    contactarProyecto(proyecto) {
      console.log("Solicitar contacto por:", proyecto);
      this.$router.push("/contacto");
    },
    mostrarVisualizacion(proyecto) {
      this.proyectoVisual = proyecto;
    },
    cerrarVisualizacion() {
      this.proyectoVisual = null;
    },
  },
};
</script>
