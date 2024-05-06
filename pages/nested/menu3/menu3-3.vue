<script setup lang="ts">
definePageMeta({
  title: "ToDoアプリ3",
  icon: "mdi-animation",
})
const valid = ref(true)
const tasks = useAddTaskStore()
const addTask = () => {
  if (tasks.newTask.trim() !== "") {
    tasks.addTask(tasks.tasks, tasks.newTask)
    tasks.newTask = "" // 新しいタスクを追加した後、newTaskをクリアする
  }
}
</script>
<template>
  <v-container fluid>
    <v-card class="pa-6">
      <v-row>
        <v-col><h1>ToDoアプリ</h1></v-col>
      </v-row>
      <v-row>
        <v-col><h2>piniaによるタスク内容の管理</h2></v-col>
      </v-row>
      <v-row class="mt-4 pl-4">
        <v-form
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
          "
        >
          <v-text-field
            v-model="tasks.newTask"
            style="width: 500px"
            label="タスクを入力してください"
            autocomplete="off"
          />
          <v-btn :disabled="!valid" class="ml-3" @click="addTask">
            追加する
          </v-btn>
        </v-form>
      </v-row>
      <v-row class="mt-4 pl-4">
        <ul class="pl-4">
          <li v-for="(task, index) in tasks.tasks" :key="task">
            <span>{{ task }}</span>
            <v-btn class="ml-3" @click="tasks.deleteTask"> 削除 </v-btn>
          </li>
        </ul>
      </v-row>

      <v-row class="mt-5">
        <v-col>
          <v-btn @click="tasks.clearTask"> 全て削除 </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col> {{ tasks.tasks }} / {{ tasks.newTask }} </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
