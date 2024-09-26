<script lang="ts">
  export let url: string;
  export let verticalUrl: string | null;
</script>

<div
  class="{verticalUrl &&
    'hidden sm:block'} h-full w-full bg-cover bg-center bg-no-repeat shadow-[inset_0_0px_20px_0px_rgba(0,0,0,0.3)]"
  style:background-image="url({url})"
></div>

{#if verticalUrl}
  <div
    class="h-full w-full bg-cover bg-center bg-no-repeat shadow-[inset_0_0px_20px_0px_rgba(0,0,0,0.3)] sm:hidden"
    style:background-image="url({verticalUrl})"
  ></div>
{/if}
