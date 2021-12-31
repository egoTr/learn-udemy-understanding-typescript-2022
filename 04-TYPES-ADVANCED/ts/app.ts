// Type intersection ------------------------------------------------ START
// Type intersection is similar to interface extension from multiple interfaces
//// Example #1
type NumberOrString = number | string;  // Type union
type NumberOrBoolean = number | boolean;    // Type union
type Intersection = NumberOrString & NumberOrBoolean; // number

//// Example #2
type Employee = {
    name: string,
    dateStart: Date
}
type AdminIT = {
    permissions: string[]
}
type Manager = {
    title: string
}
type AdminEmployee = Employee & AdminIT;
// Type intersection ------------------------------------------------ END

// Type guard ------------------------------------------------------- START
type UnknownEmployee = Employee & (AdminIT | Manager);
function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`);
    console.log(`Date start: ${emp.dateStart}`);
    if ('permissions' in emp) // Type guard
        console.log(`Permissions: ${emp.permissions}`);
    if ('title' in emp)       // Type guard
        console.log(`Title: ${emp.title}`); 
}
// Type guard ------------------------------------------------------- END

// <Type> casting --------------------------------------------------- START
//// Example #1
const userInput1 = <HTMLInputElement>document.getElementById('user-input-1');
userInput1.value = 'I am input #1';

//// Example #2
const userInput2 = document.getElementById('user-input-2') as HTMLInputElement;
userInput2.value = 'I am input #2';
// <Type> casting --------------------------------------------------- END

// Index properties ------------------------------------------------- START
type ErrorPattern = {
    [property: string]: number | string;
}
const errorInvalidUser: ErrorPattern = {
    username: 'Username must start with an alphabet',
    email: 'Invalid email'
};
// Index properties ------------------------------------------------- END

// Function fake-overload ------------------------------------------- START
function fnConcatOrSum(a: number, b: number): number;
function fnConcatOrSum(a: number, b: string): string;
function fnConcatOrSum(a: string, b: number): string;
function fnConcatOrSum(a: string, b: string): string;
function fnConcatOrSum(a: NumberOrString, b: NumberOrString) {
    if (typeof a === 'string' || typeof b === 'string') // Type guard
        return a.toString() + b.toString();
    
    return a + b; // This is not safe if a or b is not a number
}
// Function fake-overload ------------------------------------------- END