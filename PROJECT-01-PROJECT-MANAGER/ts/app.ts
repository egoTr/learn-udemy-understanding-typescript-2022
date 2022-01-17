import { ProjectStatus } from "./models/models";
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

new ProjectInput();
new ProjectList();
new ProjectList(ProjectStatus.Finished);