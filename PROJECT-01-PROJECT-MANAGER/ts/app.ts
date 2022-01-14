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

enum ProjectStatus { Active = "active", Finished = "finished" };

// Drag & Drop interfaces ---------------------------------------- START
interface IDraggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
} // IDraggable

interface IDragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
} // IDragTarget
// Drag & Drop interfaces ---------------------------------------- END

interface IProject {
    id: string,
    title: string,
    description: string,
    noPeople: number,
    status: ProjectStatus
}

type Listener = (items: IProject[]) => void;

// Singleton class
class AppSingleton {
    private listeners: Listener[] = [];
    #projects: IProject[] = [];
    private static instance: AppSingleton;

    private constructor() {

    } // constructor

    static getInstance() {
        if (this.instance)
            return this.instance;

        this.instance = new AppSingleton();

        return this.instance;
    } // getInstance

    addListener(fn: Listener) {
        this.listeners.push(fn);
    } // addListener

    updateListeners() {
        for (const fn of this.listeners)
            fn( this.#projects.slice() );
    } // updateListeners

    addProject(title: string, description: string, noPeople: number) {
        const newProject: IProject = {
            id: `${this.#projects.length + 1}`,
            title,
            description,
            noPeople,
            status: ProjectStatus.Active
        } // newProject

        this.#projects.push(newProject);

        this.updateListeners();        
    } // addProject

    moveProject(id: string, newStatus: ProjectStatus) {
       const project =  this.#projects.find(p => p.id === id);

       if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
       } // if
    } // moveProject

    get projects() {
        return this.#projects;
    }
} // class AppSingleton

// Based Class
// 'abstract' ensures it is NOT allowed to initialize an instance
abstract class ProjectBased<T extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    container: T;

    constructor(
        templateId: string,
        hostId: string,
        insertPosition: InsertPosition,
        containerId?: string
        ) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId) as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.container = importedNode.firstElementChild as T;
        this.container.id = containerId;

        this.attach(insertPosition);
    } // constructor

    private attach(insertPosition: InsertPosition) {
        this.hostElement.insertAdjacentElement(insertPosition, this.container);
    }
} // class ProjectBased

class ProjectInput extends ProjectBased<HTMLFormElement> {
    inputTitle: HTMLInputElement;
    inputDescription: HTMLInputElement;
    inputNoPeople: HTMLInputElement;

    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        
        this.inputTitle = this.container.querySelector('#title');
        this.inputDescription = this.container.querySelector('#description');
        this.inputNoPeople = this.container.querySelector('#people');

        this.configure();
    } // constructor

    private configure() {
        this.container.addEventListener( 'submit', this.submitHandler.bind(this) );
    } // configure

    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherInput();

        if ( Array.isArray(userInput) ) {
            const [_title, _description, _noPeople] = userInput;
            Application.addProject(_title, _description, _noPeople);

            this.clearInput();

            this.inputTitle.focus();
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

class ProjectList extends ProjectBased<HTMLElement> implements IDragTarget {
    assignedProjects: IProject[] = [];

    constructor(private type: ProjectStatus = ProjectStatus.Active) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);

        this.configure();
        this.renderLayout();
    } // constructor

    private populateProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`);

        // Clear all existing content
        listEl.innerHTML = '';

        for (const p of this.assignedProjects)
            new ProjectDetails(this.container.querySelector('ul').id, p)
    } // populateProjects

    private renderLayout() {
        const listId  = `${this.type}-project-list`;
        this.container.querySelector('ul').id = listId;
        this.container.querySelector('h2').textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    private configure() {
        this.container.setAttribute('status', this.type);

        Application.addListener( (projects: IProject[]) => {
            this.assignedProjects = projects.filter(p => p.status === this.type);
            this.populateProjects();
        })

        this.container.addEventListener( 'dragover', this.dragOverHandler.bind(this) );
        this.container.addEventListener( 'drop', this.dropHandler.bind(this) );
        this.container.addEventListener( 'dragleave', this.dragLeaveHandler.bind(this) );
    }

    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain')
        {
            event.preventDefault(); // prevent 'drop' event fired

            const listEl = this.container.querySelector('ul');
            listEl.classList.add('droppable');
        } // if
    } // dragOverHandler

    dropHandler(event: DragEvent) {
        const id = event.dataTransfer.getData('text/plain');
        Application.moveProject(id, this.type);

        const listEl = this.container.querySelector('ul');
        listEl.classList.remove('droppable');
    }

    dragLeaveHandler(event: DragEvent) {
        const listEl = this.container.querySelector('ul');
        listEl.classList.remove('droppable');
    }
} // class ProjectList

class ProjectDetails extends ProjectBased<HTMLUListElement> implements IDraggable {
    private project: IProject;

    get noPeopleAssigned() {
        return `${this.project.noPeople} people assigned`;
    }

    constructor(hostId: string, project: IProject) {
        super('project-details', hostId, 'beforeend', project.id);
        this.project = project;

        this.configure();
        this.render();
    }

    private configure() {
        this.container.addEventListener( 'dragstart', this.dragStartHandler.bind(this) );
        this.container.addEventListener( 'dragend', this.dragEndHandler.bind(this) );
    }

    private render() {
        this.container.querySelector('h2').textContent = this.project.title;
        this.container.querySelector('h3').textContent = this.noPeopleAssigned;
        this.container.querySelector('p').textContent = this.project.description;
    }

    dragStartHandler(event: DragEvent): void {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent): void {
    }
} // ProjectDetailss

const Application = AppSingleton.getInstance(); // singleton class

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList();
const finishedProjectList = new ProjectList(ProjectStatus.Finished);