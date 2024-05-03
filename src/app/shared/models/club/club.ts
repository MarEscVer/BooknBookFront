export interface ClubItemList {
    id: number;
    //TODO Imagenes BLOB
    img: any;
    name: string;
    tipe: string;
    gender: string;
    users: number;
}

export interface ClubEdit {
    img: any;
    name: string;
    tipe: string;
    gender: string;
    descripcion: string;
}

export interface ClubData {
    name: string;
    tipe: string;
    gender: string;
    descripcion: string;
}