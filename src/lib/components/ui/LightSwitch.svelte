<script lang="ts">
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";

  import { toggleMode } from "mode-watcher";
</script>

<button class="flex" on:click={toggleMode}>
  <div
    class="h-8 w-8 rounded-full dark:bg-yellow-400 bg-blue-400 flex justify-center items-center transition-colors duration-700"
  >
    <div
      class="absolute h-12 w-12 backdrop-blur-sm flex justify-center items-center dark:text-neutral-900 text-neutral-100 transition-colors duration-700"
    >
      <Moon class="dark:hidden h-6 w-6" />
      <Sun class="hidden dark:block h-6 w-6" />
    </div>
  </div>
  <span class="sr-only">Toggle theme</span>
</button>
