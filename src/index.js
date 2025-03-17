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
    populateCallstack
} from './utils.js';

import {
    callstackUlElement,
    containerLoopElement,
    resultUlElement
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

const userActionButtonElement = document.querySelector(
    '.user-action button'
);

function clickHandler() {
    let currentAction = 0;

    return function execute() {
        if (userActionButtonElement.textContent == 'Start Again') {
            currentAction = 0;

            userActionButtonElement.textContent = 'Execute';

            populateCallstack();

            resultUlElement.innerHTML = '';

            return;
        }

        actions[currentAction]();

        currentAction += 1;
    };
}

const execute = clickHandler();

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

    const firstElement = callstackUlElement.lastElementChild;
    firstElement.remove();

    updateResult(3);

    userActionButtonElement.textContent = moveToCallstackButtonTitle;
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

    userActionButtonElement.textContent = 'Start Again';
}
const callstackSectionElement = document.querySelector('.callstack');
callstackSectionElement.classList.add('active');

const idleElement = document.querySelector('.idle');

function watchCallstackChildren() {
    const observer = new MutationObserver(() => {
        const callstackUlElementLength =
            callstackUlElement.querySelectorAll('li').length;

        if (callstackUlElementLength > 0) {
            callstackSectionElement.classList.add('active');

            containerLoopElement.classList.remove('rotated');
            idleElement.classList.remove('visible');
        } else {
            containerLoopElement.classList.add('rotated');
            idleElement.classList.add('visible');

            callstackSectionElement.classList.remove('active');
        }
    });

    observer.observe(callstackUlElement, { childList: true });

    return observer;
}

watchCallstackChildren();

const browserApiUlElement = document.querySelector('.browser-api ul');

function watchBrowserApiChildren() {
    const observer = new MutationObserver(() => {
        const browserApiSectionElementLength =
            browserApiUlElement.querySelectorAll('li').length;

        const browserApiSectionElement =
            browserApiUlElement.closest('section');

        if (browserApiSectionElementLength > 0) {
            browserApiSectionElement.classList.add('active');
        } else {
            browserApiSectionElement.classList.remove('active');
        }
    });

    observer.observe(browserApiUlElement, { childList: true });

    return observer;
}

watchBrowserApiChildren();

const eventQueueUlElement = document.querySelector('.event-queue ul');

function watchEventQueueChildren() {
    const observer = new MutationObserver(() => {
        const eventQueueSectionElementLength =
            eventQueueUlElement.querySelectorAll('li').length;

        const eventQueueSectionElement =
            eventQueueUlElement.closest('section');

        if (eventQueueSectionElementLength > 0) {
            eventQueueSectionElement.classList.add('active');
        } else {
            eventQueueSectionElement.classList.remove('active');
        }
    });

    observer.observe(eventQueueUlElement, { childList: true });

    return observer;
}

watchEventQueueChildren();
