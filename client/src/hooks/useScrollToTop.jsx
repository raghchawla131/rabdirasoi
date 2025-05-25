export function useScrollToTop() {
  return function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
