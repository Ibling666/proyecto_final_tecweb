<template>
  <header :class="{ 'scrolled': isScrolled }">
      <BackgroundParticles />

    <div class="container header-container">
      <div class="logo">
        <router-link to="/">
          <img src="/img/index/logo.png" alt="TINW Logo" />
        </router-link>
        <span class="nombre-empresa">TU IDEA NUESTRA WEB</span>
      </div>
      
      <nav class="nav-menu" :class="{ 'active': mobileMenuOpen }">
        <ul>
          <li v-for="item in menuItems" :key="item.path">
            <router-link 
              :to="item.path" 
              @click="closeMobileMenu"
              :class="{ 'active': isActiveRoute(item.path) }"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
      
      <button class="theme-toggle" @click="toggleTheme">
        <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </header>
</template>

<script>
import BackgroundParticles from "./BackgroundParticles.vue";

export default {
  name: "Header",
  components: { BackgroundParticles },
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      isDark: false,
      menuItems: [
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/servicios" },
        { name: "Proyectos", path: "/proyectos" },
        { name: "Paquetes", path: "/paquetes" },
        { name: "Contacto", path: "/contacto" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.isDark = true;
      document.body.classList.add("dark-mode");
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    isActiveRoute(path) {
      return this.$route.path === path;
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    },
  },
};
</script>
