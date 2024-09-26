<script>
  import Image from "./Image.svelte";
  import meli from "/backgrounds/meli.jpg";
  import julien from "/backgrounds/julien.jpg";
  import lucieNoLogo from "/backgrounds/lucie-no-logo.jpg";
  import lucieNoLogoVertical from "/backgrounds/lucie-no-logo-vertical.jpg";
  import pause from "/backgrounds/pause.jpg";
  import back from "/backgrounds/back.jpg";
  import coverVertical from "/backgrounds/cover-vertical.jpg";
  import cover from "/backgrounds/cover.jpg";
  import trompette from "/backgrounds/trompettes.jpg";
  import lucie from "/backgrounds/lucie.jpg";
  import lucieVertical from "/backgrounds/lucie-vertical.jpg";
  import euro from "/backgrounds/euro.jpg";
  import end from "/backgrounds/end.jpg";
</script>

<div class="layer back -z-10 w-full" style:height="calc(100vh - 2.75rem)">
  <div class="h-full w-full dark:hidden">
    <Image url={meli}></Image>
    <Image url={julien}></Image>
    <Image url={lucieNoLogo} verticalUrl={lucieNoLogoVertical}></Image>
    <Image url={pause}></Image>
    <Image url={back}></Image>
  </div>
  <div class="hidden h-full w-full dark:block">
    <Image url={cover} verticalUrl={coverVertical}></Image>
    <Image url={trompette}></Image>
    <Image url={lucie} verticalUrl={lucieVertical}></Image>
    <Image url={euro}></Image>
    <Image url={end}></Image>
  </div>
</div>
