<script>
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
  class="top-[200%] w-full h-full scroll-mt-12 flex flex-col gap-4 justify-center items-center"
>
  <ul
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12 p-8"
  >
    {#each prestations as prestation}
      <li
        class="w-56 p-4 bg-stone-100/80 dark:bg-stone-900/80 flex items-center justify-center rounded-md font-bold"
      >
        {prestation}
      </li>
    {/each}
  </ul>
  <a
    href="#contact"
    class="w-56 p-4 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-md font-bold flex justify-center"
  >
    Contactez nous !
  </a>
</section>
