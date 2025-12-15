<template>
  <div class="estadisticas-contacto">
    <h3> Estadísticas de Contacto en Tiempo Real</h3>
    
    <!-- Contador en tiempo real -->
    <div class="stat-card">
      <div class="stat-icon"></div>
      <div class="stat-info">
        <h4>{{ contactos.length }}</h4>
        <p>Contactos Totales</p>
      </div>
    </div>

    <!-- Tipos de proyecto más solicitados -->
    <div class="stat-card" v-if="proyectoMasSolicitado !== 'N/A'">
      <div class="stat-icon"></div>
      <div class="stat-info">
        <h4>{{ proyectoMasSolicitado }}</h4>
        <p>Proyecto Más Solicitado</p>
      </div>
    </div>

    <!-- Mensaje cuando no hay contactos -->
    <div v-if="contactos.length === 0" class="sin-contactos">
      <p> Aún no hay contactos registrados</p>
    </div>

    <!-- Lista de proyectos por tipo -->
    <div v-else class="tipos-proyecto">
      <h4>Distribución por Tipo:</h4>
      <ul>
        <li v-for="(cantidad, tipo) in proyectosPorTipo" :key="tipo">
          <strong>{{ formatearTipo(tipo) }}:</strong> {{ cantidad }} {{ cantidad === 1 ? 'contacto' : 'contactos' }}
        </li>
      </ul>
    </div>

    <!-- Último contacto recibido -->
    <div v-if="ultimoContacto" class="ultimo-contacto-stat">
      <h4>Último Contacto:</h4>
      <p><strong>{{ ultimoContacto.nombre }}</strong></p>
      <p>Email: {{ ultimoContacto.email }}</p>
      <p>Proyecto: <em>{{ formatearTipo(ultimoContacto.tipoProyecto) }}</em></p>
      <small>{{ formatearFecha(ultimoContacto.fecha) }}</small>
    </div>

    <!-- Botones de control -->
    <div class="botones-control">
      <button @click="recargarDatos" class="btn-recargar-stats">
         Actualizar
      </button>
     
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';
import { supabase } from '@/supabase/client.js'

// ===== REF - Valores primitivos reactivos =====
const contactos = ref([]);
const actualizacionesCount = ref(0);

// ===== REACTIVE - Objeto complejo reactivo =====
const estadisticas = reactive({
  totalContactos: 0,
  proyectosPorTipo: {},
  ultimaActualizacion: null
});

// ===== COMPUTED PROPERTIES =====
// Calcula el proyecto más solicitado
const proyectoMasSolicitado = computed(() => {
  if (Object.keys(estadisticas.proyectosPorTipo).length === 0) return 'N/A';
  
  let maxTipo = '';
  let maxCantidad = 0;
  
  for (const [tipo, cantidad] of Object.entries(estadisticas.proyectosPorTipo)) {
    if (cantidad > maxCantidad) {
      maxCantidad = cantidad;
      maxTipo = tipo;
    }
  }
  
  return formatearTipo(maxTipo);
});

// Proyectos por tipo (para el template)
const proyectosPorTipo = computed(() => estadisticas.proyectosPorTipo);

// Último contacto recibido
const ultimoContacto = computed(() => {
  if (contactos.value.length === 0) return null;
  return contactos.value[contactos.value.length - 1];
});

// ===== DEFINEEMITS - Comunicación con padre =====
const emit = defineEmits(['estadisticasActualizadas'])

// ===== LIFECYCLE HOOKS =====
let storageListener = null;

onMounted(() => {
  console.log('📊 Estadísticas conectadas a Supabase')
  cargarContactos()
});



onUnmounted(() => {
  if (storageListener) {
    window.removeEventListener('storage', storageListener);
    window.removeEventListener('contactosActualizados', storageListener);
  }
});

// Observa cambios en contactos y actualiza estadísticas automáticamente
watch(contactos, (nuevosContactos) => {
  actualizarEstadisticas(nuevosContactos);
  estadisticas.ultimaActualizacion = new Date();
  actualizacionesCount.value++;
  
  // Emitir evento al padre
  emit('estadisticasActualizadas', {
    total: nuevosContactos.length,
    proyectos: estadisticas.proyectosPorTipo
  });
}, { deep: true });

// ===== MÉTODOS =====
const cargarContactos = async () => {
  try {
    const { data, error } = await supabase
      .from('contactos')
      .select('*')
      .order('fecha', { ascending: true })

    if (error) throw error

    contactos.value = data || []
  } catch (error) {
    console.error('Error al cargar contactos desde Supabase:', error)
    contactos.value = []
  }
};

const actualizarEstadisticas = (listaContactos) => {
  estadisticas.totalContactos = listaContactos.length;
  
  // Reiniciar contador de tipos
  estadisticas.proyectosPorTipo = {};
  
  // Contar proyectos por tipo
  listaContactos.forEach(contacto => {
    const tipo = contacto.tipoProyecto || 'otros';
    if (estadisticas.proyectosPorTipo[tipo]) {
      estadisticas.proyectosPorTipo[tipo]++;
    } else {
      estadisticas.proyectosPorTipo[tipo] = 1;
    }
  });
};

const recargarDatos = () => {
  console.log(' Recargando datos...');
  cargarContactos();
};

const formatearTipo = (tipo) => {
  const tipos = {
    web: 'Sitio Web Corporativo',
    ecommerce: 'Tienda en Línea',
    app: 'Aplicación Web',
    rediseño: 'Rediseño de Sitio',
    otros: 'Otros Proyectos'
  };
  return tipos[tipo] || tipo;
};

const formatearFecha = (fecha) => {
  const d = new Date(fecha);
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
