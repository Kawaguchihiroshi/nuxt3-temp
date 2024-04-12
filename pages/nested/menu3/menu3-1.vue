<script setup lang="ts">
definePageMeta({
  title: "ログイン",
  icon: "mdi-animation",
})

const handleSubmit = async () => {
  const postData = {
    loginid: loginid.value,
    password: password.value,
  }
  state.value.loginid = loginid.value
  state.value.password = password.value

  localStorage.setItem(
    "my-store",
    '{"loginid": ' + loginid.value + ', "password": ' + password.value + "}",
  )
  await fetchData("POST", "http://127.0.0.1:8000/newuser", postData)
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

const loginid = ref("")
const password = ref("")
const valid = ref(true)
const state = ref({
  loginid: "",
  password: "",
})

import { formatDate, useRefHistory } from "@vueuse/core"

function format(ts: number) {
  return formatDate(new Date(ts), "YYYY-MM-DD HH:mm:ss")
}

const { history, undo, redo, canUndo, canRedo } = useRefHistory(state, {
  deep: true,
})

const stateData = ref<string>("")

onMounted(() => {
  stateData.value = localStorage.getItem("my-store") || "データがありません"
})

// delete data from storage
// state.value = null

const loginidRules = [
  (v: string) => !!v || "氏名は必須項目です",
  (v: string) => (v && v.length <= 10) || "氏名は10文字以内で記入してください",
]
const passwordRules = [
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
        <v-col> ログイン画面 </v-col>
        <v-col>
          <p v-if="loading">Loading...</p>
          <p v-if="error">{{ error }}</p>
          <p v-if="data">Response: {{ data }}</p></v-col
        >
      </v-row>
      <v-row class="mx-4 mb-5">
        <v-form ref="form" style="width: 500px" lazy-validation>
          <v-text-field
            v-model="loginid"
            :counter="10"
            :rules="loginidRules"
            label="ログインID"
            required
          />
          <v-text-field
            v-model="password"
            class="mt-6"
            :rules="passwordRules"
            label="パスワード"
            required
          />
          <v-btn
            :disabled="!valid"
            color="success"
            class="mt-6 mr-4"
            @click="handleSubmit"
          >
            ログインする
          </v-btn>
        </v-form>
      </v-row>
      <v-row>
        <v-col>
          <v-btn :disabled="!canUndo" @click="undo()">Undo</v-btn>
          <v-btn :disabled="!canRedo" @click="redo()">Redo</v-btn>
          <note>History (limited to 10 records for demo)</note>
          {{ history }}
          <div class="code-block mt-4">
            <div v-for="i in history" :key="i.timestamp">
              <span class="opacity-50 mr-2 font-mono">{{
                format(i.timestamp)
              }}</span>
              <span class="font-mono">{ value: {{ i.snapshot }} }</span>
            </div>
            {{ stateData }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  width: 350px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
