// an object - allows data to group together
const person = {
    // key value paires
    name: "mike",
    age: 29,
    // object can have functions
    greet1: () => {
        console.log('Hi, I\'am '+ this.name);    // prints undefined
        // this keyword here refers to global scope to the global node runtime scope and not to this object.
    },
    // below functions greet properly
    greet2: function() {
        console.log('Hi, I\'am '+ this.name);    // prints mike
    },
    greet3() {
        console.log('Hi, I\'am '+ this.name);    // prints mike
    },
}

console.log(person);
person.greet1();
person.greet2();
person.greet3();


// Object Destructuring
// ------------------------------------------------------------------------------
const printName1 = (personData) => {
    console.log(personData.name);
}
printName1(person);
// destructing the person object to only get the required name data
const printName2 = ({ name }) => {
    console.log(name);
}
const printName3 = ({ name, age, greet2 }) => {
    console.log(name);
    console.log(age);
    greet2();
}
printName2(person);
printName3(person);

const { name, age } = person;
console.log(name, age);
