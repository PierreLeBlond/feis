<script lang="ts">
  export let anchor: string;
</script>

<li class="flex">
  <a
    class="w-full font-bold transition-colors hover:text-yellow-700"
    href={anchor}><slot></slot></a
  >
</li>
