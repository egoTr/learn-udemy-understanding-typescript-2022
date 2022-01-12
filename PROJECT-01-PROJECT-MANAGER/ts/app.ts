// Auto-bind decorator ------------------------------------------- START
/* Usage:
@autobind
private submitHandler() {}
private configure() {
    this.form.addEventListener('submit', this.submitHandler);
}
*/
function autobind(target: any, method: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        } // get
    }; // adjDescriptor

    return adjDescriptor;
} // autobind
// Auto-bind decorator ------------------------------------------- END

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    form: HTMLFormElement;

    inputTitle: HTMLInputElement;
    inputDescription: HTMLInputElement;
    inputNoPeople: HTMLInputElement;

    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input');
        this.hostElement = document.getElementById('app') as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.form = importedNode.firstElementChild as HTMLFormElement;
        this.form.id = 'user-input';

        this.inputTitle = this.form.querySelector('#title');
        this.inputDescription = this.form.querySelector('#description');
        this.inputNoPeople = this.form.querySelector('#people');

        this.configure();
        this.attach();
    } // constructor

    private configure() {
        this.form.addEventListener( 'submit', this.submitHandler.bind(this) );
    } // configure

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.form);
    } // attach

    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherInput();

        if ( Array.isArray(userInput) ) {
            const [_title, _description, _noPeople] = userInput;
            console.log(_title, _description, _noPeople);
        } // if

        this.clearInput();
    } // submitHandler
    
    private gatherInput(): [string, string, number] | undefined | void { // returned as tuple/ undefined/ void
        return [
            this.inputTitle.value,
            this.inputDescription.value,
           +this.inputNoPeople.value
        ]
    } // gatherInput

    private clearInput() {
        this.inputTitle.value = '';
        this.inputDescription.value = '';
        this.inputNoPeople.value = '';
    } // clearInput
}

const projectInput = new ProjectInput();