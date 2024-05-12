import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export interface AutorData {
    id: number;
    imagen: string;
    pseudonimo: string;
    localidad: string;
    biografia: string;
}

export interface AutorNombre {
    id: number;
    pseudonimo: string;
}


export interface AutorEdit {
    pseudonimo: string;
    localidad: string;
    biografia: string;
    imagen: string;
}

export interface AutorIcon {
    iconName: IconName;
    iconPrefix: IconPrefix;
}