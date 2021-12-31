// Example #1 ------------------------------------------------------- START
function merge<T, U>(objA: T, objB: U) {
    return {...objA, ...objB};
}

const mergedObj = merge( { name: 'Ego' }, { age: 30 } );
console.log(mergedObj.name);
// Example #1 ------------------------------------------------------- END

// Example #2 ------------------------------------------------------- START
function getArray<T>(items: T[]) {
    return new Array<T>().concat(items);
}

let arrNum = getArray<number>([1, 2]);
arrNum.push(3);
// arrNum.push('4'); // Error

let arrStr = getArray(['Hello']); // ~getArray<string> // without specifying the type
arrStr.push('World');
// arrStr.push( new Date() ); // Error
// Example #2 ------------------------------------------------------- END

// Example #3 ------------------------------------------------------- START
// Multiple generics
function displayTypes<T, U>(a: T, b: U) {
    console.log(`Type of '${a} is ${typeof a}`);
    console.log(`Type of '${b} is ${typeof b}`);
}
// Example #3 ------------------------------------------------------- END

// Example #4 ------------------------------------------------------- START
// Generic constraint with 'extends' keyword
class Person {
    firstName: string;
    lastName: string;

    constructor(fname:string,  lname:string) { 
        this.firstName = fname;
        this.lastName = lname;
    }
}

function display<T extends Person>(per: T): void { // Generic constraint with 'extends' keyword
    console.log(`${ per.firstName} ${per.lastName}` );
}

let per = new Person("Bill", "Gates");
display(per); // Bill Gates
// display("Bill Gates");// Error
// Example #4 ------------------------------------------------------- END

// Example #5 ------------------------------------------------------- START
// Generic constraint with 'keyof' keyword
function extract<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}
// Example #5 ------------------------------------------------------- END

// Example #6 ------------------------------------------------------- START
// Partial
type TodoStatus = "PENDING" | "ON PROGRESS" | "DONE" | "CANCELED";
interface ITodo {
    title: string;
    description: string;
    status: TodoStatus;
    dateCreated: Date;
}

function createTodo(title, description): ITodo {
    return {
        title,
        description,
        status: "PENDING",
        dateCreated: new Date()
    } as ITodo
} 

function updateToto(todo: ITodo, fieldsToUpdate: Partial<ITodo>): ITodo {
    return { ...todo, ...fieldsToUpdate };
}

const todo = createTodo(
    "Learn Typescript",
    "Understanding Typescript 2022 by Max"    
);

const todoDone = updateToto(todo, {
    status: "ON PROGRESS"
});
// Example #6 ------------------------------------------------------- END

// Example #7 ------------------------------------------------------- START
// Readonly
const a: Readonly<number[]> = [2];
// a.push(3); // Error
// Example #7 ------------------------------------------------------- END
