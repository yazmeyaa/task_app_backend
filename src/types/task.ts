export enum TaskStatusEnum {
    PENDING = "PENDING",
    IN_WORK = "IN_WORK",
    COMPLATED = "COMPLETED",
    ARCHIVED = "ARCHIVED"
}

export interface TaskInterface {
    id: string
    userID: string
    title: string
    description: string
    status: TaskStatusEnum
    createdAt: string
    taskEndsAt?: string
}