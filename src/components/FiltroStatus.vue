<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="primary"
        @click="dialog = !dialog"
      >
        <v-icon>mdi-filter</v-icon>
        Filtrar por estado
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Filtrar por estado</h2>
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="selected">
          <v-radio
            v-for="item in items"
            :key="item.id_status"
            :label="item.dsc"
            :value="item.id_status"
            inline
          ></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="filterByStatus"
          color="primary"
        >
          <v-icon>mdi-filter</v-icon>
          Filtrar
        </v-btn>
        <v-btn
          @click="cleanFilter"
          color="primary"
        >
          <v-icon>mdi-filter-remove</v-icon>
          Limpiar
        </v-btn>

        <v-btn
          @click="dialog = !dialog"
          color="error"
        >
          <v-icon>mdi-close</v-icon>
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import axios from 'axios'

const dialog = ref(false)
const items = ref([])
const selected = ref(null)
const emit = defineEmits(['filter-status'])

onMounted(async () => {
  await getItems()
})

watch(() => selected, async (value) => {
  filterByStatus()
})

const getItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/status")
    items.value = response.data
  } catch (e) {
    console.error(e)
  }
}

const filterByStatus = () => {
  console.log(selected.value)
  // Emitir evento para filtrar
  emit('filter-status', selected.value)
}
const cleanFilter = () => {
  selected.value = null
  filterByStatus()
}
</script>
<style scoped>

</style>
