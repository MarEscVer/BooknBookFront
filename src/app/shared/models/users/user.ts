export interface Login {
    email:string,
    password:string
}

export interface Register {
    email:string,
    password:string,
    name:string,
    phone:string
}

export interface UserItemList {
    id: number;
    //TODO Imagenes BLOB
    img: any;
    username: string;
    name: string;
    surname1: string;
    surname2: string;
    email: string;
    rol: string;
    editMode?: boolean; 
}