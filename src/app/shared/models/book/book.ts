import { AutorNombre } from "../autor/autor";
import { GeneroTipo } from "../combo/combo";

export interface Book {
    id: number;
    imagen: any;
    titulo: string;
    autor: AutorNombre;
    tipo: GeneroTipo;
    genero: GeneroTipo;
    fechaPublicacion: string;
    paginasTotales: number;
    valoracionMedia: number;
    estado: string;
    saga: string;
    descripcion: string;
}

export interface BookItemList {
    id: number;
    img: any;
    title: string;
    author: string;
    tipe: string;
    gender: string;
    year: number;
}

export interface BookItemCard {
    id: number;
    imagen: any;
    titulo: string;
    autor: string;
    saga: string;
}

export interface BookData {
    fechaPublicacion: string;
    nombre: string;
    paginas: number;
    idAutor: number;
    genero: number;
    tipo: number;
    saga: number;
    newSagaName: string;
    descripcion: string;
}

export interface BookEdit{
    imagen: string;
    fechaPublicacion: string;
    nombre: string;
    paginas: number;
    idAutor: number;
    genero: number;
    tipo: number;
    saga: number;
    newSagaName: string;
    descripcion: string;
}
