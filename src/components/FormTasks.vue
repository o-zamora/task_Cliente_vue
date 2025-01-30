<template>
  <v-dialog v-model="dialog" max-width="780px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs"  v-on="on" color="primary" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
        Crear Tarea
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Crear Tarea</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Título"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              <v-textarea
                v-model="description"
                label="Descripción"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="4">
              <v-autocomplete
                v-model="selected"
                :items="items"
                label="Selecciona un item"
                :item-text="item => item.dsc"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <v-date-picker
                v-model="date"
                title="Fecha Límite"
                required
                format="yyyy-MM-dd"
              ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center justify-center">
              <v-time-picker
                v-model="time"
                title="Hora Límite"
                required
                format="24hr"
              ></v-time-picker>
            </v-col>
          </v-row>

          <v-btn @click="createTask" color="primary"><v-icon>mdi-content-save</v-icon> Guardar</v-btn>
          <v-btn @click="dialog = !dialog" color="error"><v-icon>mdi-close</v-icon> Cancelar</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const dialog = ref(false)
const title = ref("")
const description = ref("")
const selected = ref(null)
// api [{"id_status":1,"dsc":"pendiente"},{"id_status":2,"dsc":"en progreso"},{"id_status":3,"dsc":"completado"}]
const items = ref([])
const date = ref(new Date()); // Formato yyyy-MM-dd

const time = ref(new Date())
console.log(date.value.toISOString().split('T')[0])
onMounted(async () => {
  await getItems()
})

watch(async () => dialog, (value) => {
  if (value) {
    getItems()
  }
})

const getItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/status")
    items.value = response.data.map((item: any) => {
      return {
        id: item.id_status,
        title: item.dsc
      }
    })
  } catch (e) {
    console.error(e)
  }
}

const createTask = async () => {
  try {
    const formattedDateTime = `${date.value.toISOString().split('T')[0]} ${time.value.toISOString().split('T')[1].split('.')[0]}`; // Formato: yyyy-MM-dd HH:mm:ss
    console.log(formattedDateTime)
    const response = await axios.post("http://127.0.0.1:8000/api/tasks", {
      title: title.value,
      description: description.value,
      id_status: selected.value,
      due_date: formattedDateTime
    })
    console.log(response)
  } catch (e) {
    console.error(e)
  }
  finally {
    dialog.value = false
  }
}
</script>
<style scoped>

</style>
