<script setup lang="ts">
definePageMeta({
  title: "ユーザー新規登録",
  icon: "mdi-animation",
})

// interface NewUserData {
//   name: string
//   email: string
//   select: number
//   checkagree: boolean
// }
// const { data: newUsers } = await useFetch<{ data: NewUserData[] }>(
//   'http://127.0.0.1:8000/department',
// )

const handleSubmit = async () => {
  const postData = {
    name: "Value 1",
    mail: "Value 2",
    description: "Value 3",
  }
  await fetchData("POST", "http://127.0.0.1:8000/newusers", postData)
}

const loading = ref(false)
const error = ref(null)
const data = ref(null)
const fetchData = async (method: string, url: string, body: any) => {
  loading.value = true
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const responseData = await response.json()
    data.value = responseData
  } catch (err: unknown | any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const name = ref("")
const email = ref("")
const select = ref(null)
const checkagree = ref(false)
const items = ["管理者", "編集者", "確認者"]
const itemsValue = ["001", "002", "003"]
const valid = ref(true)

const nameRules = [
  (v: string) => !!v || "氏名は必須項目です",
  (v: string) => (v && v.length <= 10) || "氏名は10文字以内で記入してください",
]

const emailRules = [
  (v: string) => !!v || "メールアドレスは必須項目です",
  (v: string) =>
    /.+@.+\..+/.test(v) || "メールアドレスの書式で入力してください",
]

const form = ref(null)
</script>
<template>
  <v-container fluid>
    <v-card>
      <v-row class="pa-4">
        <v-col> 新規登録画面 </v-col>
        <v-col>
          <p v-if="loading">Loading...</p>
          <p v-if="error">{{ error }}</p>
          <p v-if="data">Response: {{ data }}</p></v-col
        >
      </v-row>
      <v-row class="mx-4 mb-5">
        <v-form ref="form" style="width: 500px" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="氏名"
            required
          />
          <v-text-field
            v-model="email"
            class="mt-6"
            :rules="emailRules"
            label="メールアドレス"
            required
          />
          <v-select
            v-model="select"
            class="mt-6"
            :items="items"
            :item-title="items"
            :item-value="itemsValue"
            :rules="[(v) => !!v || '権限は必須項目です']"
            label="権限"
            required
          />
          <v-checkbox
            v-model="checkagree"
            :rules="[(v) => !!v || '登録を行うには同意する必要があります。']"
            label="登録に同意しますか？"
            required
          />
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="handleSubmit"
          >
            登録する
          </v-btn>
        </v-form>
      </v-row>
    </v-card>
  </v-container>
</template>
