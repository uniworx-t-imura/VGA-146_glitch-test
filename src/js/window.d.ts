declare module 'jQuery';

interface Window {
  Swiper(options: any): any;

  // SmoothScroll(options:String): any;
}

interface JQuery {
  drawer(options?: Record<string, any> | string): JQuery;
}

declare const window: Window;
declare const $: JQuery;
// declare var Stickyfill: any;
// declare var InfiniteScroll: any;
