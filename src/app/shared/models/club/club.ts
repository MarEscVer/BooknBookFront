import { GeneroTipo } from "../combo/combo";

export interface ClubItemList {
    id: number;
    imagen: any;
    nombre: string;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    miembros: number;
}

export interface ClubItemListResponse {
    listGroup: ClubItemList[];
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
    id: number;
    imagen: any;
    nombre: string;
    administrador: boolean;
}