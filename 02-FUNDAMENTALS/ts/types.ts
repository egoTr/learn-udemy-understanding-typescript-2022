enum Role {
    ADMIN = 1,
    EDITOR = 2,
    READ_ONLY = 3
}; // Role

/* Type alias -------------------------------------------------------------------------------------------- START */
type NumberOrString = number | string;
type TypeGender = NumberOrString | boolean;
type TypeWeather = 'warm' | 'cold' | 'hot';
type TypeObject = {
    favoriteColors: string[],   // array of strings
    isMarried: boolean,
}; // TypeObject
/* Type alias -------------------------------------------------------------------------------------------- END */

/* Function as type -------------------------------------------------------------------------------------- START */
let fnVar1: Function;       // any function
// fnVar1 = window.alert;
// fnVar1('Hi there!')      // will alert 'Hi there!'

let fnVar2: () => string;   // function which returns a string
let fnvar3: (a: number, b: number) => number;   // function which takes 2 arguments and returns a number
/* Function as type -------------------------------------------------------------------------------------- END */

// Declare an object variable
const someone: {
    name: string,           // property separator can be comma (,) or semi-colon (;)
    yearOfBirth: number;    // property separator can be comma (,) or semi-colon (;)
    gender: TypeGender,     // gender can also be a number or boolean // using type alias
    // nested object as property
    misc: TypeObject,
    tuple: [number, string], // force the init value must be FIXED-LENGTH (2 elements) & FIXED-TYPE
    role: Role,             // type of enumeration
    favoriteWeather: TypeWeather,   // another implementation of enumeration // using type alias // NOT RECOMMENDED
    luckyNumber1: NumberOrString,   // can be number or string // using type alias
    luckyNumber2: number | string,  // can be number or string
    any: any
} // end of type declaration
= {
    name: 'thnox',
    yearOfBirth: 1988,
    gender: 'Male', // gender can also be a number (0 = female, 1 = male) or boolean (true = male, false = female)
    misc: {
        favoriteColors: ['black', 'white'],
        isMarried: false
    }, // misc
    tuple: [1, 'string'],  // this array must MATCH the tuple declaration
    role: Role.ADMIN,           // enumeration
    favoriteWeather: 'cold',    // another enumeration implementation => NOT RECOMMENDED
    luckyNumber1: 'Seven',
    luckyNumber2: 9,
    any: 'This is can be any type'
} // someone

someone.tuple.push(2);       // tuple can only contain NUMBER or STRING => OK
someone.tuple.push('a');     // tuple can only contain NUMBER or STRING => OK
// someone.tuple.push(true)  // tuple can only contain NUMBER or STRING => ERROR