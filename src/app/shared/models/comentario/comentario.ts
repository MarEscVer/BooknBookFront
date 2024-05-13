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
    estado: string,
    comentariosDenunciados: ComentarioDenunciadoItemList[]
}

export interface ComentarioDenunciadoInfo {
    valoracion: string;
}

export interface ComentarioData {
    imagen: string;
    username: string;
    fechaValoracion: string;
    valoracion: number;
    comentario: string;
    idLibro: number;
}