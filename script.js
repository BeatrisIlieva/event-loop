const logResults = [
    'Start',
    'End',
    '1 second later',
    '2 seconds later',
    '3 seconds later',
    '4 seconds later'
];

const contexts = [];

const moveToBrowserApiButtonTitle = 'Move To Browser API';
const moveToEvenQueueButtonTitle = 'Move to Event Queue';
const moveToCallstackButtonTitle = 'Move to Callstack';
const executeButtonTitle = 'Execute';
const invokeButtonTitle = 'Invoke';

const actions = {
    0: zeroAction
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
const containerLoopElement =
    document.querySelector('.container-loop');

document.addEventListener('click', () => {
    const callstackUlElementLength =
        callstackUlElement.querySelectorAll('li').length;

    if (callstackUlElementLength > 0) {
        containerLoopElement.classList.add('rotated');
    } else {
        containerLoopElement.classList.remove('rotated');
    }
});

function zeroAction() {
    removeFromCallstack();

    userActionButtonElement.textContent = moveToBrowserApiButtonTitle;
}

function addToCallstack(content) {
    callstackUlElement.append(createContextElement(content));
}

function moveToCallstack() {
    const firstContext = eventQueueUlElement.firstElementChild;

    callstackUlElement.append(firstContext);
}

function removeFromCallstack() {
    callstackUlElement.firstElementChild.remove();
}

function moveToBrowserApi() {
    const lastContext = callstackUlElement.lastElementChild;

    browserApiUlElement.append(lastContext);
}

function moveToEventQueue() {
    const lastContext = browserApiUlElement.firstElementChild;

    eventQueueUlElement.append(lastContext);
}

function updateResult(index) {
    addContentToResult(index);
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
        console.log('3 seconds later');
    }, 3000);

    setTimeout(() => {
        console.log('4 seconds later');
    }, 4000);

    console.log('End');
}

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

executeCode();`;

Prism.highlightElement(codeElement);

const mainThreadContexts = [
    "console.log('Start');",
    `setTimeout(() => {
    zeroSecondsLater();
}, 0);`,
    `setTimeout(() => {
    console.log('3 seconds later');
}, 3000);`,
    `setTimeout(() => {
    console.log('4 seconds later');
}, 4000);`,
    "console.log('End');"
];

mainThreadContexts.forEach(element => {
    const liElement = createPreElement(element);
    callstackUlElement.append(liElement);
});
