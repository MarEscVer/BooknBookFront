import { Combo, GeneroTipo } from "../combo/combo";

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
    genero: Combo;
}

export interface EstadisticaCalendarioResponse {
    anyos: number[];
    estadisticaPorAnio: Map<string, ItemCalendarioResponse[]>;
}

export interface ItemCalendarioResponse {
    year: number;
    month: number;
    day: number;
    paginasLeidas: number;
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

export interface DiaData {
    x: number;
    y: number;
}

export interface MesData {
    name: string;
    data: DiaData[];
}
