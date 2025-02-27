<script lang="ts">
  interface Props {
    anchor: string;
    children?: import('svelte').Snippet;
  }

  let { anchor, children }: Props = $props();
</script>

<li class="flex">
  <a
    class="w-full font-bold transition-colors hover:text-yellow-700"
    href={anchor}>{@render children?.()}</a
  >
</li>
