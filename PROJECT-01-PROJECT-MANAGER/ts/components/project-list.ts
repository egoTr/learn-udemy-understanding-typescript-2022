import { Application } from '../_singleton.js';
import { IProject, ProjectStatus } from '../models/models.js';
import { IDragTarget } from '../models/drag-drop.js';
import { ProjectBased } from './project-based.js';
import { ProjectDetails } from './project-details.js';

export class ProjectList extends ProjectBased<HTMLElement> implements IDragTarget {
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
        const listId = `${this.type}-project-list`;
        this.container.querySelector('ul').id = listId;
        this.container.querySelector('h2').textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    private configure() {
        this.container.setAttribute('status', this.type);

        Application.addListener((projects: IProject[]) => {
            this.assignedProjects = projects.filter(p => p.status === this.type);
            this.populateProjects();
        })

        this.container.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.container.addEventListener('drop', this.dropHandler.bind(this));
        this.container.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
    }

    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
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