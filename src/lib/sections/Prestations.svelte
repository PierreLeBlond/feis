<script lang="ts">
  let prestations = [
    "FESTIVALS",
    "EVENEMENTS PUBLICS",
    "KERMESS",
    "MARIAGES",
    "CARITATIFS",
    "CROISIÈRES",
  ];
</script>

<section
  id="prestations"
  class="top-[200%] flex h-full w-full scroll-mt-12 flex-col items-center justify-center gap-4"
>
  <ul
    class="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-12"
  >
    {#each prestations as prestation}
      <li
        class="flex w-56 items-center justify-center rounded-md bg-stone-100/80 p-4 font-bold dark:bg-stone-900/80"
      >
        {prestation}
      </li>
    {/each}
  </ul>
  <a
    href="#contact"
    class="flex w-56 justify-center rounded-md bg-stone-900 p-4 font-bold text-stone-100 dark:bg-stone-100 dark:text-stone-900"
  >
    Contactez nous !
  </a>
</section>
