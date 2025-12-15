<template>
  <div class="projects-page">
    <ProjectsHero />

    <section class="galeria-proyectos">
      <p v-if="loading">Cargando proyectos...</p>
      <p v-if="error">Error al cargar proyectos</p>

      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @ver-detalle="mostrarDetalle"
      />
    </section>
  </div>
</template>

<script>
import ProjectsHero from "@/components/projects/ProjectsHero.vue";
import ProjectCard from "@/components/projects/ProjectCard.vue";

export default {
  name: "Projects",
  components: {
    ProjectsHero,
    ProjectCard,
  },
  data() {
    return {
      projects: [],
      loading: true,
      error: false,
    };
  },
  mounted() {
    this.obtenerProyectos();
  },
  methods: {
    async obtenerProyectos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=6"
        );
        const data = await response.json();

        this.projects = data.map((post) => ({
          id: post.id,
          title: post.title,
          description: post.body,
          image: "https://picsum.photos/400/300?random=" + post.id,
        }));

        this.loading = false;
      } catch (error) {
        console.error(error);
        this.error = true;
        this.loading = false;
      }
    },

    mostrarDetalle(proyecto) {
      console.log("Proyecto seleccionado:", proyecto);
    },
  },
};
</script>
