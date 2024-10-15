<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { fly } from "svelte/transition";

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
  id="contact"
  class="top-[300%] flex h-full w-full scroll-mt-12 flex-col items-center justify-center gap-4 p-8 md:flex-row md:justify-evenly"
  bind:this={element}
>
  {#if element == $intersectedElement}
    <form
      class="flex w-full max-w-md flex-col gap-4 rounded-md bg-stone-100/90 p-4 dark:bg-stone-800/90"
      transition:fly={{ x: -100, duration: 300 }}
    >
      <p class="w-full pb-2 text-center font-bold">
        Une fanfare <br /> pour ton événement ?
      </p>
      <div class="flex flex-col">
        <label for="name" class="font-bold">nom</label>
        <input id="name" type="text" class="h-12 rounded-md p-2" />
      </div>
      <div class="flex flex-col">
        <label for="motif" class="font-bold">motif</label>
        <textarea id="motif" class="h-32 rounded-md p-2" />
      </div>
      <button
        type="submit"
        class="flex w-56 justify-center self-end rounded-md bg-stone-900 p-4 font-bold text-neutral-100 dark:bg-stone-100 dark:text-neutral-900"
        >Demander un devis</button
      >
    </form>

    <a
      href="#social"
      class="flex w-56 justify-center rounded-md bg-stone-900 p-4 font-bold text-neutral-100 dark:bg-stone-100 dark:text-neutral-900"
      transition:fly={{ x: 100, duration: 300 }}
    >
      Tu veux nous rejoindre ?
    </a>
  {/if}
</section>
