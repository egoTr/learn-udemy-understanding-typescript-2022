namespace ProjectManager {
    type Listener = (items: IProject[]) => void;
    
    // Singleton class
    export class AppSingleton {
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
    
    export const Application = AppSingleton.getInstance(); // singleton class
}