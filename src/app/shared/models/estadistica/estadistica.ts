import { GeneroTipo } from "../combo/combo";

export interface ItemEstadistica {
    titulo: string;
    dato: number;
}

export interface ItemEstadisticaGenero {
    genero: GeneroTipo;
}

export interface EstadisticaResponse {
    estadisticas: ItemEstadistica[];
}

export interface EstadisticaGeneroResponse {
    estadisticas: ItemEstadistica[];
    genero: GeneroTipo;
}

export interface ContadorResponse {
    lectoresTotales: number;
    librosLeidos: number;
    clubesCreados: number;
    comentariosTotales: number;
}

export interface ContadorUsuarioResponse {
    paginasLeidas: number;
    librosLeidos: number;
    valoraciones: number;
    genero: GeneroTipo;
}