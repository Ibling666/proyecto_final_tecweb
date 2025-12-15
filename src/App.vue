<template>
  <div id="app">
    <Header />
    <BackgroundParticles />
    <main>
      <router-view />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import BackToTop from './components/layout/BackToTop.vue'
import BackgroundParticles from './components/layout/BackgroundParticles.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    BackToTop,
    BackgroundParticles
  }
}
</script>
