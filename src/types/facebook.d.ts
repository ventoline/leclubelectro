export {};

declare global {
  interface Window {
    FB?: {
      init: (opts: { xfbml?: boolean; version?: string }) => void;
      XFBML: { parse: () => void };
    };
    fbAsyncInit?: () => void;
  }
}
