const btnAdd = document.getElementById('btnAdd');
const num1 = document.getElementById('num1')! as HTMLInputElement;
const num2 = document.getElementById('num2')! as HTMLInputElement;
const pResult = document.getElementById('result') as HTMLLIElement;

btnAdd.addEventListener("click", function() {
    const sum = vSum(+num1.value, +num2.value);

    pResult.innerText = `${sum}`;
}); // btnAdd.onClick

function vSum(num1: number, num2: number) {
    return num1 + num2;
}