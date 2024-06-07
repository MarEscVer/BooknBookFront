import { pageInfo } from "../paginado/paginado";

export interface ComentarioDenunciadoItemList {
    idDenuncia: number;
    idValoracionLibro: number;
    idValoracionUsuario: number;
    nombreUsuario: string;
    fechaDenuncia: string;
    comentario: string;
    motivo: string;
}

export interface ComentarioDenunciadoResponse {
    estado: string;
    comentariosDenunciados: ComentarioDenunciadoItemList[];
    pageInfo: pageInfo; 
}

export interface ComentarioData {
    imagenUsuario: string;
    username: string;
    fechaComentario: string;
    valoracion: number;
    comentario: string;
    valoracionIdLibro: number;
    valoracionIdUsuario: number;
    estaDenunciado: boolean;
}

export interface ComentarioDataResponse {
    valoraciones: ComentarioData[];
}

export interface ComentarioDataPaginadorResponse {
    valoraciones: ComentarioData[];
    pageInfo: pageInfo; 
}

export interface ValoracionData {
    id: number;
}

export interface ComentarioResponse {
    message: string;
}

export interface DenunciarComentario {
    motivo: string;
    texto: string;
    idLibro: number;
    idUsuario: number;
    grupo: boolean;
}

export interface ValoracionResponse {
    estado: string;
    paginaActual: number | null;
    calificacionPersonal: number | null;
    comentario: string | null;
    fechaComentario: string | null;
    fechaLectura: string | null;
    idLibro: number;
}