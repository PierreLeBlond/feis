<script lang="ts">
  import { useIntersectionObserver } from "$lib/hooks/useIntersectionObserver.svelte";
  import { fly } from "svelte/transition";

  let prestations = [
    "EVENEMENTS PUBLICS",
    "FESTIVALS",
    "ASSOCIATIFS",
    "CARITATIFS",
    "MARIAGES",
    "CROISIÈRES",
  ];

  let intersectionObserver = useIntersectionObserver();
</script>

<section
  id="prestations"
  class="shadow-vignette-light dark:shadow-vignette-dark top-[200%] flex h-full w-full scroll-mt-12 flex-col items-center justify-center gap-4"
  bind:this={intersectionObserver.element}
>
  {#if intersectionObserver.intersect}
    <ul
      class="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-12"
      transition:fly={{ y: 100, duration: 600 }}
    >
      {#each prestations as prestation}
        <li
          class="bg-background/80 dark:bg-foreground/80 flex w-56 items-center justify-center rounded-md p-4 font-bold"
        >
          {prestation}
        </li>
      {/each}
    </ul>
    <a
      href="#contact"
      class="text-background dark:bg-background bg-foreground dark:text-foreground flex w-56 justify-center rounded-md p-4 font-bold"
      transition:fly={{ y: 100, duration: 400, delay: 400 }}
    >
      Contactez nous !
    </a>
  {/if}
</section>
