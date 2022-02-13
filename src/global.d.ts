/// <reference types="@sveltejs/kit" />

interface CountData {
  path?: string | ((path: string) => string);
  title?: string | ((title: string) => string);
  referrer?: string | ((referrer: string) => string);
  event?: boolean;
}

declare namespace goatcounter {
  function count(data?: CountData);
}
