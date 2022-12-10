const hobbies = ['sports', 'gardening'];
hobbies.push('programming');

// Spread Operator - mostly used
//---------------------------------------------------------
// Let's say when we want to implement a pattern where when we add a new hobby, we don't edit the original array
// but we create new array with all old values and the new value.
// This pattern is called immutability where we never added existing values, but where we always replace them with copies plus the changes
const copiedArr1 = hobbies.slice();   // slice copies the array
const copiedArr2 = [hobbies];         // print array with old array - not a copy of that.
const copiedArr3 = [...hobbies];      // spread operator
// it takes the array or object after the operator and pull out all the elements or properties and put it in whatever is around the spread operator.
const copiedObj = {...hobbies};       

console.log(hobbies);
console.log(copiedArr1);
console.log(copiedArr2);
console.log(copiedArr3);
console.log(copiedObj);             // prints { '0': 'sports', '1': 'gardening', '2': 'programming' }


// Rest Operator
// ---------------------------------------------------------
// Let's say we want to take multiple arguments as input for a function and return an array of those arguments.
const toArray1 = (arg1, arg2, arg3, arg4) => {
    return [arg1, arg2, arg3, arg4];
}
console.log(toArray1(1,2,3,4));
// what if we want to pass N no of args to toArray function?
const toArray2 = (...args) => {
    return args; // args itself would be an array of arguments
}
console.log(toArray2(1,2));
console.log(toArray2(1,2,4,6,10));
