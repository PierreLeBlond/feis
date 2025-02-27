import { getContext } from "svelte";

export const useIntersectionObserver = () => {
  let element = $state<HTMLElement | undefined>();

  let intersectionObserverContext = getContext<{
    observer: null | IntersectionObserver;
    intersectedElement: null | Element;
  }>("intersectionObserver");

  $effect(() => {
    if (!intersectionObserverContext.observer || !element) {
      return;
    }

    const effectElement = element;

    const observer = intersectionObserverContext.observer;
    observer.observe(effectElement);

    return () => observer.unobserve(effectElement);
  });

  let intersect = $derived(
    !intersectionObserverContext.observer ||
      !element ||
      intersectionObserverContext.intersectedElement === element,
  );

  return {
    get intersect() {
      return intersect;
    },
    set element(value: HTMLElement) {
      element = value;
    },
  };
};