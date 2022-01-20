export class Product {
    title: string;
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    } // constructor

    getInformation() {
        return `${this.title} $${this.price}`;
    }
}