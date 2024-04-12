<script setup lang="ts">
const carendaer = ref()
</script>

<template>
  <v-date-picker v-model="carendaer" />
  <p>
    Date in ISO format: <strong>{{ carendaer }}</strong>
  </p>
</template>
