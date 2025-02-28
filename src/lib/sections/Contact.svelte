<script lang="ts">
  import { useIntersectionObserver } from "$lib/hooks/useIntersectionObserver.svelte";
  import { fly } from "svelte/transition";

  let intersectionObserver = useIntersectionObserver();
</script>

<section
  id="contact"
  class="shadow-vignette-light dark:shadow-vignette-dark top-[300%] flex h-full w-full scroll-mt-12 flex-col items-center justify-center gap-4 p-8 md:flex-row md:justify-evenly"
  bind:this={intersectionObserver.element}
>
  {#if intersectionObserver.intersect}
    <div
      class="bg-background/90 flex w-full max-w-md flex-col items-center gap-4 rounded-md p-4 dark:bg-stone-800/90"
      transition:fly={{ x: -100, duration: 300 }}
    >
      <p class="w-full pb-2 text-center font-bold dark:font-normal">
        Une fanfare pour ton événement ? <br /> Nous mettons à disposition un formulaire,
        qui nous permettra d'établir un devis :
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLScg3jCjgghlUmJaRlSHq_Z0StexW3m815FH3zvk-74GjJfgnA/viewform"
        class=" bg-background border-foreground text-foreground flex w-56 justify-center rounded-md border-2 p-4 font-bold"
        >Accéder au formulaire</a
      >
    </div>

    <a
      href="#social"
      class=" bg-foreground flex w-56 justify-center rounded-md p-4 font-bold text-neutral-100"
      transition:fly={{ x: 100, duration: 300 }}
    >
      Tu veux nous rejoindre ?
    </a>
  {/if}
</section>
