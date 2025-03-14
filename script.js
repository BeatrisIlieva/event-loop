const logResults = [
    'Start',
    'End',
    '2 second later',
    '3 seconds later',
    '0 seconds later',
    '1 second later'
];

function clickHandler() {
    let currentIndex = 0;

    return function execute() {
        console.log(logResults[currentIndex]);
        const resultUlElement = document.querySelector('#result ul');
        const liElement = document.createElement('li');

        liElement.textContent += `${logResults[currentIndex]}`;

        resultUlElement.appendChild(liElement);
        currentIndex += 1;
        console.log(currentIndex);

        if (currentIndex == logResults.length - 1) {
            buttonElement.setAttribute('disabled', 'disabled');

            return;
        }
    };
}

const execute = clickHandler();

const buttonElement = document.querySelector('button');
buttonElement.addEventListener('click', execute);
