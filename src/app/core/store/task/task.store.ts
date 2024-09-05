// Import the ITask interface from the task.model file
import { ITask } from "../../model/task.model";

// Define a constant for the store tag
export const storeTag: string = '[Task Store]';

// Define an interface for the TaskStore
export interface TaskStore
{
    // Define an array of ITask objects
    tasks: Array<ITask>;
    // Define a string for the filter
    filter: string;
}
