<template>
  <v-card>
    <v-card-title>
      <h2>Tareas</h2>
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="header"
        :items="items"
        :items-length="lengthContent"
        :loading="loading"
        item-key="id"
        @update:options="getItems"
      >
        <template v-slot:item.id_status="{ item }">
          <span>
            {{ item.status.dsc }}
          </span>
        </template>

        <template v-slot:item.due_date="{ item }">
          <span v-if="item.due_date">
            {{ new Date(item.due_date).toLocaleString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }) }}</span>
        </template>
      </v-data-table-server>
    </v-card-text>

  </v-card>
</template>


<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  filter: {
    type: Number,
    required: false,
    default: null
  }
})

const items = ref([])
const itemsPerPage = ref(5)
const lengthContent = ref(0)
const loading = ref(false)

watch(() => props.filter, async (value) => {
  await getLengthContent()
  await getItems()
})


const header = [
  {title: 'ID', align: 'left', sortable: true, key: 'id'},
  {title: 'Título', align: 'left', sortable: true, key: 'title'},
  {title: 'Descripción', align: 'left', sortable: true, key: 'description'},
  {title: 'Fecha de vencimiento', align: 'left', sortable: true, key: 'due_date'},
  {title: 'Estado', align: 'left', sortable: true, key: 'id_status'},
  {title: 'Creado', align: 'left', sortable: true, key: 'created_at'},
  {title: 'Actualizado', align: 'left', sortable: true, key: 'updated_at'},
]

onMounted(async () => {
  // se necesita la longitud de los items para el paginado y la cantidad de items por
  // página se calcula en el componente data-table-server
  // de manera que longitud entre items por página es igual a la cantidad de páginas
  await getLengthContent()
  await getItems()
})

const getItems = async ({ page, itemsPerPage, sortBy }) => {
  try {
    console.log('getItems tableTask', page, itemsPerPage, sortBy)
    loading.value = true
    let filter = props.filter ? `?id_status=${props.filter}` : ''
    filter += props.filter ? `&page=${page}` : `?page=${page}`

    const response = await axios.get("http://127.0.0.1:8000/api/tasks" + filter)
    console.log(response.data, 'response in getItems tableTask')
    items.value = response.data
  } catch (e) {
    console.error(e)
  }
  finally {
    console.log(items.value)
    loading.value = false
  }
}

const getLengthContent = async () => {
  try {
    loading.value = true
    const filter = props.filter ? `?id_status=${props.filter}` : ''
    const response = await axios.get("http://127.0.0.1:8000/api/tasks/length" + filter)
    lengthContent.value = response.data

  } catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
}
</script>
<style scoped>

</style>
