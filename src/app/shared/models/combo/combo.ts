export interface Combo {
    id: number;
    nombre: string;
}

export interface ComboImagen {
    id: number;
    nombre: string;
    imagen: any;
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

export interface GeneroTipo {
    id: number;
    nombre: string;
    color: string;
}


// Definición de los colores según el mapeo deseado
type ColoresTipo = {
    [key: string]: string;
};

type ColoresGenero = {
    [key: string]: string;
};

const coloresTipo: ColoresTipo = {
    "FICCIÓN": "#C5ECD4",
    "NO FICCIÓN": "#C5D2EC",
    "JUVENIL": "#FFC8F9",
    "INFANTIL": "#ECCEC5"
};

const coloresGenero: ColoresGenero = {
    "ROMÁNTICA": "#FD9D9D",
    "TERROR": "#DA9F9F",
    "NEGRA": "#C5C5C5",
    "HUMOR": "#CFFFBE",
    "HISTÓRICA": "#FFE8AE",
    "FANTÁSTICA": "#D6B7FF",
    "CIENCIA FICCIÓN": "#C2F4FF"
};

// Función para asignar colores basados en tipo y género
export function applyColors<T extends { tipo: GeneroTipo; genero: GeneroTipo }>(data: T[]): T[] {
    return data.map(item => {
        const tipoColor = item.tipo ? coloresTipo[item.tipo.nombre] || item.tipo.color : null;
        const generoColor = item.genero ? coloresGenero[item.genero.nombre] || item.genero.color : null;
        return {
            ...item,
            tipo: {
                ...item.tipo,
                color: tipoColor
            },
            genero: {
                ...item.genero,
                color: generoColor
            }
        };
    });
}
