import {PriorityTypes} from "./filter-reducer";

export const TASK_LIST_ID1 = '1'
export const TASK_LIST_ID2 = '2'
export const TASK_LIST_ID3 = '3'
export const TASK_LIST_ID4 = '4'
export const TASK_LIST_ID5 = '5'

export type TaskListType = {
    id: string
    title: string
    description: string
    isDone: boolean
    priority: PriorityTypes
}

const initState: Array<TaskListType> = [
    {
        id: TASK_LIST_ID1,
        title: 'Learn React',
        description: 'learn how to React work',
        isDone: true,
        priority: 'High',

    },
    {
        id: TASK_LIST_ID2,
        title: 'Redux',
        description: 'learn how to Redux work. How to create actions and how to use dispatch',
        isDone: false,
        priority: 'High',
    },
    {
        id: TASK_LIST_ID3,
        title: 'HTML / CSS',
        description: 'learn how to make adaptive and responsive design',
        isDone: true,
        priority: 'Low',
    },
    {
        id: TASK_LIST_ID4,
        title: 'Books for Development',
        description: 'Books for reading and improving skills',
        isDone: false,
        priority: 'Medium',
    },
    {
        id: TASK_LIST_ID5,
        title: 'YouTube',
        description: 'Helpful YouTube channels with useful information',
        isDone: false,
        priority: 'Low',
    }

]
export const tasksListsReducer = (state: Array<TaskListType> = initState, action: ActionsType): Array<TaskListType> => {
    switch (action.type) {
        case CHANGE_TASKS_LIST_STATUS:
            return state.map(tl => tl.id === action.payload.taskListId
                ? {...tl, isDone: action.payload.newStatus}
                : tl)
        case REMOVE_TASKS_LIST:
            return state.filter(tl => tl.id !== action.payload.id)
    }
    return state
}

export type RemoveTasksListActionType = ReturnType<typeof removeTasksListAC>
type ActionsType = ReturnType<typeof changeTasksListStatusAC>
    | RemoveTasksListActionType


const CHANGE_TASKS_LIST_STATUS = 'CHANGE_TASKS_LIST_STATUS'
export const REMOVE_TASKS_LIST = 'REMOVE_TASKS_LIST'
export const changeTasksListStatusAC = (newStatus: boolean, taskListId: string) => {
    return {
        type: CHANGE_TASKS_LIST_STATUS,
        payload: {
            newStatus,
            taskListId
        }
    } as const
}

export const removeTasksListAC = (id: string) => {
    return {
        type: REMOVE_TASKS_LIST,
        payload: {
            id
        }
    } as const
}