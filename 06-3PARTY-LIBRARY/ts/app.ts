import _ from 'lodash';
import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { Product } from './types/product';
declare const GLOBAL: any; // to use constant GLOBAL in index.html

console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);

/* class-transformer ----------------------------------------------- START */
const products = [
    { title: 'A Book', price: '25.00' },
    { title: 'A Knife', price: '40.50' },
]

const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts)
    console.log( prod.getInformation() );
/* class-transformer ----------------------------------------------- END */
