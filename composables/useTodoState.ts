export const useTodoState = () => {
  const tasks = useState<string[]>("todo", () => [])
  return {
    tasks,
  }
}
