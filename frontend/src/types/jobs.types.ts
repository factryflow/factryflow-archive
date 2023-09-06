
export interface GetAllJobType {
    id: Number;
    name: string;
    priority: Number;
    due_date: Date;
    customer: string;
    description: string;
    note:string
    planned_start: Date,
    planned_end: Date,
    is_active: boolean,
    is_deleted: boolean
    
}


