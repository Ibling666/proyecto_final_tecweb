<template>
  <div class="lista-contactos-guardados">
    <h3>Contactos guardados (localStorage)</h3>

    <div class="acciones-lista">
      <button class="btn-recargar" @click="loadContacts">Recargar</button>
      <button class="btn-exportar" @click="exportContacts" :disabled="contacts.length === 0">
        Exportar contactos
      </button>
      <button class="btn-vaciar" @click="clearContacts" :disabled="contacts.length === 0">
        Vaciar lista
      </button>
    </div>

    <p v-if="contacts.length === 0" class="vacio">No hay contactos todavía.</p>

    <ul v-else>
      <li v-for="contact in contacts" :key="contact.id">
        <strong>{{ contact.nombre }}</strong> - {{ contact.email }} <br />
        <em>{{ contact.tipoProyecto }}</em> <br />
        <small>{{ formatDate(contact.fecha) }}</small>
      </li>
    </ul>

    <p v-if="showMessage" class="mensaje">{{ showMessage }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const contacts = ref([]);
const showMessage = ref('');

const loadContacts = () => {
  const saved = JSON.parse(localStorage.getItem('contacts') || '[]');
  contacts.value = saved.reverse();
  showMessage.value = `Se cargaron ${contacts.value.length} contactos.`;
  setTimeout(() => (showMessage.value = ''), 3000);
};

const clearContacts = () => {
  localStorage.removeItem('contacts');
  localStorage.removeItem('contadorContactos');
  contacts.value = [];
  showMessage.value = 'Lista vaciada correctamente.';
  
  // Disparar evento para que otros componentes se actualicen
  window.dispatchEvent(new Event('contactosActualizados'));
  
  setTimeout(() => (showMessage.value = ''), 3000);
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString('es-ES');
};

const exportContacts = () => {
  if (contacts.value.length === 0) return;

  const jsonData = JSON.stringify(contacts.value, null, 2);
  const csvData = convertToCSV(contacts.value);

  downloadFile(jsonData, 'contactos.json', 'application/json');
  downloadFile(csvData, 'contactos.csv', 'text/csv');
  showMessage.value = 'Contactos exportados (JSON y CSV).';
  setTimeout(() => (showMessage.value = ''), 4000);
};

const convertToCSV = (data) => {
  if (data.length === 0) return '';
  const keys = Object.keys(data[0]);
  const csvRows = [keys.join(',')];
  for (const obj of data) {
    const values = keys.map((key) => `"${(obj[key] ?? '').toString().replace(/"/g, '""')}"`);
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
};

const downloadFile = (content, fileName, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

onMounted(() => {
  loadContacts();
});
</script>
