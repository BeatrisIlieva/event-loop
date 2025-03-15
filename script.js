const logResults = [
    'Start',
    '3 seconds later',
    'End',
    '0 seconds later',
    '1 second later',
    '2 seconds later'
];

const contexts = [
    "console.log('Start');",
    'zeroSecondsLater();',
    "console.log('2 seconds later');",
    "console.log('3 seconds later');",
    "console.log('End');",
    "console.log('0 seconds later');",
    "console.log('1 second later');"
];

const actions = {
    0: zeroAction,
    1: firstAction,
    2: thirdAction
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
const resultUlElement = document.getElementById('result');

function zeroAction() {
    addContentToCallstack(contexts[0]);

    userActionButtonElement.textContent = 'Execute';
}

function firstAction() {
    addContentToResult(0);

    const lastContext = callstackUlElement.lastElementChild;
    lastContext.remove();

    userActionButtonElement.textContent = 'Invoke';
}

function thirdAction() {}

function createPreElement(content) {
    const codeElement = document.createElement('code');
    codeElement.classList.add('language-javascript');
    codeElement.textContent = content;

    const preElement = document.createElement('pre');
    preElement.append(codeElement);

    Prism.highlightElement(codeElement);

    return preElement;
}

function addContentToCallstack(content) {
    const preElement = createPreElement(content);

    const liElement = document.createElement('li');
    liElement.append(preElement);

    callstackUlElement.append(liElement);
}

function addContentToResult(index) {
    const liElement = document.createElement('li');
    liElement.textContent = logResults[index];
    resultUlElement.append(liElement);
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
    console.log('0 seconds later');

    return oneSecondLater();
}

function oneSecondLater() {
    return console.log('1 second later');
}

executeCode();
`;

Prism.highlightElement(codeElement);
