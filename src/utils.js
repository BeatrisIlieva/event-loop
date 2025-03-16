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

export function moveToCallstack() {
    const firstContext = eventQueueUlElement.firstElementChild;

    if (!firstContext) return;

    const rect = firstContext.getBoundingClientRect();
    const startLeft = rect.left;
    const startTop = rect.top;

    firstContext.style.position = 'absolute';
    firstContext.style.left = `${startLeft}px`;
    firstContext.style.top = `${startTop}px`;

    document.body.appendChild(firstContext);

    const targetX =
        callstackUlElement.getBoundingClientRect().left - startLeft;

    requestAnimationFrame(() => {
        firstContext.classList.add('move-left');
        firstContext.style.transform = `translateX(${targetX}px)`;
    });

    firstContext.addEventListener('transitionend', () => {
        callstackUlElement.appendChild(firstContext);
        firstContext.classList.remove('move-left');
        firstContext.style.position = '';
        firstContext.style.transform = '';
    });
}

export function removeFromCallstack() {
    callstackUlElement.firstElementChild.remove();
}

export function moveToBrowserApi() {
    const elementToMove = callstackUlElement.firstElementChild;

    const rect = elementToMove.getBoundingClientRect();
    const initialLeft = rect.left;
    const initialTop = rect.top;

    elementToMove.style.position = 'absolute';
    elementToMove.style.left = `${initialLeft}px`;
    elementToMove.style.top = `${initialTop}px`;

    elementToMove.classList.add('move-right-up');

    elementToMove.addEventListener('transitionend', function () {
        browserApiUlElement.append(elementToMove);
        elementToMove.classList.remove('move-right-up');
        elementToMove.style.position = '';
    });
}

export function moveToEventQueue() {
    const lastContext = browserApiUlElement.firstElementChild;

    if (!lastContext) return;

    const pattern =
        /setTimeout\s*\(\s*\(\s*.*?\s*\)\s*=>\s*\{([\s\S]*?)\}\s*,\s*\d+\s*\)/;

    const match = lastContext.textContent.match(pattern);

    if (!match) return;

    const contextElement = createContextElement(match[1].trim());

    const rect = lastContext.getBoundingClientRect();
    const startTop = rect.top;

    document.body.appendChild(contextElement);

    contextElement.style.position = 'absolute';
    contextElement.style.top = `${startTop}px`;
    contextElement.style.left = `${rect.left}px`;

    requestAnimationFrame(() => {
        contextElement.classList.add('move-down');
        contextElement.style.transform = `translateY(${
            eventQueueUlElement.getBoundingClientRect().top - startTop
        }px)`;
    });

    contextElement.addEventListener('transitionend', () => {
        eventQueueUlElement.appendChild(contextElement);
        contextElement.classList.remove('move-down');
        contextElement.style.position = '';
        contextElement.style.transform = '';
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

    preElement.style.background = '#fff';

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
