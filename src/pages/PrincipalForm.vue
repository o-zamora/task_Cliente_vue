<template>
  <v-toolbar app>
    <v-toolbar-title>Gestiona Tareas</v-toolbar-title>
  </v-toolbar>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <FormTasks/>
        </v-col>
        <v-col cols="12" sm="6">
          <FiltroStatus
            @filter-status="handleFilterStatus"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TableTask
            :filter="filter"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script setup lang="ts">
import {ref} from "vue";

const filter = ref(null)

const handleFilterStatus = (status) => {
  filter.value = status
  console.log('Filter status:', status)
}
</script>

<style scoped>

</style>
