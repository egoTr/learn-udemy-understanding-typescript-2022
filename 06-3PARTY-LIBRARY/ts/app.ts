import _ from 'lodash';
declare const GLOBAL: any; // to use constant GLOBAL in index.html

console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);