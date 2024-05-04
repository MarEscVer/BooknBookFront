export interface Combo {
    id: number;
    nombre: string;
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
