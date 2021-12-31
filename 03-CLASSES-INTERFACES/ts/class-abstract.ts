// abstract class:
//  (1) not allowed to create an instance
//  (2) force inheriting classes to have abstract methods 
abstract class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    // abstract method does not have an implementation
    abstract sayHello(): void;
}

class Dog extends Animal {
    constructor(public name: string = 'Cute dog') {
        super(name);
    }

    sayHello(): void {
        console.log(`Hi, I'm a dog. My name is ${this.name}`);
    }
}