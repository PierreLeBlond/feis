<script lang="ts">
  import { onMount } from "svelte";

  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

{#if ready}
  <section
    id="history"
    class="top-full flex h-full w-full scroll-mt-12 flex-col items-center justify-between fill-stone-900 dark:fill-yellow-400"
  >
    <div
      class="flex h-48 w-full items-center justify-center bg-gradient-to-b from-stone-200 to-stone-100 p-8 font-display font-thin dark:from-stone-800 dark:to-stone-900"
    >
      C'est chez les étudiants en médecine de Strasbourg que la Feis joue ses
      premières notes.<br />
      Depuis 20 ans déjà, elle anime les rues de Strasbourg et d'ailleurs.
    </div>
    <div
      class="flex h-48 w-full items-center justify-center bg-gradient-to-b from-stone-200 to-stone-100 p-8 font-display font-thin dark:from-stone-800 dark:to-stone-900"
    >
      Son répertoire est disco, electro et dansant.<br />
      La fanfare propose ses prestations pour tout type d'événements !
    </div>
  </section>
{/if}
