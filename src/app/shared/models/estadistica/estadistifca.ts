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