import {
    contexts,
    moveToBrowserApiButtonTitle,
    moveToEvenQueueButtonTitle,
    moveToCallstackButtonTitle,
    executeButtonTitle,
    invokeButtonTitle
} from './variables.js';

import {
    addToCallstack,
    moveToCallstack,
    removeFromCallstack,
    moveToBrowserApi,
    moveToEventQueue,
    updateResult,
    createPreElement
} from './utils.js';

import {
    callstackUlElement,
    containerLoopElement
} from './elements.js';

const actions = {
    0: zeroAction,
    1: firstAction,
    2: secondAction,
    3: thirdAction,
    4: fourthAction,
    5: fifthAction,
    6: sixthAction,
    7: seventhAction,
    8: eighthAction,
    9: ninthAction,
    10: tenthAction,
    11: eleventhAction,
    12: twelvethAction,
    13: thirteenthAction,
    14: fourteenthAction,
    15: fifteenthAction,
    16: sixteenthAction,
    17: seventeenthAction,
    18: eighteenthAction
};

function clickHandler() {
    let currentAction = 0;

    return function execute() {
        actions[currentAction]();

        currentAction += 1;
    };
}

const execute = clickHandler();

const userActionButtonElement = document.querySelector(
    '.user-action button'
);

userActionButtonElement.addEventListener('click', execute);

function zeroAction() {
    updateResult(0);

    removeFromCallstack();

    userActionButtonElement.textContent = moveToBrowserApiButtonTitle;
}

function firstAction() {
    moveToBrowserApi();

    userActionButtonElement.textContent = moveToEvenQueueButtonTitle;
}

function secondAction() {
    moveToEventQueue();

    userActionButtonElement.textContent = moveToBrowserApiButtonTitle;
}

function thirdAction() {
    moveToBrowserApi();
}

function fourthAction() {
    moveToBrowserApi();

    userActionButtonElement.textContent = executeButtonTitle;
}

function fifthAction() {
    updateResult(1);

    removeFromCallstack();

    userActionButtonElement.textContent = moveToCallstackButtonTitle;
}

function sixthAction() {
    moveToCallstack();

    userActionButtonElement.textContent = moveToEvenQueueButtonTitle;
}

function seventhAction() {
    moveToEventQueue();
}

function eighthAction() {
    moveToEventQueue();

    userActionButtonElement.textContent = invokeButtonTitle;
}

function ninthAction() {
    addToCallstack(contexts[0]);
}

function tenthAction() {
    removeFromCallstack();
    addToCallstack(contexts[1]);
    userActionButtonElement.textContent = executeButtonTitle;
}

function eleventhAction() {
    removeFromCallstack();
    userActionButtonElement.textContent = invokeButtonTitle;
    updateResult(2);
}

function twelvethAction() {
    addToCallstack(contexts[2]);
}

function thirteenthAction() {
    removeFromCallstack();

    addToCallstack(contexts[3]);

    userActionButtonElement.textContent = executeButtonTitle;
}

function fourteenthAction() {
    removeFromCallstack();

    updateResult(3);

    userActionButtonElement.textContent = moveToCallstackButtonTitle;

    removeFromCallstack();
}

function fifteenthAction() {
    moveToCallstack();

    userActionButtonElement.textContent = executeButtonTitle;
}

function sixteenthAction() {
    updateResult(4);
    removeFromCallstack();

    userActionButtonElement.textContent = moveToCallstackButtonTitle;
}

function seventeenthAction() {
    moveToCallstack();

    userActionButtonElement.textContent = executeButtonTitle;
}

function eighteenthAction() {
    updateResult(5);
    removeFromCallstack();

    userActionButtonElement.textContent = 'Start again';
}

document.addEventListener('click', () => {
    const callstackUlElementLength =
        callstackUlElement.querySelectorAll('li').length;

    if (callstackUlElementLength > 0) {
        containerLoopElement.classList.remove('rotated');
    } else {
        containerLoopElement.classList.add('rotated');
    }
});
