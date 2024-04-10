<script setup lang="ts">
const activePicker = ref<string | null>(null)
const date = ref<string | null>(null)
const menu = ref(false)

watch(menu, (val: boolean) => {
  if (val) {
    setTimeout(() => {
      activePicker.value = "YEAR"
    })
  }
})

const save = (dateValue: string) => {
  // Assume this.$refs.menu is no longer used as it's not recommended with Composition API
}
</script>
<template>
  <div>
    <div class="mb-6">
      Active picker: <code>{{ activePicker || "null" }}</code>
    </div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="date"
        :active-picker="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substring(0, 10)
        "
        min="1950-01-01"
        @change="save"
      />
    </v-menu>
  </div>
</template>
