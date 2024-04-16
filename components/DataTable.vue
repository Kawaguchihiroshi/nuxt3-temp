<script setup lang="ts">
import type { DataTableHeaders } from "@/plugins/vuetify"

defineProps({
  search: {
    type: String,
    required: true,
  },
})

const selected = ref([])

interface DessertsData {
  case_id: string
  case_name: string
  handle_id: string
  handle_name: string
  user_id: string
  department_id: string
  department_name: string
  office_id: string
  office_name: string
  status_id: string
  status_name: string
  created_at: number
  confirmation_at: number
}
const {
  pending,
  data: desserts,
  error,
} = await useFetch<{ data: DessertsData[] }>("http://127.0.0.1:8000/ledger")

const headers: DataTableHeaders = [
  { title: "", sortable: false, key: "checks" },
  { title: "案件番号", key: "case_id" },
  { title: "案件名", key: "case_name" },
  { title: "営業所名", key: "office_name", align: "center" },
  { title: "部署名", key: "department_name", align: "center" },
  { title: "担当者名", key: "handle_name", align: "center" },
  { title: "登録日", key: "created_at", align: "center" },
  { title: "確認日", key: "confirmation_at", align: "center" },
  { title: "ステータス", key: "status_name", align: "center" },
  { title: "削除", sortable: false, key: "actions", align: "center" },
]
</script>
<template>
  <v-card class="mt-3">
    <div>{{ search }}</div>
    <div v-if="selected[0] !== undefined">{{ selected }}</div>
    <!-- APIを読み込んでいる間の処理 -->
    <v-data-table
      v-if="pending"
      class="pt-4 pl-4"
      items-per-page-text="表示行数"
    >
      loading...
    </v-data-table>

    <!-- APIの読み込みが失敗した場合のエラー処理 -->
    <v-data-table v-else-if="error" items-per-page-text="表示行数">
      <div class="pa-4">API not found</div>
    </v-data-table>

    <!-- APIを読み込んで表示する通常処理 -->
    <v-data-table
      v-else
      :headers="headers"
      :items="desserts"
      :search="search"
      item-value="no"
      items-per-page-text="表示行数"
    >
      <template #item.checks="{ item }">
        <v-checkbox v-model="selected" :value="item.case_id" />
      </template>
      <template #item.actions="{ item }">
        <Dialogs :id="item.case_id" />
      </template>
    </v-data-table>
  </v-card>
</template>
<style scoped>
.v-input__details {
  grid-area: messages;
}
</style>
