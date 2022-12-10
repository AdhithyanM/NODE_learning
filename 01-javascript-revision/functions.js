const name = "mike";
let age = 29;
// var is outdated
let hasHobbies = true;

// a named function
function summarizeUser(userName, userAge, userHasHobby) {
    return (
        'Name is ' + userName
        + '\nAge is ' + userAge
        + '\nhobbies is ' + userHasHobby
    );
}

// a named function built by named constant and assigned to anonymous function
const namedFunction2 = function (userName, userAge, userHasHobby) {
    return (
        'Name is ' + userName
        + '\nAge is ' + userAge
        + '\nhobbies is ' + userHasHobby
    );
}

// a named function built by named constant and arrow function
const namedFunction3 = (userName, userAge, userHasHobby) => {
    return (
        'Name is ' + userName
        + '\nAge is ' + userAge
        + '\nhobbies is ' + userHasHobby
    );
}

// other examples of arrow functions
const add1 = (a,b) => {
    return a+b;
}
// if we only have one return statement in arrow fn, then it can be written as below:
const add2 = (a,b) => a + b;
// if we had only one argument, then it can written as below
const add3 = a => a + 1;
// if no arguments is present,
const addRandom = () => 1 + 2;

console.log(add1(1,2));
console.log(add2(1,3));
console.log(add3(1));
console.log(addRandom());

console.log(summarizeUser(name, age, hasHobbies));
console.log("-----------------------------------");
console.log(namedFunction2(name, age, hasHobbies));
console.log("-----------------------------------");
console.log(namedFunction3(name, age, hasHobbies));