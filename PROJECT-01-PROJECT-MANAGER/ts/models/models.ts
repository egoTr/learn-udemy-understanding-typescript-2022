export enum ProjectStatus { Active = "active", Finished = "finished" };

export interface IProject {
    id: string,
    title: string,
    description: string,
    noPeople: number,
    status: ProjectStatus
}