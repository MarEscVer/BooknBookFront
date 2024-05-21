import { GeneroTipo } from "../combo/combo";
import { pageInfo } from "../paginado/paginado";

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
    id: number;
    imagen: any;
    username: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    password: string;
}

export interface UserItemList {
    id: number;
    imagenUsuario: any;
    username: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    rol: string;
    editMode?: boolean;
}

export interface UserItemListResponse {
    usuarios: UserItemList[];
    pageInfo: pageInfo; 
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
    username: string,
    rol: string,
}