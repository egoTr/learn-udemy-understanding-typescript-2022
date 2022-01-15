/// <reference path="models/models.ts" />
/// <reference path='components/project-input.ts' />
/// <reference path='components/project-list.ts' />

namespace ProjectManager {
    new ProjectInput();
    new ProjectList();
    new ProjectList(ProjectStatus.Finished);
}