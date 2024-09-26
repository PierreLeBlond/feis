<script>
  import { Facebook, Instagram, Youtube } from "lucide-svelte";
</script>

<section
  id="social"
  class="top-[400%] flex h-full w-full scroll-mt-12 items-center justify-center p-8"
>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
    <div
      class="flex w-full max-w-md flex-col gap-4 rounded-md bg-stone-100/90 p-4 dark:bg-stone-800/90"
    >
      <p class="w-full pb-2 text-center font-bold">
        Tu veux suivre nos aventures et savoir où et quand nous voir jouer ?
      </p>
      <ul class="flex items-center justify-center gap-8">
        <li>
          <a href="https://www.instagram.com/fanfarefeis/">
            <Instagram></Instagram>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@FanfareFEIS">
            <Youtube></Youtube>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/Fanfare.FEIS">
            <Facebook></Facebook>
          </a>
        </li>
      </ul>
      <div class="flex"></div>
    </div>
    <div
      class="flex w-full max-w-md flex-col gap-4 rounded-md bg-stone-100/90 p-4 dark:bg-stone-800/90"
    >
      <p class="w-full pb-2 text-center font-bold">
        Tu joue du sax, du cuivre, de la flute, de la clarinette ou des
        percussions, ou bien tu souhaiterais apprendre ? Contacte nous pour sur
        les réseaux sociaux pour nous rejoindre !
      </p>
      <div class="flex"></div>
    </div>
  </div>
</section>
