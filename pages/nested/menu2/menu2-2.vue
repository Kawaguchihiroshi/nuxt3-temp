<script setup lang="ts">
definePageMeta({
  title: "ログアウト",
  icon: "mdi-animation",
})
const logout = () => {}
</script>
<template>
  <v-container fluid>
    <v-card>
      <v-row class="pt-4 pl-4">
        <v-col> ログアウト画面 </v-col>
      </v-row>
      <v-row class="pl-6 pb-6">
        <v-col>
          <v-btn :onclick="logout">ログアウト</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
