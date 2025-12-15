<template>
  <section class="contador-interactivo">
    <div class="container">
      <div class="section-title">
        <h2> Nuestro Impacto en Números</h2>
        <p>Datos actualizados en tiempo real</p>
      </div>

      <div class="contadores-grid">
        <!-- Proyectos Completados -->
        <div class="contador-card" @click="incrementarProyectos">
          <div class="contador-icon">
            <i class="fa-solid fa-rocket"></i>
          </div>
          <div class="contador-numero">{{ proyectosCompletados }}</div>
          <div class="contador-label">Proyectos Completados</div>
          <div class="contador-incremento" v-if="mostrarIncrementoProyectos">
            +1
          </div>
        </div>

        <!-- Clientes Satisfechos -->
        <div class="contador-card" @click="incrementarClientes">
          <div class="contador-icon">
              <i class="fa-solid fa-users"></i>
          </div>
          <div class="contador-numero">{{ clientesSatisfechos }}</div>
          <div class="contador-label">Clientes Satisfechos</div>
          <div class="contador-incremento" v-if="mostrarIncrementoClientes">
            +1
          </div>
        </div>

        <!-- Años de Experiencia -->
        <div class="contador-card">
          <div class="contador-icon">
              <i class="fa-solid fa-calendar-check"></i>
          </div>
          <div class="contador-numero">{{ anosExperiencia }}</div>
          <div class="contador-label">Años de Experiencia</div>
        </div>

        <!-- Tecnologías Dominadas -->
        <div class="contador-card" @click="toggleTecnologias">
          <div class="contador-icon">
             <i class="fa-solid fa-laptop-code"></i>
          </div>
          <div class="contador-numero">{{ tecnologias.length }}</div>
          <div class="contador-label">Tecnologías Dominadas</div>
        </div>
      </div>

      <!-- Lista de Tecnologías (se muestra al hacer click) -->
      <transition name="slide-fade">
        <div v-if="mostrarTecnologias" class="tecnologias-lista">
          <h3> Nuestras Tecnologías:</h3>
          <div class="tech-tags">
            <span 
              v-for="(tech, index) in tecnologias" 
              :key="index"
              class="tech-tag"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </transition>

      <!-- Modo de visualización -->
      <div class="modo-visualizacion">
        <button 
          @click="cambiarModo('normal')" 
          :class="{ active: modo === 'normal' }"
        >
           Normal
        </button>
        <button 
          @click="cambiarModo('detallado')" 
          :class="{ active: modo === 'detallado' }"
        >
           Detallado
        </button>
      </div>

      <!-- Vista detallada -->
      <div v-show="modo === 'detallado'" class="vista-detallada">
        <div class="detalle-card">
          <h4> Estadísticas Detalladas</h4>
          <ul>
            <li>Tasa de satisfacción: <strong>{{ tasaSatisfaccion }}%</strong></li>
            <li>Proyectos activos: <strong>{{ proyectosActivos }}</strong></li>
            <li>Tiempo promedio de entrega: <strong>{{ tiempoEntrega }} días</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';

// ===== REF - Valores primitivos reactivos =====
const proyectosCompletados = ref(150);
const clientesSatisfechos = ref(200);
const anosExperiencia = ref(5);
const mostrarTecnologias = ref(false);
const mostrarIncrementoProyectos = ref(false);
const mostrarIncrementoClientes = ref(false);
const modo = ref('normal');

// ===== REACTIVE - Objetos/Arrays reactivos =====
const estadisticas = reactive({
  proyectosActivos: 12,
  tiempoEntrega: 30,
  visitasMensuales: 5000
});

const tecnologias = reactive([
  'Vue.js',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Bootstrap'
]);

// ===== COMPUTED - Propiedades calculadas =====
const tasaSatisfaccion = computed(() => {
  if (proyectosCompletados.value === 0) return 0;
  return Math.round((clientesSatisfechos.value / proyectosCompletados.value) * 100);
});

const proyectosActivos = computed(() => estadisticas.proyectosActivos);
const tiempoEntrega = computed(() => estadisticas.tiempoEntrega);

// ===== DEFINIR EMITS =====
const emit = defineEmits([
  'proyectoIncrementado',
  'clienteIncrementado',
  'modocambiado'
]);

// ===== LIFECYCLE HOOKS =====
onMounted(() => {
  console.log(' Componente de contador montado');
  cargarEstadisticas();
  iniciarAnimacion();
});

// ===== WATCHERS - Observadores =====
// Observar cambios en proyectos completados
watch(proyectosCompletados, (nuevoValor, valorAnterior) => {
  console.log(`Proyectos: ${valorAnterior} → ${nuevoValor}`);
  emit('proyectoIncrementado', nuevoValor);
  
  // Guardar en localStorage
  localStorage.setItem('proyectosCompletados', nuevoValor);
});

// Observar cambios en clientes
watch(clientesSatisfechos, (nuevoValor) => {
  emit('clienteIncrementado', nuevoValor);
  localStorage.setItem('clientesSatisfechos', nuevoValor);
});

// Observar modo de visualización
watch(modo, (nuevoModo) => {
     emit('modocambiado', nuevoModo);
});

// ===== MÉTODOS =====
const cargarEstadisticas = () => {
  const proyectosGuardados = localStorage.getItem('proyectosCompletados');
  const clientesGuardados = localStorage.getItem('clientesSatisfechos');
  
  if (proyectosGuardados) {
    proyectosCompletados.value = parseInt(proyectosGuardados);
  }
  
  if (clientesGuardados) {
    clientesSatisfechos.value = parseInt(clientesGuardados);
  }
};

const incrementarProyectos = () => {
  proyectosCompletados.value++;
  mostrarIncrementoProyectos.value = true;
  
  setTimeout(() => {
    mostrarIncrementoProyectos.value = false;
  }, 1000);
};

const incrementarClientes = () => {
  clientesSatisfechos.value++;
  mostrarIncrementoClientes.value = true;
  
  setTimeout(() => {
    mostrarIncrementoClientes.value = false;
  }, 1000);
};

const toggleTecnologias = () => {
  mostrarTecnologias.value = !mostrarTecnologias.value;
};

const cambiarModo = (nuevoModo) => {
  modo.value = nuevoModo;
};

const iniciarAnimacion = () => {
  // Animación de conteo inicial
  let inicio = 0;
  const duracion = 2000; // 2 segundos
  const fps = 60;
  const frames = duracion / (1000 / fps);
  
  const incrementoPorFrame = proyectosCompletados.value / frames;
  
  let frameActual = 0;
  const interval = setInterval(() => {
    if (frameActual >= frames) {
      clearInterval(interval);
      return;
    }
    frameActual++;
  }, 1000 / fps);
};
</script>
