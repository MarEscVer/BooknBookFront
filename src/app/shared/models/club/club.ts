import { GeneroTipo } from "../combo/combo";
import { pageInfo } from "../paginado/paginado";

export interface ClubItemList {
    id: number;
    imagen: any;
    nombre: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    miembros: number;
    descripcion: string;
    perteneces: boolean;
}

export interface ClubItemListResponse {
    listGroup: ClubItemList[];
    pageInfo: pageInfo; 
}

export interface ClubShortListResponse {
    nombreGrupos: ClubDataShort[];
    pageInfo: pageInfo; 
}

export interface ClubEdit {
    img: any;
    name: string;
    tipe: string;
    gender: string;
    descripcion: string;
}

export interface ClubData {
    name: string;
    tipe: string;
    gender: string;
    descripcion: string;
}

export interface ClubDataAll {
    id: number;
    imagen: any;
    nombre: string;
    descripcion: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    miembros: number;
    perteneces: boolean;
}

export interface ClubDataShort {
    idGrupo: number;
    imagen: any;
    nombreGrupo: string;
    administrador: boolean;
}