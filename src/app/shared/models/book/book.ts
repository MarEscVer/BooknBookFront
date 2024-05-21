import { AutorNombre } from "../autor/autor";
import { GeneroTipo } from "../combo/combo";
import { pageInfo } from "../paginado/paginado";

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
    imagen: any;
    titulo: string;
    autor: string;
    genero: string;
    tipo: string;
    year: number;
    saga: string;
}

export interface BookItemListResponse {
    libros: BookItemList[];
    pageInfo: pageInfo; 
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

export interface BookListadoLectura {
    id: number;
    imagen: any;
    titulo: string;
    saga: string;
    autor: string;
    descripcion:string
    tipo: GeneroTipo;
    genero: GeneroTipo;
    paginasTotales: number;
    //datos valoracion
    fechaInicio: string;
    fechaFinal: string;
    paginasLeidas: number
}
