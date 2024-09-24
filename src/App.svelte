<script>
  import "./app.css";
  import { ModeWatcher } from "mode-watcher";
  import Presentation from "$lib/sections/Presentation.svelte";
  import History from "$lib/sections/History.svelte";
  import Background from "$lib/sections/Background.svelte";
  import Buffer from "$lib/sections/Buffer.svelte";
  import Header from "$lib/Header.svelte";
  import Prestations from "$lib/sections/Prestations.svelte";
  import Contact from "$lib/sections/Contact.svelte";
  import Social from "$lib/sections/Social.svelte";
</script>

<ModeWatcher />

<main
  class="relative w-full h-full overflow-hidden transition-transform duration-300 font-display"
>
  <Header></Header>
  <div
    class="relative parallax pt-12 h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth"
  >
    <Background></Background>
    <Presentation></Presentation>
    <Buffer>Mais vous êtes qui ?</Buffer>
    <History></History>
    <Buffer>Quels genres d'événements ?</Buffer>
    <Prestations></Prestations>
    <Buffer></Buffer>
    <Contact></Contact>
    <Buffer></Buffer>
    <Social></Social>
    <!--Foreground></Foreground-->
  </div>
</main>
