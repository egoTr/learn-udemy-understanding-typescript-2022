namespace ProjectManager {
    export interface IProject {
        id: string,
        title: string,
        description: string,
        noPeople: number,
        status: ProjectStatus
    }
}