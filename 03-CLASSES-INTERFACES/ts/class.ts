// class Department ----------------------------------------------------- START
class Department {
    static Introduction = 'I am class Department'; // static property, which can be accessed without an instance

    description: string = '';           // public property - default access level (no need to specify the 'public' keyword)
    protected employees: string[] = []; // protected property, which can be accessed within this class and inheriting classes
    private privateInfo: any;           // private property (which can only be accessed within this class) with 'private' access modifier 
    #anotherPrivateInfo: any;           // private property with '#' symbol 
    readonly readOnlyInfo: any;         // read-only property with 'readonly' access modifier 

    // Constructor with shorthands to declare public read-only 'id' and public 'name'
    constructor(readonly id: string, public name: string) {
        this.id = id;
        this.name = name;
    }

    // static method
    // which can be executed without an instance
    static sayHello() {
        console.log('Hello World !!!');
    }

    addEmployees(...employees_: string[]): void {
        this.employees.push(...employees_);
    }

    showEmployees(): void {
        console.log(`Employees of department ${this.name}:`);
        this.employees.forEach( (employee, index) => {
            console.log(`${index + 1} ${employee}`);
        })
    } // showEmployees
} // class Department

Department.sayHello();                // Hello World !!!
console.log(Department.Introduction); // I am class Department

const deptAccounting = new Department('d1', 'Accounting');
deptAccounting.addEmployees('Mary', 'John');
deptAccounting.showEmployees();
// class Department ----------------------------------------------------- END

// class DepartmentIT --------------------------------------------------- START
class DepartmentIT extends Department {
    admins: string[];
    public audits: string[];
    private lastAudit;

    constructor(id: string, admins: string[] = []) {
        super(id, 'IT');
        this.admins = admins;
    }
 
    // Overriding implementation of addEmployees() which works with the 'employees' protected property
    // This method does not add employees with name in admins
    addEmployees(...employees_: string[]): void {
        const _employeesToAdd = employees_.filter(emp => this.admins.indexOf(emp) === -1);
        this.employees.push(..._employeesToAdd);
    }

    showAdmins(): void {
        console.log(`Admins of department ${this.name}:`);
        this.admins.forEach( (admin, index) => {
            console.log(`${index + 1} ${admin}`);
        })
    } // showAdmins

    // Overriding implementation of showEmployees()
    showEmployees(toIncludeAdmins = false): void {
        const _employeesToShow = toIncludeAdmins ? [...this.admins, ...this.employees] : this.employees;

        console.log(`Employees of department ${this.name}` + `${toIncludeAdmins ? ' (include Admins):' : ':'}`);
        _employeesToShow.forEach( (employee, index) => {
            console.log(`${index + 1} ${employee}`);
        })
    } // showEmployees

    addAudit(audit: string) {
        this.audits.push(audit);
        this.lastAudit = audit;
    }

    // getter method
    get getLastAudit() {
        if (this.lastAudit)
            return {
                success: true,
                data: this.lastAudit
            }
        else
            return {
                success: false,
            }
    } // getLastAudit

    // setter method
    set setLastAudit(audit: string) {
        if (audit)
            this.addAudit(audit);
    } // setLastAudit
} // class DepartmentIT

const deptIT = new DepartmentIT('d2', ['Ego', 'Thnox']);
deptIT.addEmployees('Max', 'Ana', 'Ego');               // 'Ego' will not be added
deptIT.addEmployees('John', 'Thnox', 'Peter', 'Daisy'); // 'Thnox' will not be added
deptIT.showAdmins();        // 2 emps: Ego, Thnox
deptIT.showEmployees();     // 5 emps
deptIT.showEmployees(true); // 7 emps
// class DepartmentIT --------------------------------------------------- END