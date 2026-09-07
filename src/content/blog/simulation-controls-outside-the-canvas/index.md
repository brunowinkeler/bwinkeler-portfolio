---
title: "Moving simulation controls out of the canvas"
date: 2026-09-07
description: "Why the browser build of a C++ physics lab renders its parameters as HTML, and what the bridge between the page and the WebAssembly module had to guarantee."
tags:
    - WebAssembly
    - C++
    - Emscripten
    - Accessibility
draft: false
cover: "./cover.svg"
coverAlt: "A simulation canvas beside an HTML control panel, connected by a bridge labelled extern C"
---

The desktop applications of my physics lab draw every parameter, readout, and analysis plot with Dear ImGui, inside the same window as the simulation. The first browser build reused those panels as they were, so the WebGL canvas carried the entire interface.

It worked. It was also wrong in four ways at once:

- the panels competed with the scene for space on exactly the screens that have the least of it;
- nothing inside a canvas is reachable by a screen reader, or by the Tab key;
- the widgets ignored the site typography, spacing, and theme;
- every frame paid for the Dear ImGui draw pipeline, and every visitor downloaded it.

The native repository still needs those panels, and the browser adapters are not allowed to leak web concerns back into it. So the fix had to happen entirely on the adapter side.

## The decision

Every browser simulation now renders its controls as ordinary HTML beside the canvas. Concretely, each simulation:

- excludes its `*UiMenus.cpp` and its canvas overlay renderer from the web target;
- adds an adapter-owned `extern "C"` bridge with commands, a validated parameter pair, a packed state snapshot, and downsampled analysis buffers;
- mirrors in that bridge the clamp ranges that used to live in the native menus, because the translation unit holding them is no longer compiled;
- declares its panel in a data descriptor that both the Astro components and the runtime wiring consume.

The exported names are identical across simulations, so one JavaScript bridge and one rendering pipeline serve all of them:

```cpp
extern "C" EMSCRIPTEN_KEEPALIVE void physicsLabSetParameter(int parameter, float value);
extern "C" EMSCRIPTEN_KEEPALIVE float physicsLabGetParameter(int parameter);
extern "C" EMSCRIPTEN_KEEPALIVE const float *physicsLabStateBuffer();
extern "C" EMSCRIPTEN_KEEPALIVE int physicsLabStateLength();
extern "C" EMSCRIPTEN_KEEPALIVE const float *physicsLabSeriesSamples();
extern "C" EMSCRIPTEN_KEEPALIVE void physicsLabSetKeyboardCaptured(int captured);
```

The page never allocates on the C++ side. It calls the setters, and reads the snapshot and the plot samples straight from the module heap.

## Dear ImGui stays linked, on purpose

Removing the panels does not mean removing the library. The pinned native camera classes ask `ImGui::GetIO().WantCaptureMouse` and `WantCaptureKeyboard` whether the pointer and the keyboard belong to the scene. Unlinking the library would mean patching classes that the desktop applications depend on.

The adapter creates an ImGui context and never starts a frame, so every capture flag stays false forever, which is precisely the answer a DOM panel wants. The rlImGui backend is simply not built.

Keyboard shortcuts needed one more guard. Raylib listens for key events on the document, so it happily reacts to a visitor typing a value into a number field. That is what `physicsLabSetKeyboardCaptured` is for: the panel tells the runtime when focus is inside a control.

## Two build flags that shaped the design

The web target is compiled with dynamic code generation disabled, which rules out `ccall` and `cwrap`. Exported functions are called directly, and the typed-array view used to read the buffers has to be requested explicitly:

```text
-sDYNAMIC_EXECUTION=0
-sEXPORTED_RUNTIME_METHODS=['HEAPF32']
```

Both lines look like trivia until a plot silently renders nothing because `HEAPF32` is undefined in a release build.

## What it bought

With the Dear ImGui draw, table, and widget code unreachable, the linker dropped it. Release builds with `-O3` and LTO, on Emscripten 6.0.5:

| Simulation              | WebAssembly module |
| ----------------------- | -----------------: |
| Ballistics              |      177,613 bytes |
| Pendulum                |      178,368 bytes |
| Gas and Brownian motion |      172,535 bytes |

Each module used to sit near 500 KiB. That is roughly a two-thirds cut, and it was a side effect of an accessibility decision rather than the goal of an optimization pass.

The canvas now shows only the simulation. The controls get labels, focus order, and keyboard support from the platform, for free.

## Three things that only appeared after the move

**The enums became a cross-language contract.** Parameter, state, and record indices are now shared between a C++ header and a TypeScript descriptor, with nothing but discipline holding them together. A unit test compares both sides and fails the build when they drift.

**Plot range guards must be relative.** The analysis plots were reimplemented with Canvas 2D. An absolute epsilon for "this series is flat" works fine for energy in joules and flattens the trace completely for a gas pressure on the order of `1e-24`.

**Edit rules differ per simulation.** Ballistics and the pendulum accept configuration only while idle; the gas bath also accepts it while paused. That belongs in the panel descriptor, not in four `if` statements spread across the wiring.

## What I would keep

The part worth repeating is not the size reduction, it is the boundary. Once the interface stopped being drawn by the simulation and started being described by it, the canvas got smaller, the panel got testable, and the two sides could be reviewed independently. The 66 percent came along afterwards.
