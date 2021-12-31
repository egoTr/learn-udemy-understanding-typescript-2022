class DataStorage<T extends number | string | Date> { // Generic constraint with 'extends' keyword
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        const foundIndex = this.data.indexOf(item);
        if (foundIndex === -1)
            return;

        return this.data.slice(foundIndex, 1);
    }

    get items() {
        return [...this.data];
    }

    set items(items: T[]) {
        this.data.push(...items);
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('John');
// textStorage.addItem(2); // Error