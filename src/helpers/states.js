const remarques = { bad: 'En retard', medium: 'Moyen', good: 'Bon' };

export const getRemarque = (degree) => {
    if (degree < -50) return 'En retard';
    if (degree >= -50 && degree < 0) return 'Légerement en retard';
    if (degree >= 0 && degree < 50) return 'Moyen';
    return 'Avancé';
};

export const getClass = (degree) => {
    return {
        'bg-red-400': degree < -50,
        'bg-yellow-500': degree >= -50 && degree < 0,
        'bg-yellow-300': degree >= 0 && degree < 50,
        'bg-green-400': degree >= 50,
    };
};

export const getStateColor = (degree) => {
    return {
        red: degree < -50,
        orange: degree >= -50 && degree < 0,
        yellow: degree >= 0 && degree < 50,
        green: degree >= 50,
    };
};

export function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
