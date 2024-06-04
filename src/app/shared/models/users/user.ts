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
    idTipo: GeneroTipo;
    idGenero: GeneroTipo;
    password: string;
}

export interface UserItemList {
    id: number;
    imagenUsuario: any;
    username: string;
    nombre: string;
    apellidoPrimero: string;
    apellidoSegundo: string;
    email: string;
    rol: string;
    editMode?: boolean;
}

export interface UserItemListResponse {
    usuarios: UserItemList[];
    pageInfo: pageInfo;
}

export interface PerfilUsuarioData {
    imagenPerfil: any;
    username: string;
    nombre: string;
    apellidoPrimero: string;
    apellidoSegundo: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    selfPerfil: boolean;
    seguir: boolean;
}

export interface modifyUser {
    username: string,
    rol: string,
}

export interface UpdatePerfilData {
    imagenPerfil: any;
    username: string;
    nombre: string;
    apellidoUno: string;
    apellidoDos: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    email: string;
    password: string;
}