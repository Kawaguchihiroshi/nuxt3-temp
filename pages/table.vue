<script setup lang="ts">
definePageMeta({
  icon: "mdi-table",
  title: "データテイブル",
  drawerIndex: 3,
})

interface OfficeData {
  office_id: string
  office_name: string
}
const { data: offices } = await useFetch<{
  map: any
  data: OfficeData[]
}>("http://127.0.0.1:8000/office")

interface DepartmentData {
  office_id: string
  office_name: string
  department_id: string
  department_name: string
}
const { data: departments } = await useFetch<{
  map: any
  data: DepartmentData[]
}>("http://127.0.0.1:8000/department")

interface HandleData {
  office_id: string
  office_name: string
  department_id: string
  department_name: string
  handle_id: string
  handle_name: string
}
const { data: handles } = await useFetch<{
  map: any
  data: HandleData[]
}>("http://127.0.0.1:8000/handle")

const search = ref("")
const date = ref("20231223")

const switch1 = ref(true)
const selectedOffice = ref("お選びください")
const selectedDepartment = ref("お選びください")
const selectedHandle = ref("お選びください")

const officeNames =
  offices.value !== null
    ? offices.value.map((data: OfficeData) => data.office_name)
    : []

const departmentsNames = ref<string[]>([])
watch(selectedOffice, (newVal: string, oldVal: string) => {
  if (newVal !== oldVal) {
    const departmentsArray: any = Object.values(departments)
    console.log("b", departmentsArray)
    const filteredDepartments: DepartmentData[] = departmentsArray[3].filter(
      (department: DepartmentData) => department.office_name === newVal,
    )
    departmentsNames.value = filteredDepartments.map(
      (department: DepartmentData) => department.department_name,
    )
  }
})

const handlesNames = ref<string[]>([])
watch(selectedDepartment, (newVal: string, oldVal: string) => {
  if (newVal !== oldVal) {
    const handlesArray: any = Object.values(handles)
    const filteredhandles: HandleData[] = handlesArray[3].filter(
      (handle: HandleData) =>
        handle.department_name === newVal &&
        handle.office_name === selectedOffice.value,
    )
    handlesNames.value = filteredhandles.map(
      (handle: HandleData) => handle.handle_name,
    )
  }
})
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
            <v-card-text>{{ offices }} </v-card-text>
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
            <v-card-text> {{ departments }} </v-card-text>
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
              <ImageUpload />
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
            <v-card-text> {{ handles }} </v-card-text>
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
              <client-only>
                <v-text-field
                  v-model="search"
                  clearable
                  prepend-inner-icon="mdi-magnify"
                  label="フリーワード"
                  single-line
                  hide-details
                  density="compact"
                  class="mr-2"
                  rounded="xl"
                  flat
                  variant="solo"
                  style="width: 250px"
                />
              </client-only>
              <div>{{ search }}</div>
            </v-col>
            <v-col max-width="500px">
              <v-switch v-model="switch1" inset label="自分が担当した案件" />
            </v-col>
          </v-row>
          <v-row>
            <v-col> 社員絞り込み </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedOffice"
                  label="営業所名"
                  :items="officeNames"
                  clearable
                />
              </v-skeleton-loader>
              <div>officeNames：{{ officeNames }}</div>
            </v-col>
            <v-col cols="2">
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedDepartment"
                  label="部署名"
                  :items="departmentsNames"
                  clearable
                />
              </v-skeleton-loader>
              <div>departmentsNames：{{ departmentsNames }}</div>
              <div>selectedOffice：{{ selectedOffice }}</div>
            </v-col>
            <v-col cols="2">
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
              <div>handlesNames：{{ handlesNames }}</div>
              <div>selectedDepartment：{{ selectedDepartment }}</div>
            </v-col>
            <v-col cols="2">
              <DatePicker v-model="date" label="日付項目" />
              <div>date : {{ date }}</div>
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
        <DataTable :search="search" />
      </v-col>
    </v-row>
  </v-container>
</template>
