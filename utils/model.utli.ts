

export interface User {
    id: number;
    userData: UserData;
    userTask: Task[];

}

export interface UserData {
    user_name: string;
    password?: string;
    active: boolean;
    user_type: UserTypeEnum;
    create_date: string;
    activate_date: string;
    deactivate_date: string;
    update_date: string
}


export interface Task {
    id: number
    task_name: string;
    task_date: any;
    actions: string[];
}

export enum UserTypeEnum {
    ADMIN = 'admin',
    USER = 'user'
}


