<script setup lang="ts">
import DialogConfirm from '~/components/DialogConfirm.vue'
import type { DataTableHeaders } from '~/plugins/vuetify'

definePageMeta({
  icon: 'mdi-table',
  title: 'データテイブル',
  drawerIndex: 3,
})

const { data: desserts01 } = await useFetch('http://127.0.0.1:8000/ledger')
const search = ref('')

const dialogDelete = ref<InstanceType<typeof DialogConfirm> | null>(null)
function showDialogDelete(name: string) {
  dialogDelete.value
    ?.open('この案件情報を削除してもよろしいですか?')
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          const index = desserts01.value!.findIndex((v: any) => v.name === name)
          desserts01.value!.splice(index, 1)
          Notify.success('削除しました')
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}

interface OfficeData {
  office_id: string
  office_name: string
}
const { data: offices } = await useFetch<{ data: OfficeData[] }>(
  'http://127.0.0.1:8000/office',
)

interface DepartmentData {
  office_id: string
  office_name: string
  department_id: string
  department_name: string
}
const { data: departments } = await useFetch<{ data: DepartmentData[] }>(
  'http://127.0.0.1:8000/department',
)

interface HandleData {
  office_id: string
  office_name: string
  department_id: string
  department_name: string
  handle_id: string
  handle_name: string
}
const { data: handles } = await useFetch<{ data: HandleData[] }>(
  'http://127.0.0.1:8000/department',
)

const selectedOffice = ref('お選びください')
const selectedDepartment = ref('お選びください')
const selectedHandle = ref('お選びください')

const officeNames = offices.value.map((office: any) => office.office_name)

const departmentsNames = ref<string[]>([])
watch(selectedOffice, (newVal: string, oldVal: string) => {
  if (oldVal) {
    const departmentsArray: DepartmentData[] = Object.values(departments.value)
    const filteredDepartments: DepartmentData[] = departmentsArray.filter(
      (department: DepartmentData) => department.office_name === newVal,
    )
    departmentsNames.value = filteredDepartments.map(
      (department: DepartmentData) => department.department_name,
    )
  }
})

const handlesNames = ref<string[]>([])
watch(selectedDepartment, (newVal: string, oldVal: string) => {
  if (oldVal) {
    const handlesArray: HandleData[] = Object.values(handles.value)
    const filteredhandles: HandleData[] = handlesArray.filter(
      (handle: HandleData) => handle.office_name === newVal,
    )
    handlesNames.value = filteredhandles.map(
      (handle: HandleData) => handle.handle_name,
    )
  }
})

