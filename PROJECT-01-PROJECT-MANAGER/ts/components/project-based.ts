// Based Class
// 'abstract' ensures it is NOT allowed to initialize an instance
export abstract class ProjectBased<T extends HTMLElement> {
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