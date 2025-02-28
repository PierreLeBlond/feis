<script lang="ts">
  interface Props {
    anchor: string;
    children?: import("svelte").Snippet;
  }

  let { anchor, children }: Props = $props();
</script>

<li class="flex">
  <a class="hover:text-accent w-full font-bold transition-colors" href={anchor}
    >{@render children?.()}</a
  >
</li>
