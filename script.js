const logResults = [
    'Start',
    'End',
    '2 second later',
    '3 seconds later',
    '0 seconds later',
    '1 second later'
];

const contextsElement = document.getElementById('contexts');

function clickHandler() {
    let currentIndex = 0;

    return function execute() {
        const resultUlElement = document.querySelector('#result ul');

        resultUlElement.append(createLiElement(currentIndex));

        const lastContext = contextsElement.lastElementChild;

        lastContext.remove();

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
