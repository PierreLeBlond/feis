<script lang="ts">
  import { Sun } from "lucide-svelte";
  import { Moon } from "lucide-svelte";

  import { toggleMode } from "mode-watcher";
</script>

<button class="flex" on:click={toggleMode}>
  <div
    class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 transition-colors duration-700 dark:bg-yellow-400"
  >
    <div
      class="absolute flex h-12 w-12 items-center justify-center text-neutral-100 backdrop-blur-sm transition-colors duration-700 dark:text-neutral-900"
    >
      <Moon class="h-6 w-6 dark:hidden" />
      <Sun class="hidden h-6 w-6 dark:block" />
    </div>
  </div>
  <span class="sr-only">Toggle theme</span>
</button>
