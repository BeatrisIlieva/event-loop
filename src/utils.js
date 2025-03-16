import { logResults } from './variables.js';

import { mainThreadContexts } from './variables.js';

import {
    callstackUlElement,
    resultUlElement,
    browserApiUlElement,
    eventQueueUlElement
} from './elements.js';

export function addToCallstack(content) {
    callstackUlElement.prepend(createContextElement(content));
}

// export function moveToCallstack() {
//     const firstContext = eventQueueUlElement.firstElementChild;

//     callstackUlElement.append(firstContext);
// }

export function moveToCallstack() {
    const firstContext = eventQueueUlElement.firstElementChild;

    if (!firstContext) return; // Prevent errors if no element exists

    // Get the current position of the element
    const rect = firstContext.getBoundingClientRect();
    const startLeft = rect.left;
    const startTop = rect.top;

    // Set absolute positioning to preserve its position
    firstContext.style.position = 'absolute';
    firstContext.style.left = `${startLeft}px`;
    firstContext.style.top = `${startTop}px`; // Prevent vertical movement

    // Append it to the document body temporarily to avoid layout shifts
    document.body.appendChild(firstContext);

    // Calculate the distance to move left
    const targetX = callstackUlElement.getBoundingClientRect().left - startLeft;

    // Trigger the leftward movement animation
    requestAnimationFrame(() => {
        firstContext.classList.add('move-left');
        firstContext.style.transform = `translateX(${targetX}px)`;
    });

    // After animation ends, append the element to the new parent
    firstContext.addEventListener('transitionend', () => {
        callstackUlElement.appendChild(firstContext);
        firstContext.classList.remove('move-left'); // Remove animation class
        firstContext.style.position = ''; // Reset position
        firstContext.style.transform = ''; // Reset transformation
    });
}


export function removeFromCallstack() {
    callstackUlElement.firstElementChild.remove();
}

// export function moveToBrowserApi() {
//     browserApiUlElement.append(callstackUlElement.firstElementChild);
// }

export function moveToBrowserApi() {
    const elementToMove = callstackUlElement.firstElementChild;

    // Store the initial position of the element
    const rect = elementToMove.getBoundingClientRect();
    const initialLeft = rect.left;
    const initialTop = rect.top;

    // Set the element's position to absolute
    elementToMove.style.position = 'absolute';
    elementToMove.style.left = `${initialLeft}px`;
    elementToMove.style.top = `${initialTop}px`;

    // Add the move-right-up class to trigger the transition
    elementToMove.classList.add('move-right-up');

    // Wait for the transition to finish before moving the element
    elementToMove.addEventListener('transitionend', function() {
        // Move the element to the new parent
        browserApiUlElement.append(elementToMove);
        elementToMove.classList.remove('move-right-up'); // Clean up the class
        elementToMove.style.position = ''; // Optional: reset the position property
    });
}


// export function moveToEventQueue() {
//     const lastContext = browserApiUlElement.firstElementChild;

//     const pattern =
//         /setTimeout\s*\(\s*\(\s*.*?\s*\)\s*=>\s*\{([\s\S]*?)\}\s*,\s*\d+\s*\)/;

//     const match = lastContext.textContent.match(pattern);

//     const contextElement = createContextElement(match[1].trim());

//     eventQueueUlElement.append(contextElement);

//     lastContext.remove();
// }

export function moveToEventQueue() {
    const lastContext = browserApiUlElement.firstElementChild;

    if (!lastContext) return; // Avoid errors if there's no element to move

    const pattern =
        /setTimeout\s*\(\s*\(\s*.*?\s*\)\s*=>\s*\{([\s\S]*?)\}\s*,\s*\d+\s*\)/;

    const match = lastContext.textContent.match(pattern);

    if (!match) return; // Avoid errors if the pattern isn't found

    const contextElement = createContextElement(match[1].trim());

    // Get the current position of the element
    const rect = lastContext.getBoundingClientRect();
    const startTop = rect.top;

    // Temporarily append the element to the body to preserve its absolute position
    document.body.appendChild(contextElement);

    // Set absolute positioning at the original location
    contextElement.style.position = 'absolute';
    contextElement.style.top = `${startTop}px`;
    contextElement.style.left = `${rect.left}px`;

    // Trigger the animation
    requestAnimationFrame(() => {
        contextElement.classList.add('move-down');
        contextElement.style.transform = `translateY(${eventQueueUlElement.getBoundingClientRect().top - startTop}px)`;
    });

    // Move the element to the new parent after the animation ends
    contextElement.addEventListener('transitionend', () => {
        eventQueueUlElement.appendChild(contextElement);
        contextElement.classList.remove('move-down');
        contextElement.style.position = ''; // Reset position
        contextElement.style.transform = ''; // Reset transform
    });

    lastContext.remove();
}


export function updateResult(index) {
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

export function createPreElement(content) {
    const codeElement = document.createElement('code');
    codeElement.classList.add('language-javascript');
    codeElement.textContent = content;

    const preElement = document.createElement('pre');
    preElement.append(codeElement);


    Prism.highlightElement(codeElement);

        preElement.style.background = '#fff'

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

mainThreadContexts.forEach(element => {
    const liElement = document.createElement('li');
    liElement.append(createPreElement(element));

    callstackUlElement.append(liElement);
});
