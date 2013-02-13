timer.js is a JavaScript library that implements a constructor for creating
high-resolution (up to µs) timers.

Please note that the `microseconds()` method is only accurate to the µs in Google Chrome
7+ with the launch option, `--enable-benchmarking`.

API
---

<dl>
  <dt><code>new <strong title="Timer">Timer</strong>()</code>
  <dd>Instantiates a new timer.</d>
</dl>

### Instance methods

<dl>
  <dt><code>timer.<strong title="void">start</strong>()</code></dt>
  <dd>Starts the timer.</dd>
  
  <dt><code>timer.<strong title="void">stop</strong>()</code></dt>
  <dd>Stops the timer.</dd>
  
  <dt><code>timer.<strong title="Number">seconds</strong>()</code></dt>
  <dd>
    Returns the amount of time, in seconds, that have passed after starting the timer,
    and up to stopping the timer if it has been stopped.
  </dd>
  
  <dt><code>timer.<strong title="Number">milliseconds</strong>()</code></dt>
  <dd>Same as <code>timer.seconds()</code>, but returns milliseconds.</dd>
  
  <dt><code>timer.<strong title="Number">microseconds</strong>()</code></dt>
  <dd>Same as <code>timer.seconds()</code>, but returns microseconds.</dd>
  
  <dt><code>timer.<strong title="void">profile</strong>(<strong title="Function|String">test</strong>, <strong title="Number">iterations</strong>)</code></dt>
  <dd>Profiles running a function the amount of iterations specified with the timer.</dd>
</dl>

FAQ
---

> Will you add support for web worker threads so I profile multiple tests concurrently?

I don't know how practical running two profiling tests at once is, but if demand is high
enough, I'll make a web worker integration script for this library. The API would mostly
be the same, except that profiled code will have to be strings instead of functions, and
there would be callback parameters for all of the methods.

![Tracking image](https://in.getclicky.com/212712ns.gif)
