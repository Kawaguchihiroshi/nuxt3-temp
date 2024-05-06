export const useAddTaskStore = defineStore(
  "addTask",
  () => {
    const tasks = ref([])
    const newTask = ref("")

    function addTask(tasks: string[], newTask: string) {
      if (newTask.length >= 1) {
        tasks.push(newTask)
      }
      newTask = ""
    }
    function deleteTask(index: number) {
      tasks.value.splice(index, 1)
    }
    function clearTask() {
      tasks.value = []
    }

    return { tasks, addTask, deleteTask, clearTask, newTask }
  },
  {
    persist: true,
  },
)
