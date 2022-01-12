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

// Singleton class
class AppSingleton {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: AppSingleton;

    private constructor() {

    } // constructor

    static getInstance() {
        if (this.instance)
            return this.instance;

        this.instance = new AppSingleton();

        return this.instance;
    } // getInstance

    addListener(fn: Function) {
        this.listeners.push(fn);
    } // addListener

    addProject(title: string, description: string, noPeople: number) {
        const newProject = {
            id: Date.now(),
            title,
            description,
            noPeople
        } // newProject

        this.projects.push(newProject);

        for (const fn of this.listeners)
            fn( this.projects.slice() );        
    } // addProject
} // class AppSingleton

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
            Application.addProject(_title, _description, _noPeople);

            this.clearInput();
        } // if
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
} // class ProjectInput

// class ProjectList
type ProjectType = 'active' | 'finished';

class ProjectList {
    #type: ProjectType; // private
    assignedProjects: any[];

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    container: HTMLElement;

    constructor(type: ProjectType = 'active') {
        this.#type = type;
        this.assignedProjects = [];

        this.templateElement = <HTMLTemplateElement>document.getElementById('project-list');
        this.hostElement = document.getElementById('app') as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.container = importedNode.firstElementChild as HTMLElement;
        this.container.id = `${this.#type}-projects`;

        Application.addListener( (projects: any[]) => {
            this.assignedProjects = projects;
            this.populateProjects();
        })

        this.attach();
        this.renderLayout();
    } // constructor

    private populateProjects() {
        const listEl = document.getElementById(`${this.#type}-project-list`);

        for (const project of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            listEl.appendChild(listItem);
        } // for     
    } // populateProjects

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.container);
    } // attach

    private renderLayout() {
        const listId  = `${this.#type}-project-list`;
        this.container.querySelector('ul').id = listId;
        this.container.querySelector('h2').textContent = `${this.#type.toUpperCase()} PROJECTS`;
    }
} // class ProjectList

const Application = AppSingleton.getInstance(); // singleton class
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');