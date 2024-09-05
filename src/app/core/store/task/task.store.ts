import { ITask } from "../../model/task.model";

export const storeTag: string = '[Task Store]';

export interface TaskStore
{
    tasks: Array<ITask>;
    filter: string;
}
