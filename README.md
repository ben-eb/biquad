# biquad [![NPM version](https://badge.fury.io/js/biquad.svg)](http://badge.fury.io/js/biquad) [![Dependency Status](https://gemnasium.com/ben-eb/biquad.svg)](https://gemnasium.com/ben-eb/biquad)

> Tiny utility for creating biquad filter nodes.

Install via [npm](https://npmjs.org/package/biquad):

```
npm install biquad --save
```

This is designed to be used in a Web Audio API capable browser with
[https://github.com/substack/node-browserify](browserify). See the excellent
[https://github.com/substack/browserify-handbook](browserify handbook) for
information on how all of that works.

## Example

In its simplest form, if you just need one biquad filter, you can use it
like so:

```js
var context = new AudioContext();
var biquad  = require('biquad');

// Create the biquadFilterNode
var lowpass = biquad.lowpass(context, { frequency: 20000 });
// And then connect it to your audio routing graph
lowpass.connect(context.destination);
```

If you find yourself creating more than one filter, you can set the
`AudioContext` when you `require` biquad:

```js
var context = new AudioContext();
var biquad  = require('biquad')(context);

// Now we can create multiple filters referring to our context variable
var lowpass  = biquad.lowpass({ frequency: 20000 });
var highpass = biquad.highpass({ frequency: 20000 });
```

## API

### biquad[filterType]([context], options)

Each `filterType` is aliased here for convenience. For a full list see
[MDN's developer documentation][docs]. `options` is an object where you can set
the `Q`, `frequency` and `gain` parameters. If we take the example from the
documentation, these are equivalent:

```js
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var biquadFilter = audioCtx.createBiquadFilter();

biquadFilter.type = "lowshelf";
biquadFilter.frequency.value = 1000;
biquadFilter.gain.value = 25;
```

In biquad:

```js
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var biquad = require('biquad')(audioCtx);

var biquadFilter = biquad.lowshelf({
    frequency: 1000,
    gain: 25
});
```

## License

MIT © Ben Briggs

[docs]: https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode.type