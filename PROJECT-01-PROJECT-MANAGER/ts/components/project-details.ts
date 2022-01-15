import { IProject } from '../models/models.js';
import { IDraggable } from '../models/drag-drop.js';
import { ProjectBased } from './project-based.js';

export class ProjectDetails extends ProjectBased<HTMLUListElement> implements IDraggable {
    private project: IProject;

    get noPeopleAssigned() {
        return `${this.project.noPeople} people assigned`;
    }

    get description() {
        if (this.project.description && this.project.description.trim().length > 0)
            return this.project.description;
        return "No description.";
    }

    constructor(hostId: string, project: IProject) {
        super('project-details', hostId, 'beforeend', project.id);
        this.project = project;

        this.configure();
        this.render();
    }

    private configure() {
        this.container.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.container.addEventListener('dragend', this.dragEndHandler.bind(this));
    }

    private render() {
        this.container.querySelector('h2').textContent = this.project.title;
        this.container.querySelector('h3').textContent = this.noPeopleAssigned;
        this.container.querySelector('p').textContent = this.description;
    }

    dragStartHandler(event: DragEvent): void {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent): void {
    }
} // ProjectDetails