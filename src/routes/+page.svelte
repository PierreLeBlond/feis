<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Presentation from "$lib/sections/Presentation.svelte";
  import History from "$lib/sections/History.svelte";
  import Background from "$lib/background/Background.svelte";
  import Buffer from "$lib/sections/Buffer.svelte";
  import Header from "$lib/Header.svelte";
  import Prestations from "$lib/sections/Prestations.svelte";
  import Contact from "$lib/sections/Contact.svelte";
  import Social from "$lib/sections/Social.svelte";
  import { onMount, setContext } from "svelte";

  let intersectionObserver = $state<null | IntersectionObserver>(null);
  let intersectedElement = $state<null | Element>(null);

  onMount(() => {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((entry) => entry.isIntersecting);
        intersectedElement = entry?.target || null;
      },
      {
        threshold: 0.5,
      },
    );
  });

  setContext<{
    observer: null | IntersectionObserver;
    intersectedElement: null | Element;
  }>("intersectionObserver", {
    get observer(): null | IntersectionObserver {
      return intersectionObserver;
    },
    get intersectedElement(): null | Element {
      return intersectedElement;
    },
  });
</script>

<ModeWatcher />

<main
  class="font-display relative h-full w-full overflow-hidden transition-transform duration-300"
>
  <Header></Header>
  <div
    class="parallax relative h-full w-full overflow-x-hidden overflow-y-auto scroll-smooth pt-12"
  >
    <Background></Background>
    <Presentation></Presentation>
    <Buffer>Mais qui sommes nous ?</Buffer>
    <History></History>
    <Buffer>Tout types d'événements ?</Buffer>
    <Prestations></Prestations>
    <Buffer>Faisons connaissances !</Buffer>
    <Contact></Contact>
    <Buffer>Suivez nos aventures !</Buffer>
    <Social></Social>
    <!--Foreground></Foreground-->
  </div>
</main>
