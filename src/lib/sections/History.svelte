<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { fade } from "svelte/transition";

  let element: HTMLElement;

  let { observer, intersectedElement } = getContext<{
    observer: IntersectionObserver;
    intersectedElement: Writable<null | Element>;
  }>("intersectionObserver");

  onMount(() => {
    observer.observe(element);
  });

  onDestroy(() => {
    observer.unobserve(element);
  });
</script>

<section
  id="history"
  class="top-full flex h-full w-full scroll-mt-12 items-center justify-center fill-stone-900 dark:fill-yellow-400"
  bind:this={element}
>
  {#if element == $intersectedElement}
    <div
      class="flex w-full items-center justify-center bg-stone-100/80 p-8 font-display font-thin dark:bg-stone-900/90 dark:from-stone-800 dark:to-stone-900 md:w-auto md:rounded-md"
      transition:fade={{ duration: 600 }}
    >
      C'est chez les étudiants en médecine de Strasbourg que la Feis joue ses
      premières notes.<br />
      Depuis 20 ans déjà, elle anime les rues de Strasbourg et d'ailleurs.<br />
      Son répertoire est disco, electro et dansant.<br />
      La fanfare propose ses prestations pour tout type d'événements !
    </div>
  {/if}
</section>
