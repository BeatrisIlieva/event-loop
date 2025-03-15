const logResults = [
    'Start',
    '3 seconds later',
    'End',
    '1 second later',
    '0 seconds later',
    '2 seconds later'
];

const contexts = [
    "console.log('Start');",
    'zeroSecondsLater();',
    "console.log('2 seconds later');",
    "console.log('3 seconds later');",
    "console.log('End');",
    'oneSecondLater();',
    "console.log('0 seconds later');",
    "console.log('1 second later');"
];

const actions = {
    0: zeroAction,
    1: firstAction,
    2: secondAction,
    3: thirdAction,
    4: fourthAction,
    5: fifthAction,
    6: sixthAction,
    7: seventhAction,
    8: eightAction,
    9: ninthAction,
    10: tenthAction,
    11: eleventhAction,
    12: twelfthAction,
    13: thirteenthAction,
    14: fourteenthAction
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

const callstackUlElement = document.querySelector('.callstack ul');
const resultUlElement = document.querySelector('.user-action ul');
const browserApiUlElement = document.querySelector('.browser-api ul');
const eventQueueUlElement = document.querySelector('.event-queue ul');

function addToCallstack(content) {
    callstackUlElement.append(createContextElement(content));

    // userActionButtonElement.textContent = 'Execute';
}

function moveToCallstack() {
    const firstContext = eventQueueUlElement.firstElementChild;

    callstackUlElement.append(firstContext);
}

function removeFromCallstack() {
    const lastContext = callstackUlElement.lastElementChild;

    lastContext.remove();
}

function moveToBrowserApi() {
    const lastContext = callstackUlElement.lastElementChild;

    browserApiUlElement.append(lastContext);

    // userActionButtonElement.textContent = 'Move to Event Queue';
}

function moveToEventQueue() {
    const lastContext = browserApiUlElement.firstElementChild;

    eventQueueUlElement.append(lastContext);
}

function updateResult(index) {
    addContentToResult(index);
}

function zeroAction() {
    addToCallstack(contexts[0]);

    userActionButtonElement.textContent = 'Execute';
}

function firstAction() {
    updateResult(0);

    removeFromCallstack();

    userActionButtonElement.textContent = 'Invoke';
}

function secondAction() {
    addToCallstack(contexts[1]);

    userActionButtonElement.textContent = 'Delegate to Browser';
}

function thirdAction() {
    moveToBrowserApi();

    userActionButtonElement.textContent = 'Move to Event Queue';
}

function fourthAction() {
    moveToEventQueue();

    userActionButtonElement.textContent = 'Invoke';
}

function fifthAction() {
    addToCallstack(contexts[2]);

    userActionButtonElement.textContent = 'Delegate to Browser';
}

function sixthAction() {
    moveToBrowserApi();

    userActionButtonElement.textContent = 'Invoke';
}

function seventhAction() {
    addToCallstack(contexts[3]);
    userActionButtonElement.textContent = 'Move to Event Queue';
}

function eightAction() {
    moveToEventQueue();

    userActionButtonElement.textContent = 'Execute';
}

function ninthAction() {
    updateResult(1);

    removeFromCallstack();

    userActionButtonElement.textContent = 'Invoke';
}

function tenthAction() {
    addToCallstack(contexts[4]);

    userActionButtonElement.textContent = 'Execute';
}

// function eleventhAction() {
//     updateResult(2);

//     removeFromCallstack();

//     userActionButtonElement.textContent = 'Execute';

// }

// function tenthAction() {
//     moveToCallstack();

//     userActionButtonElement.textContent = 'Move to Callstack';
// }

function eleventhAction() {
    updateResult(2);

    removeFromCallstack();

    userActionButtonElement.textContent = 'Move to Callstack';
}

function twelfthAction() {
    // removeFromCallstack();

    moveToCallstack();
    userActionButtonElement.textContent = 'Execute';
}

function thirteenthAction() {
    // updateResult(4);

    // updateResult(3);

    callstackUlElement.prepend(createContextElement(contexts[5]));

    // removeFromCallstack();

    // addToCallstack(contexts[4]);
}

function fourteenthAction() {
    updateResult(3);

    // removeFromCallstack();

    const firstContext = callstackUlElement.firstElementChild;
    firstContext.remove();

    userActionButtonElement.textContent = 'Execute';
}

function addContentToResult(index) {
    const liElement = document.createElement('li');
    liElement.textContent = logResults[index];
    resultUlElement.append(liElement);
}

function createContextElement(content) {
    const preElement = createPreElement(content);

    const liElement = document.createElement('li');
    liElement.append(preElement);

    return liElement;
}

function createPreElement(content) {
    const codeElement = document.createElement('code');
    codeElement.classList.add('language-javascript');
    codeElement.textContent = content;

    const preElement = document.createElement('pre');
    preElement.append(codeElement);

    Prism.highlightElement(codeElement);

    return preElement;
}

const codeElement = document.querySelector('.language-javascript');
codeElement.textContent = `function executeCode() {
    console.log('Start');

    setTimeout(() => {
        zeroSecondsLater();
    }, 0);

    setTimeout(() => {
        console.log('2 seconds later');
    }, 2000);

    console.log('3 seconds later');

    return console.log('End');
}

function zeroSecondsLater() {
    oneSecondLater();

    return console.log('0 seconds later');
}

function oneSecondLater() {
    return console.log('1 second later');
}

executeCode();

`;

Prism.highlightElement(codeElement);
