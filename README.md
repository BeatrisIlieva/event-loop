# Event Loop Visualization Project

## Overview

The **Event Loop Visualization project** is an interactive tool that helps learners understand the JavaScript **Event Loop**. The unique feature of this project is that users can interact with the event loop process by **moving functions between the call stack**, delegating them to the **Browser**, and then transferring them back from the **Event Queue** to the call stack.

Each step of the event loop process is visually represented, with **descriptions provided at every stage** to explain what is happening. This project helps users grasp how **synchronous** and **asynchronous** code execution works in JavaScript.

## How It Works

In this interactive visualization, users can click to:

1. **Move functions from the call stack**: Functions are initially executed synchronously on the call stack.

2. **Delegate functions to the browser**: By clicking, users move functions out of the call stack, simulating the process of delegating them to the browser’s Web APIs (e.g., `setTimeout`).

3. **Move functions to the event queue**: After the asynchronous task completes, users move the function from the browser to the event queue.

4. **Move functions back to the call stack**: Finally, users move the function from the event queue back to the call stack for execution.

This simulation allows users to visually follow the **event-driven execution flow** of JavaScript.

## Code Explanation

### `executeCode` Function

The main function that starts the visualization:

```javascript
function executeCode() {
    console.log('Start');

    setTimeout(() => {
        zeroSecondsLater();
    }, 0);

    setTimeout(() => {
        console.log('3 seconds later');
    }, 3000);

    setTimeout(() => {
        console.log('4 seconds later');
    }, 4000);

    console.log('End');
}
```

-   **Synchronous Execution**: `console.log('Start')` and `console.log('End')` run immediately.

-   **Asynchronous Callbacks**: The first `setTimeout` triggers the `zeroSecondsLater()` function, which is pushed to the event queue after being delegated to the browser's Web APIs.

-   **Further Delayed Callbacks**: The second and third `setTimeout` callbacks are executed after 3 and 4 seconds, respectively.

### `zeroSecondsLater` and Nested Functions

```javascript
function zeroSecondsLater() {
    oneSecondLater();
    twoSecondsLater();
}

function oneSecondLater() {
    console.log('1 second later');
}

function twoSecondsLater() {
    console.log('2 seconds later');
}
```

-   **Synchronous Logs**: `oneSecondLater` and `twoSecondsLater` are executed immediately once `zeroSecondsLater` is invoked.

### Visual Process

1. **Call Stack**: Initially, the synchronous code (e.g., `console.log('Start')` and `console.log('End')`) is pushed onto the call stack and executed immediately.

2. **Event Queue**: Asynchronous tasks are delegated to the browser and, after completion, moved to the event queue for deferred execution.

3. **User Interaction**: Users can visually move functions between the call stack, browser, and event queue by clicking. As the functions are moved, **step-by-step descriptions** of each action will be displayed, helping users understand the event loop mechanism in real-time.

### Conclusion

This interactive visualization helps demystify the **JavaScript Event Loop**, offering an engaging way to understand **synchronous** and **asynchronous** code execution. By allowing users to control the flow of the event loop and view each step, it provides a deeper understanding of how JavaScript manages function execution, event delegation, and timing.
