function subtract(num1: number, num2: number) {
    return num1 - num2;
}

// Returned type is specified as number
function add(num1: number, num2: number): number {
    return num1 + num2;
}

// Returned type is specified as void
function printResult(value): void {
    console.log('Value is: ' + value);
}

// Function with callback
function addAndHandle(num1: number, num2: number, callback: (num: number) => void) {
    const sum = add(num1, num2);
    callback(sum);
}
addAndHandle(1, 2, printResult);
addAndHandle(1, 2, (num: number) => {
    console.log('Sum is: ' + num);
})

// Function with rest parameters
const addWithRestParameters = (...numbers: number[]): number => (
    numbers.reduce( (curResult, curValue) => curResult + curValue, 0)
);
addWithRestParameters(1, 2, 3); // 6
addWithRestParameters(2.2, -4.3); // -2.1

const obj1 = { name: '2', age: 2, isFemale: true };
const obj2 = { ...obj1, age: 3 };