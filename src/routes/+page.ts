import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
  const locale = url.searchParams.get("locale");
  //TODO: Thid should be using cookies instead.
  return { locale };
};
