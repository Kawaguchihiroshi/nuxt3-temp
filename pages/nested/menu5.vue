<script setup lang="ts">
definePageMeta({
  title: "画像ファイルを複数選択",
  icon: "mdi-view-list",
})
const files = ref<File[]>([])
const selected = () => {
  console.log(files.value)
}
</script>
<template>
  <v-container>
    <v-sheet class="h-100">
      <v-file-input
        v-model="files"
        class="w-50"
        label="default"
        multiple
        @update:model-value="selected"
      />
      <div v-for="file in files" :key="file.name">
        filename: {{ file.name }}
      </div>
    </v-sheet>
  </v-container>
</template>
