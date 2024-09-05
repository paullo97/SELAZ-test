export const storeTag: string = '[Task Store]';

export interface TaskStore
{
    tasks: Array<any>;
    filter: string;
}
