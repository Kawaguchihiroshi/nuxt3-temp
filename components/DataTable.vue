<script setup lang="ts">
import type { DataTableHeaders } from "@/plugins/vuetify"

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

const search = ref("")

const headers: DataTableHeaders = [
  { title: "チェック", key: "case_name", sortable: false },
  { title: "案件名", key: "case_name" },
  { title: "営業所名", key: "office_name" },
  { title: "部署名", key: "department_name" },
  { title: "担当者名", key: "handle_name" },
  { title: "登録日", key: "created_at" },
  { title: "確認日", key: "confirmation_at" },
  { title: "ステータス", key: "status_name" },
  { title: "削除", key: "actions", sortable: false },
]

const dialogDelete = ref<InstanceType<typeof DialogConfirm> | null>(null)
function showDialogDelete(name: string) {
  dialogDelete.value
    ?.open("この案件情報を削除してもよろしいですか?")
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          const index = desserts.value!.data.findIndex(
            (v: any) => v.name === name,
          )
          desserts.value!.data.splice(index, 1)
          Notify.success("削除しました")
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}
</script>

<template>
  <v-card class="mt-3">
    <client-only>
      <teleport to="#app-bar">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          density="compact"
          class="mr-2"
          rounded="xl"
          flat
          variant="solo"
          style="width: 250px"
        />
      </teleport>
    </client-only>
    <v-data-table v-if="pending"> loading... </v-data-table>
    <v-data-table v-else :headers="headers" :items="desserts" :search="search">
      <template #items>
        <v-defaults-provider
          :defaults="{
            VBtn: {
              size: 20,
              rounded: 'sm',
              variant: 'text',
              class: 'ml-1',
              color: '',
            },
            VIcon: {
              size: 20,
            },
          }"
        />
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              icon="mdi-delete-outline"
              v-bind="props"
              @click.stop="showDialogDelete(item.name)"
            />
          </template>
          <span>削除します</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <DialogConfirm ref="dialogDelete" />
  </v-card>
</template>
