export interface Combo {
    id: number;
    nombre: string;
}

export interface IdComboResponse {
    id: number;
    message: string;
}

export interface ComboGeneroResponse {
    genero: {
        valores: Combo[];
    };
    tipo: {
        valores: Combo[];
    };
}

export interface ComboResponse {
    valores: Combo[];
}

