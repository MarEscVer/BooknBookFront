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
    imagen: string;
    username: string;
    fechaValoracion: string;
    valoracion: number;
    comentario: string;
    idLibro: number;
}

export interface ValoracionData {
    id: number;
}

export interface ComentarioResponse {
    message: string;
}