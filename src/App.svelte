<script lang="ts">
  import "./app.css";
  import { ModeWatcher } from "mode-watcher";
  import Presentation from "./lib/sections/Presentation.svelte";
  import History from "./lib/sections/History.svelte";
  import Background from "./lib/background/Background.svelte";
  import Buffer from "./lib/sections/Buffer.svelte";
  import Header from "./lib/Header.svelte";
  import Prestations from "./lib/sections/Prestations.svelte";
  import Contact from "./lib/sections/Contact.svelte";
  import Social from "./lib/sections/Social.svelte";
</script>

<ModeWatcher />

<main
  class="relative h-full w-full overflow-hidden font-display transition-transform duration-300"
>
  <Header></Header>
  <div
    class="parallax relative h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth pt-12"
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
