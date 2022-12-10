// let's understand what asynchronous code is

setTimeout(() => {
    console.log('Timer is done.');
}, 2000);               // this is an async code

// synchronous code lines..
console.log('Executes before Timer is done.');
console.log('Executes after above line');

//-----------------------------------------------------------------------------------------------------------------------
// when it comes async programming, we need to understand in and out of callback, callback hell, promise, async & await.
// setTimeout(callBack(), timer);
// Assume below set of actions
// 1. process1 takes 2 sec 
// 2. fetchData which takes a callback of which process to be done next 
// 3. Once fetching data is done, print done in passed callback function.

const lastProcess1 = (msg) => {
    console.log(msg);
}
const fetchData1 = callback => {
    setTimeout(() => {
        console.log('done fetching the data.');
        callback('invoking the callback passed.');
    }, 5000);
}
setTimeout(() => {
    console.log('Timer is done. fetching data');
    fetchData1(text => {
        console.log(text);
    })
}, 2000);

// above code is example for nested async functions.
// as we go deeper and deeper in callback perspective, we can opt for using Promises.
// Often we use third party packages which internally uses promises for us.

// Promises
/*
    promise takes a callback which has 2 arg resolve, reject
    resolve is returned when promise has done the action it intended to be successfully.
    reject is returned when it is failed to do the action it intended.

    once we have the promise we can use .then() to perform desired action if its resolved.
*/
//---------------------------------------------------------------------------------------
const fetchData2 = () => {
    const promise = new Promise((resolve, reject) => {          // promise gets created
        setTimeout(() => {
            resolve('Done!');                       // after 1.5 sec, returned promise is resolved with msg Done!.
        }, 1500);
    });
    return promise;                                 // promise is returned immediately.
}
// how to deal with promise
setTimeout(() => {
    console.log('Timer is done. fetching data');
    fetchData2().then(text => {
        console.log(text);
    });
}, 2000);

// worst way to deal with multiple promise
setTimeout(() => {
    console.log('Timer is done. fetching data');
    fetchData2().then(text => {
        console.log(text);
        // again now call fetchData2 with intention of doing some other process after previous fetch
        fetchData2().then(text2 => {
            console.log(text2);
        });
        // this is not ideal since it will make code readability complex.
    });
}, 2000);

// right way to handle with multiple promises
setTimeout(() => {
    console.log('Timer is done. fetching data');
    fetchData2()
        .then(text => {
            console.log(text);
            // again now call fetchData2 with intention of doing some other process after previous fetch
            return fetchData2();
        })
        .then(tex2 => {         // then for the second promise
            console.log(text2);
        });
}, 2000);
