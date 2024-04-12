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
const { pending, data: desserts } = await useFetch<{
  data: DessertsData[]
}>("http://127.0.0.1:8000/ledger")
Object.freeze({ pending, data: desserts })

const headers: DataTableHeaders = [
  { title: "■", sortable: false, key: "checks" },
  { title: "案件番号", key: "case_id" },
  { title: "案件名", key: "case_name" },
  { title: "営業所名", key: "office_name" },
  { title: "部署名", key: "department_name" },
  { title: "担当者名", key: "handle_name" },
  { title: "登録日", key: "created_at" },
  { title: "確認日", key: "confirmation_at" },
  { title: "ステータス", key: "status_name" },
  { title: "削除", sortable: false, key: "actions" },
]
</script>
<template>
  <v-card class="mt-3">
    <div>{{ search }}</div>
    <div>{{ selected }}</div>
    <v-data-table v-if="pending"> loading... </v-data-table>
    <v-data-table
      v-else
      :headers="headers"
      :items="desserts"
      :search="search"
      item-value="no"
      items-per-page-text="表示行数"
    >
      <template #item.checks="{ item }">
        <v-checkbox v-model="selected" size="small" :value="item.case_id" />
      </template>
      <template #item.actions="{ item }">
        <v-btn size="small"> {{ item.case_id }} </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
