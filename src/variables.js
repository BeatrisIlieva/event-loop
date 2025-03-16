export const mainThreadContexts = [
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

export const logResults = [
    'Start',
    'End',
    '1 second later',
    '2 seconds later',
    '3 seconds later',
    '4 seconds later'
];

export const contexts = [
    `oneSecondLater();`,
    `console.log('1 second later');`,
    `twoSecondsLater();`,
    `console.log('2 seconds later');`
];

export const moveToBrowserApiButtonTitle = 'Move To Browser API';
export const moveToEvenQueueButtonTitle = 'Move to Event Queue';
export const moveToCallstackButtonTitle = 'Move to Callstack';
export const executeButtonTitle = 'Execute';
export const invokeButtonTitle = 'Invoke';
