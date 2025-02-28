<script lang="ts">
  interface Props {
    path: string;
    verticalPath?: string | null;
  }

  let { path, verticalPath = null }: Props = $props();
</script>

<enhanced:img
  class="{verticalPath && 'hidden sm:block'} h-full w-full object-cover"
  src={path}
/>

{#if verticalPath}
  <enhanced:img
    class="h-full w-full object-cover sm:hidden"
    src={verticalPath}
  />
{/if}
