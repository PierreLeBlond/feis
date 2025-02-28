<script lang="ts">
  import { useIntersectionObserver } from "$lib/hooks/useIntersectionObserver.svelte";
  import { fade } from "svelte/transition";

  let intersectionObserver = useIntersectionObserver();
</script>

<section
  id="history"
  class="fill-foreground dark:fill-accent top-full flex h-full w-full scroll-mt-12 items-center justify-center"
  bind:this={intersectionObserver.element}
>
  {#if intersectionObserver.intersect}
    <div
      class="font-display bg-background/80 dark:bg-foreground/90 dark:to-foreground flex w-full items-center justify-center p-8 font-thin md:w-auto md:rounded-md dark:from-stone-800"
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
