interface INamed {
    name: string;
}

interface IGreetable {
    greet(phrase: string): void;
}

// Interface that extends INamed and IGreetable
interface IPerson extends INamed, IGreetable {
    age: number;
    favorites?: string[]; // optional
} // Person

// Object with type IPerson ------------------------ START
const user1: IPerson = {
    name: 'Ego',
    age: 20,
    favorites: ['Swimming', 'Walking', 'Singing'],

    greet(phrase: string) {
        console.log(`${phrase} ${this.name} !`);
    }
}
user1.greet('Hello, I am'); // Hello, I am Ego !
// Object with type IPerson ------------------------ END

// Class that implements IPerson ------------------- START
class Person1 implements IPerson {
    name: string;
    age: number;

    constructor(name: string) {
        this.name = name;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name} !`);
    }
}
const user2 = new Person1('Thnox');
user2.greet('Hi from'); // Hi from Thnox !
// Class that implements IPerson ------------------- END

// Class that implements Named and IGreetable ------ START
class Person2 implements INamed, IGreetable {
    name: string;
    yearOfBirth: number;
    isFemale: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    greet(phrase: string): void {
        console.log(`${phrase} ${this.name} !`);
    }
}
// Class that implements Named and IGreetable ------ ENDx