<script setup lang="ts">
definePageMeta({
  title: "ToDoアプリ",
  icon: "mdi-animation",
})
const valid = ref(true)
const tasks = useCookie("tasks", {
  default: () => [],
})
const newTask = ref("")
function addTask() {
  if (newTask.value.length >= 1) {
    tasks.value.push(newTask.value)
  }
  newTask.value = ""
}
const validate = () => {
  addTask()
}
function deleteTask(index: number) {
  tasks.value.splice(index, 1)
}
function clearTask() {
  tasks.value = []
}
</script>
<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-row>
        <v-col><h1>ToDoアプリ</h1></v-col>
      </v-row>
      <v-row>
        <v-col><h2>useCookieによるタスク内容の管理</h2></v-col>
      </v-row>
      <v-row class="mt-4 pl-4">
        <v-form
          ref="form"
          v-model="valid"
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
          "
          lazy-validation
        >
          <v-text-field
            v-model="newTask"
            style="width: 500px"
            label="タスクを入力してください"
            name="newTask"
            autocomplete="off"
          />
          <v-btn :disabled="!valid" class="ml-3" @click="validate">
            追加する
          </v-btn>
        </v-form>
      </v-row>
      <v-row class="mt-4 pl-4">
        <ul class="pl-4">
          <li v-for="(task, index) in tasks" :key="task">
            <span>{{ task }}</span>
            <v-btn class="ml-3" @click="deleteTask(index)"> 削除 </v-btn>
          </li>
        </ul>
      </v-row>

      <v-row class="mt-5">
        <v-col>
          <v-btn @click="clearTask"> 全て削除 </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
