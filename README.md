# [Network Information API] polyfill

🔌 [`navigator.connection`] polyfill for anywhere

<p align="center">
  <img src="https://i.imgur.com/cmucJDA.png" />
</p>

📜 Implements the [Network Information API] \
🗺️ Provides [`navigator.connection`] APIs \
🚀 Easy to use with a drop-in import polyfill \
🦄 Also has a [ponyfill] import too \
💻 Works in Node.js \
🌐 Works in the browser \
🦕 Works in Deno \
🧅 Works in Bun

👀 Looking for `navigator.connection.saveData`? Check out the related [Save Data
API polyfill at @webfill/savedata].

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

You can install this polyfill using your favorite npm package manager like npm,
[pnpm], or [Yarn]:

```sh
npm install @webfill/netinfo
```

If you're using Deno you can use an `npm:` specifier and it should Just Work™:

```ts
import "npm:@webfill/netinfo";
```

If you want to go buildless in the browser you can use an npm CDN like [esm.sh]
or [esm.run]:

```html
<script type="module">
  import "https://esm.run/@webfill/netinfo";
  import "https://esm.sh/@webfill/netinfo";
</script>
```

⚠️ This polyfill requires an existing `Navigator`/`navigator` class/object to
mutate and add the Network Information APIs to. If you're using Deno, Bun, or
the browser, this is already provided for you. If you're using Node.js, you'll
need to import an [HTML System state and capabilities] polyfill like
[@webfill/html-system-state] to provide the global `Navigator`/`navigator`.

<sup>🚀 If you're interested in seeing the `navigator` object included in
Node.js core, upvote & participate in the discussion in
[nodejs/node#39540].</sup> \
**[🌟 Node.js v21 looks like it will have a global `navigator` object!](https://github.com/nodejs/node/pull/49870)**

## Usage

![Browser](https://img.shields.io/static/v1?style=for-the-badge&message=Browser&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

⚠️ The values returned by this polyfill are **best effort**. It's always best to
fail or degrade gracefully rather than check and assume.

This polyfill is a drop-in import that will add the Network Information APIs to
the global scope's `navigator` object. Then you can use `navigator.connection`
just like you would in a conforming browser environment:

```js
import "@webfill/netinfo";

console.log(navigator.connection);
//=> {
//   downlink: 10,
//   downlinkMax: Infinity,
//   effectiveType: "4g",
//   rtt: 100,
//   type: "wifi",
// }

if (navigator.connection.rtt > 200) {
  alertBox.innerText = "You may experience some delay in game responsiveness.";
}
```

If you prefer to utilize the implementation directly **without** mutating the
global scope, you can use the `@webfill/netinfo/ponyfill` import instead:

```js
// This still delegates to the browser-native features if available.
import { NavigatorNetworkInformation } from "@webfill/netinfo/ponyfill";

const navigatorConnection = Reflect.get(
  NavigatorNetworkInformation.prototype,
  "connection",
  globalThis.navigator ?? {}
);

console.log(navigatorConnection);
//=> {
//   downlink: 10,
//   downlinkMax: Infinity,
//   effectiveType: "4g",
//   rtt: 100,
//   type: "wifi",
// }

if (navigatorConnection.rtt > 200) {
  alertBox.innerText = "You may experience some delay in game responsiveness.";
}
```

## How it works

This polyfill uses periodic `fetch()` polling with `performance.now()` to guage
the speed (or lack thereof) of your network connection. There's also a fallback
to use a synchronous version if you do `navigator.connection.rtt` or something
before the first polling interval has completed.

## Development

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![Vite](https://img.shields.io/static/v1?style=for-the-badge&message=Vite&color=646CFF&logo=Vite&logoColor=FFFFFF&label=)

This project is written in TypeScript. You can run the tests in the browser
using `npm run test:browser` or in Node.js using `npm test`.

The most interesting bits are `getFetchStats()`, `guessNetInfo()`, and
`src/lib/NetworkInformation.ts`. That's where most of the magic happens.

**Why not [Vitest]?**

Vitest doesn't play well with `Worker` threads and `Atomics.wait()`. If you use
[@vitest/web-worker], it's the _same thread_ and so it deadlocks. You can't use
`new Worker()` either since you need a raw JavaScript file (not `.ts`). Thus,
the easiest thing to do to test things is to just build it and test against the
output JavaScript files instead of the TypeScript source code.

If you can figure out a way around this problem, I'd be very grateful! ❤️

<!-- prettier-ignore-start -->
[Network Information API]: https://wicg.github.io/netinfo/
[`navigator.connection`]: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
[HTML System state and capabilities]: https://html.spec.whatwg.org/multipage/system-state.html
[@webfill/html-system-state]: https://github.com/webfill/html-system-state
[Save Data API polyfill at @webfill/savedata]: https://github.com/webfill/savedata
[nodejs/node#39540]: https://github.com/nodejs/node/issues/39540
[Vitest]: https://vitest.dev/
[@vitest/web-worker]: https://github.com/vitest-dev/vitest/tree/main/packages/web-worker#readme
[esm.sh]: https://esm.sh/
[esm.run]: https://esm.run/
[ponyfill]: https://ponyfill.com/
<!-- prettier-ignore-end -->
