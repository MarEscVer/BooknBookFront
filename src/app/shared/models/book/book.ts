import { AutorNombre } from "../autor/autor";
import { GeneroTipo } from "../combo/combo";
import { pageInfo } from "../paginado/paginado";

export interface Book {
    id: number,
    titulo: string,
    saga: string,
    idAutor: number,
    autor: string,
    imagen: any,
    paginasTotales: number,
    anyo: string,
    calificacionMedia: number,
    genero: GeneroTipo,
    tipo: GeneroTipo,
    descripcion: string,
    estado: string,
    contadorComentario: number,
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

export interface BookImageListResponse {
    filterName: string;
    libros: BookItemCard[];
    pageInfo: pageInfo;
}

export interface BookListResponse {
    libros: BookItemCard[];
}

export interface BookCardDataListResponse {
    libros: BookItemCard[];
    pageInfo: pageInfo;
}

export interface BookItemCardApi {
    id: number;
    nombre: string;
    fechaPublicacion: string;
    fotoLibro: any;
    saga: string;
    paginasLibro: number;
    valoracion: number;
}

export interface BookCardDataListResponseApi {
    libros: BookItemCardApi[];
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
    autor: number;
    genero: number;
    tipo: number;
    saga: number;
    newSagaName: string;
    descripcion: string;
}

export interface BookDataId {
    id: number;
    fechaPublicacion: string;
    nombre: string;
    paginas: number;
    autor: number;
    genero: number;
    tipo: number;
    saga: number;
    descripcion: string;
}

export interface BookEdit {
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
    descripcion: string
    tipo: GeneroTipo;
    genero: GeneroTipo;
    paginasTotales: number;
    //datos valoracion
    fechaLectura: string;
    paginasLeidas: number
}

export interface BookListadoLecturaResponse {
    libros: BookListadoLectura[];
    pageInfo: pageInfo;
}