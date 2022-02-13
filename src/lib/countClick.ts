export default function countClick(
  node: HTMLAnchorElement
): SvelteActionReturnType {
  if (node.tagName !== "A") return;

  const count = () => recordEvent("click", node.href);
  node.addEventListener("click", count);
  node.addEventListener("auxclick", count);

  return {
    destroy() {
      node.removeEventListener("click", count);
      node.removeEventListener("auxclick", count);
    },
  };
}

export function recordEvent(...params: string[]): void {
  window.goatcounter.count({
    event: true,
    path: `${location.host}/${params.join("/")}`,
  });
}
