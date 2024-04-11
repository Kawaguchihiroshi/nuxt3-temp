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
const { data: departments } = await useFetch<{ data: DepartmentData[] }>(
  "http://127.0.0.1:8000/department",
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
  "http://127.0.0.1:8000/handle",
)
const switch1 = ref(true)
const selectedOffice = ref("お選びください")
// const selectedDepartment = ref("お選びください")
// const selectedHandle = ref("お選びください")

// const officeNames =
//   offices.value?.map((office: OfficeData) => office.office_name) ?? []

const officeNames =
  offices.value !== null
    ? offices.value.map((data: OfficeData) => data.office_name)
    : []

// const departmentsNames = ref<string[]>([])
// watch(selectedOffice, (newVal: string, oldVal: string) => {
//   if (oldVal) {
//     const departmentsArray: any = Object.values(departments)
//     console.log(departmentsArray)
//     const filteredDepartments: DepartmentData[] = departmentsArray.filter(
//       (department: DepartmentData) => department.office_name === newVal,
//     )
//     departmentsNames.value = filteredDepartments.map(
//       (department: DepartmentData) => department.department_name,
//     )
//   }
// })

// const handlesNames = ref<string[]>([])
// watch(selectedDepartment, (newVal: string, oldVal: string) => {
//   if (oldVal) {
//     const handlesArray: any = Object.values(handles.value)
//     const filteredhandles: HandleData[] = handlesArray.filter(
//       (handle: HandleData) => handle.office_name === newVal,
//     )
//     handlesNames.value = filteredhandles.map(
//       (handle: HandleData) => handle.handle_name,
//     )
//   }
// })
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
              <v-text-field clearable label="フリーワード" />
            </v-col>
            <v-col max-width="500px">
              <v-switch v-model="switch1" inset label="自分が担当した案件" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <div>officeNames：{{ officeNames }}</div>
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedOffice"
                  label="営業所名"
                  :items="officeNames"
                  clearable
                />
              </v-skeleton-loader>
            </v-col>
            <!-- <v-col max-width="500px">
              <div>departmentsNames：{{ departmentsNames }}</div>
              <v-skeleton-loader type="text">
                <v-select
                  v-model="selectedDepartment"
                  label="部署名"
                  :item="departmentsNames"
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
                  :item="handlesNames"
                  item-text="handle_name"
                  item-value="handle_id"
                  clearable
                />
              </v-skeleton-loader>
            </v-col> -->
            <v-col cols="2">
              <DatePicker />
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
        <DataTable />
      </v-col>
    </v-row>
  </v-container>
</template>
