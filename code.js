function executeCode() {
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
