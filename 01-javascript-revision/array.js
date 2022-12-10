const hobbies = ['sports', 'cooking'];

for(let hobby of hobbies) {
    console.log(hobby);
}
console.log(hobbies.map((hobby) => 'hobby : '+hobby));
console.log(hobbies);

// you can add values to array.
// reference type only store an address pointing at the place in memory where that array is stored.
// that pointer which points this address has not changed by adding new element.
hobbies.push('gardening');
console.log(hobbies);


// Array Destructing
// --------------------------------------------------
const [hobby1, hobby2] = hobbies;
console.log(hobby1);
console.log(hobby2);