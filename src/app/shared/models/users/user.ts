export interface Login {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    rol: string;
    bearer: string;
}

export interface Register {
    email: string,
    password: string,
    name: string,
    phone: string
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