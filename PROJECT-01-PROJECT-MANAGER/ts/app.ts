import { ProjectStatus } from "./models/models.js";
import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

new ProjectInput();
new ProjectList();
new ProjectList(ProjectStatus.Finished);