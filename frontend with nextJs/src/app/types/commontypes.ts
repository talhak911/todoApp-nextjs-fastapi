export type UserType ={
    id:number,
    username:string
}
export type TodoType={
    id?: number
    title: string
    description: string
    is_completed: boolean
    user_id: number
    added_by:string
}