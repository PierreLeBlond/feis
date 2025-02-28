<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div
  class="bg-background text-foreground border-accent dark:bg-foreground dark:text-background relative flex w-full items-center justify-center border-y-2 px-2 text-center text-3xl font-bold"
  style:height="calc(20% + 0.275rem)"
>
  <div class="relative">
    {@render children?.()}
  </div>
</div>
