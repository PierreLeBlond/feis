<script>
  import { onMount } from "svelte";

  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

{#if ready}
  <section
    id="history"
    class="top-full w-full h-full scroll-mt-12 flex flex-col justify-between items-center dark:fill-yellow-400 fill-stone-900"
  >
    <div
      class="w-full h-48 bg-gradient-to-b from-stone-200 dark:from-stone-800 to-stone-100 dark:to-stone-900 flex justify-center items-center p-8 font-display font-thin"
    >
      C'est chez les étudiants en médecine de Strasbourg que la Feis joue ses
      premières notes.<br />
      Depuis 20 ans déjà, elle anime les rues de Strasbourg et d'ailleurs.
    </div>
    <div
      class="w-full h-48 bg-gradient-to-b from-stone-200 dark:from-stone-800 to-stone-100 dark:to-stone-900 flex justify-center items-center p-8 font-display font-thin"
    >
      Son répertoire est disco, electro et dansant.<br />
      La fanfare propose ses prestations pour tout type d'événements !
    </div>
  </section>
{/if}
