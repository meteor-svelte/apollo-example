<div class="task">
  <input
    type="checkbox"
    checked={done}
    on:change={onToggle}>

  <div class="description">
    {description}
  </div>

  <button on:click={onRemove}>
    Remove
  </button>
</div>

<style>
  .task {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid black;
    background: gainsboro;
  }

  .description {
    flex-grow: 1;
    margin: 0 10px;
  }
</style>

<script>
  import { createEventDispatcher } from "svelte";

  export let done = false;
  export let description = "";

  const dispatch = createEventDispatcher();

  function onRemove() {
    dispatch("remove");
  }

  function onToggle() {
    dispatch("toggle");
  }
</script>
