/* References
    🔗 https://mariusschulz.com/blog/the-unknown-type-in-typescript
*/

let varAny: any;
let varUnknown: unknown;

/* Similarity -------------------------------------------------------------------- START */
// All types are assignable to 'any'
varAny = 1;
varAny = true;
varAny = 'any';

// Just like 'any', all types are assignable to 'unknown'
varUnknown = 2;
varUnknown = false;
varUnknown = 'unknown';
varUnknown = [1, 2];
/* Similarity -------------------------------------------------------------------- END */

/* Difference #1 ----------------------------------------------------------------- START */
// All operations of 'any' are type-correct
varAny.toString();  // OK
varAny();           // OK
varAny.trim();      // OK
varAny.what.ever;   // OK

// Most operation of 'unknown' are NOT type-correct
// varUnknown.toString();  // Error
// varUnknown();           // Error
// varUnknown.trim();      // Error
// varUnknown.what.ever;   // Error
/* Difference #1 ----------------------------------------------------------------- END */

/* Difference #2 ----------------------------------------------------------------- START */
// The 'any' type is assignable to the all types
let varAny2: any = varAny;
let varUnknown2: unknown = varAny;
let varNum1: number = varAny;
let varArr1: string[] = varAny;

// The 'unknown' type is only assignable to the 'any' type and the 'unknown' type itself
let varAny3: any = varUnknown;
let varUnknown3: unknown = varUnknown;
// let varNum2: number[] = varUnknown;   // Error
// let varArr2: string = varUnknown;     // Error
/* Difference #2 ----------------------------------------------------------------- END */