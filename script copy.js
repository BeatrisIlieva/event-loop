const logResults = [
    'Start',
    'End',
    '2 second later',
    '3 seconds later',
    '0 seconds later',
    '1 second later'
];

const contexts = ["console.log('End');"];

const actions = {
    0: zeroAction,
    1: firstAction
};

const contextsElement = document.getElementById('contexts');
const resultUlElement = document.querySelector('#result ul');

function clickHandler() {
    let currentIndex = 0;

    return function execute() {
        actions[currentIndex]();

        currentIndex += 1;

        if (currentIndex != 0) {
            buttonElement.textContent = 'Next';
        }

        if (currentIndex == logResults.length - 1) {
            buttonElement.setAttribute('disabled', 'disabled');

            buttonElement.textContent = 'End';

            return;
        }
    };
}

const execute = clickHandler();

const buttonElement = document.querySelector('button');
buttonElement.addEventListener('click', execute);

function createLiElement(currentIndex) {
    const liElement = document.createElement('li');

    liElement.textContent += `${logResults[currentIndex]}`;

    return liElement;
}

function zeroAction() {
    resultUlElement.append(createLiElement(0));

    const lastContext = contextsElement.lastElementChild;

    const codeElement = document.createElement('code');
    codeElement.classList.add('language-javascript');
    codeElement.textContent = contexts[0];

    const preElement = document.createElement('pre');
    preElement.append(codeElement);

    Prism.highlightElement(codeElement);

    const liElement = document.createElement('li');
    liElement.append(preElement);

    lastContext.remove();

    contextsElement.append(liElement);
}

function firstAction() {
    
}
