<script>
  import Image from "./Image.svelte";
  import homeLight from "$assets/backgrounds/home-light.jpg?enhanced";
  import historyLight from "$assets/backgrounds/history-light.jpg?enhanced";
  import prestationsLight from "$assets/backgrounds/prestations-light.jpg?enhanced";
  import prestationsLightVertical from "$assets/backgrounds/prestations-light-vertical.jpg?enhanced";
  import contactLight from "$assets/backgrounds/contact-light.jpg?enhanced";
  import socialLight from "$assets/backgrounds/social-light.jpg?enhanced";
  import homeDarkVertical from "$assets/backgrounds/home-dark-vertical.jpg?enhanced";
  import homeDark from "$assets/backgrounds/home-dark.jpg?enhanced";
  import historyDark from "$assets/backgrounds/history-dark.jpg?enhanced";
  import prestationsDark from "$assets/backgrounds/prestations-dark.jpg?enhanced";
  import prestationsDarkVertical from "$assets/backgrounds/prestations-dark-vertical.jpg?enhanced";
  import contactDark from "$assets/backgrounds/contact-dark.jpg?enhanced";
  import socialDark from "$assets/backgrounds/social-dark.jpg?enhanced";

  const backgrounds = {
    light: [
      {
        horizontal: homeLight,
      },
      {
        horizontal: historyLight,
      },
      {
        horizontal: prestationsLight,
        vertical: prestationsLightVertical,
      },
      {
        horizontal: contactLight,
      },
      {
        horizontal: socialLight,
      },
    ],
    dark: [
      {
        horizontal: homeDark,
        vertical: homeDarkVertical,
      },
      {
        horizontal: historyDark,
      },
      {
        horizontal: prestationsDark,
        vertical: prestationsDarkVertical,
      },
      {
        horizontal: contactDark,
      },
      {
        horizontal: socialDark,
      },
    ],
  };
</script>

<div class="layer back -z-10 w-full" style:height="calc(100vh - 2.75rem)">
  <div class="h-full w-full dark:hidden">
    {#each backgrounds.light as { horizontal, vertical }}
      <Image path={horizontal} verticalPath={vertical}></Image>
    {/each}
  </div>
  <div class="hidden h-full w-full dark:block">
    {#each backgrounds.dark as { horizontal, vertical }}
      <Image path={horizontal} verticalPath={vertical}></Image>
    {/each}
  </div>
</div>
