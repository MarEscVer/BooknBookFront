export interface BookItemList {
    id: number;
    //TODO Imagenes BLOB
    img: any;
    title: string;
    author: string;
    tipe: string;
    gender: string;
    year: number;
}

//TODO Imagenes
export interface BookData {
    fechaPublicacion: string; // Formato
    nombre: string;
    paginas: number;
    idAutor: number;
    genero: number;
    tipo: number;
    saga: number;
    newSagaName: string;
    descripcion: string;
}
