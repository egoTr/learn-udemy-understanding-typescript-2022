"use strict";
// Object with type IPerson ------------------------ START
const user1 = {
    name: 'Ego',
    age: 20,
    favorites: ['Swimming', 'Walking', 'Singing'],
    greet(phrase) {
        console.log(`${phrase} ${this.name} !`);
    }
};
user1.greet('Hello, I am'); // Hello, I am Ego !
// Object with type IPerson ------------------------ END
// Class that implements IPerson ------------------- START
class Person1 {
    constructor(name) {
        this.name = name;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name} !`);
    }
}
const user2 = new Person1('Thnox');
user2.greet('Hi from'); // Hi from Thnox !
// Class that implements IPerson ------------------- END
// Class that implements Named and IGreetable ------ START
class Person2 {
    constructor(name) {
        this.isFemale = false;
        this.name = name;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name} !`);
    }
}
// Class that implements Named and IGreetable ------ ENDx
