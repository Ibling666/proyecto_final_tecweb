import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/servicios',
    name: 'Services',
    component: () => import('../views/Services.vue')
  },
  {
    path: '/proyectos',
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/paquetes',
    name: 'Packages',
    component: () => import('../views/Packages.vue')
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})


export default router