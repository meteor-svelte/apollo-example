<div class="app">
  <ul class="tasks">
    {#each tasks as task (task.id)}
      <li>
        <Task
          {...task}
          on:remove="removeTask(task.id)"
          on:toggle="toggleTask(task.id)" />
      </li>
    {:else}
      The task list is empty!
    {/each}
  </ul>

  <form on:submit="addTask(event)">
    <input bind:value="description" />
    <button>Add Task</button>
  </form>
</div>

<style>
  .app {
    width: 500px;
  }

  ul.tasks {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul.tasks > li {
    margin-top: 10px;
  }

  ul.tasks > li:first-child {
    margin-top: 0;
  }

  form {
    display: flex;
    padding: 10px;
    border: 1px solid black;
    margin-top: 20px;
    background: burlywood;
  }

  form > input {
    flex-grow: 1;
  }

  form > button {
    margin-left: 10px;
  }
</style>

<script>
  import apollo from "./apollo.js";

  import {
    GET_TASKS,
    ADD_TASK,
    REMOVE_TASK,
    TOGGLE_TASK
  } from "./queries.js";

  import {
    addTaskToList,
    removeTaskFromList
  } from "./cache-helpers.js";

  export default {
    oncreate() {
      const observable = apollo.watchQuery({
        query: GET_TASKS
      });

      this.subscription = observable.subscribe({
        next: ({ data }) => {
          this.set({ tasks: data.tasks });
        }
      });
    },

    ondestroy() {
      this.subscription.unsubscribe();
    },

    methods: {
      addTask(event) {
        event.preventDefault();
        const description = this.get().description.trim();

        if (description.length < 1) {
          return;
        }

        apollo.mutate({
          mutation: ADD_TASK,
          variables: { description },

          update(cache, { data: { addTask } }) {
            addTaskToList(cache, addTask);
          }
        });

        this.set({ description: "" });
      },

      removeTask(id) {
        apollo.mutate({
          mutation: REMOVE_TASK,
          variables: { id },

          update(cache, { data: { removeTask } }) {
            if (removeTask) {
              removeTaskFromList(cache, id);
            }
          }
        });
      },

      toggleTask(id) {
        apollo.mutate({
          mutation: TOGGLE_TASK,
          variables: { id }
        });
      }
    },

    data() {
      return {
        tasks: [],
        description: ""
      };
    },

    components: {
      Task: "./Task.svelte"
    }
  };
</script>
