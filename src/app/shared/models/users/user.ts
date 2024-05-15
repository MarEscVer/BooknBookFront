import { GeneroTipo } from "../combo/combo";

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
    imagen: any;
    username: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    rol: string;
    editMode?: boolean;
}

export interface PerfilUsuarioData {
    id: number;
    imagen: any;
    username: string;
    nombre: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    seguir: boolean;
}

export interface modifyUser {
    idUsuario: number,
    rolUsuario: string,
}