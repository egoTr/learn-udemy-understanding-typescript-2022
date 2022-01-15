import { Application } from '../_singleton.js';
import { ProjectBased } from './project-based.js';

export class ProjectInput extends ProjectBased<HTMLFormElement> {
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
        this.container.addEventListener('submit', this.submitHandler.bind(this));
    } // configure

    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherInput();

        if (Array.isArray(userInput)) {
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