/* https://www.digitalocean.com/community/tutorials/js-js-singletons
    # Singletons are used to create an instance of a class if it does not exist or else return the reference of the existing one.
      This means that singletons are created exactly once during the runtime of the application in the global scope.
    # Some applications of singletons are logger objects or configuration settings classes.
*/

class Singleton {
    name: string;
    private static instance: Singleton;

    private constructor(name: string) {
        this.name = name;
    }

    static getInstance() {
        if (Singleton.instance)
            return this.instance;

        this.instance = new Singleton('Some singleton class');

        return this.instance;
    }

    doSomething() {
        console.log('A method of singleton class');
    }
}

const singletonInstance = Singleton.getInstance();
singletonInstance.doSomething();