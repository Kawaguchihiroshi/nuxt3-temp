export const useAddTaskStore = defineStore("addTask", () => {
  const tasks = ref([])
  const newTask = ref("")

  function increment(tasks: string[], newTask: string) {
    if (newTask.length >= 1) {
      tasks.push(newTask)
    }
    newTask = ""
  }
  return { tasks, increment, newTask }
})
