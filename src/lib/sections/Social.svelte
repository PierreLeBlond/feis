<script>
  import { Facebook, Instagram, Youtube } from "lucide-svelte";
</script>

<section
  id="social"
  class="top-[400%] h-full w-full scroll-mt-12 p-8 flex justify-center items-center"
>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <div
      class="bg-stone-100/90 dark:bg-stone-800/90 rounded-md w-full flex flex-col p-4 gap-4 max-w-md"
    >
      <p class="w-full text-center font-bold pb-2">
        Tu veux suivre nos aventures et savoir où et quand nous voir jouer ?
      </p>
      <ul class="flex justify-center items-center gap-8">
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
      class="bg-stone-100/90 dark:bg-stone-800/90 rounded-md w-full flex flex-col p-4 gap-4 max-w-md"
    >
      <p class="w-full text-center font-bold pb-2">
        Tu joue d'un du sax, du cuivre, de la flute ou des percussions, ou bien
        tu souhaiterais apprendre ? Contacte nous pour sur les réseaux sociaux
        pour nous rejoindre !
      </p>
      <div class="flex"></div>
    </div>
  </div>
</section>
