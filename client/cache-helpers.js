import { GET_TASKS } from "./queries.js";

export function addTaskToList(cache, task) {
  const { tasks } = cache.readQuery({ query: GET_TASKS });
  tasks.push(task);

  cache.writeQuery({
    query: GET_TASKS,
    data: { tasks }
  });
}

export function removeTaskFromList(cache, taskId) {
  const { tasks } = cache.readQuery({ query: GET_TASKS });

  const index = tasks.findIndex((task) => {
    return task.id === taskId;
  });

  if (index < 0) {
    return;
  }

  tasks.splice(index, 1);

  cache.writeQuery({
    query: GET_TASKS,
    data: { tasks }
  });
}