const headers: DataTableHeaders = [
  { title: 'チェック', key: 'name', sortable: false },
  { title: '案件名', key: 'case_name' },
  { title: '営業所名', key: 'office_name' },
  { title: '部署名', key: 'department_name' },
  { title: '担当者名', key: 'handle_name' },
  { title: '登録日', key: 'created_at' },
  { title: '確認日', key: 'confirmation_at' },
  { title: 'ステータス', key: 'status_name' },
  { title: '削除', key: 'actions', sortable: false },
]
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-skeleton-loader type="card">
          <v-card color="black" class="bg-white" max-width="500px">
            <v-card-title>本日追加された確認書の枚数</v-card-title>
            <v-card-subtitle
              >お仕着せのスタイル付き v-sheet と考えればOK</v-card-subtitle
            >
            <v-divider />
            <v-card-text>
              色や影、角などのスタイルは variant か props, color
              で指定することで、 一括して自動で設定されます。class
              で設定することも可能ですが、 指定内容によっては variant / props
              の設定が優先されることがあります。
            </v-card-text>
            <v-row justify="end" class="mr-4 mb-3">
              <v-col cols="auto">
                <v-btn color="primary">確認する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader type="card">
          <v-card color="black" class="bg-white" max-width="500px">
            <v-card-title>本日追加された確認書の枚数</v-card-title>
            <v-card-subtitle
              >お仕着せのスタイル付き v-sheet と考えればOK</v-card-subtitle
            >
            <v-divider />
            <v-card-text>
              色や影、角などのスタイルは variant か props, color
              で指定することで、 一括して自動で設定されます。class
              で設定することも可能ですが、 指定内容によっては variant / props
              の設定が優先されることがあります。
            </v-card-text>
            <v-row justify="end" class="mr-4 mb-3">
              <v-col cols="auto">
                <v-btn color="primary">確認する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader type="card">
          <v-card color="black" class="bg-white" max-width="500px">
            <v-card-title>本日追加された確認書の枚数</v-card-title>
            <v-card-subtitle
              >お仕着せのスタイル付き v-sheet と考えればOK</v-card-subtitle
            >
            <v-divider />
            <v-card-text>
              色や影、角などのスタイルは variant か props, color
              で指定することで、 一括して自動で設定されます。class
              で設定することも可能ですが、 指定内容によっては variant / props
              の設定が優先されることがあります。
            </v-card-text>
            <v-row justify="end" class="mr-4 mb-3">
              <v-col cols="auto">
                <v-btn color="primary">確認する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader type="card">
          <v-card color="black" class="bg-white" max-width="500px">
            <v-card-title>本日追加された確認書の枚数</v-card-title>
            <v-card-subtitle
              >お仕着せのスタイル付き v-sheet と考えればOK</v-card-subtitle
            >
            <v-divider />
            <v-card-text>
              色や影、角などのスタイルは variant か props, color
              で指定することで、 一括して自動で設定されます。class
              で設定することも可能ですが、 指定内容によっては variant / props
              の設定が優先されることがあります。
            </v-card-text>
            <v-row justify="end" class="mr-4 mb-3">
              <v-col cols="auto">
                <v-btn color="primary">確認する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <v-row>
            <v-col> 検索 </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col max-width="500px">
              <v-text-field clearable label="フリーワード" />
            </v-col>
            <v-col max-width="500px">
              <v-checkbox label="自分が担当した案件" :model-value="false" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-checkbox label="Jacob" :model-value="true" />
            </v-col>
            <v-col cols="1">
              <v-checkbox label="Jacob" :model-value="false" />
            </v-col>
            <v-col cols="1">
              <v-checkbox label="Jacob" disabled />
            </v-col>
            <v-col cols="1">
              <v-checkbox label="Jacob" :model-value="false" disabled />
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker in dialog"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="date" @input="menu2 = false" />
              </v-menu>
            </v-col>

            <v-col>
              <v-file-input
                label="File input"
                filled
                prepend-icon="mdi-camera"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col max-width="500px">
              <div>selectedOffice：{{ selectedOffice }}</div>
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedOffice"
                  label="営業所名"
                  :items="officeNames"
                  item-text="office_name"
                  item-value="office_id"
                  clearable
                />
              </v-skeleton-loader>
            </v-col>
            <v-col max-width="500px">
              <div>departmentsNames：{{ departmentsNames }}</div>
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedDepartment"
                  label="部署名"
                  :items="departmentsNames"
                  item-text="department_name"
                  item-value="department_id"
                  clearable
                />
              </v-skeleton-loader>
            </v-col>
            <v-col max-width="500px">
              <div>handlesNames：{{ handlesNames }}</div>
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedHandle"
                  label="担当者名"
                  :items="handlesNames"
                  item-text="handle_name"
                  item-value="handle_id"
                  clearable
                />
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" />
            <v-col cols="1">
              <v-btn> 検索する </v-btn>
            </v-col>
            <v-col cols="1">
              <v-btn> リセット </v-btn>
            </v-col>
          </v-row>
        </v-card>
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
          <v-data-table
            :headers="headers"
            :items="desserts01"
            item-value="name"
            :search="search"
          >
            <template #item.actions="{ item }">
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
              >
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
              </v-defaults-provider>
            </template>
          </v-data-table>
          <DialogConfirm ref="dialogDelete" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
