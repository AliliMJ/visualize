const remarques = { bad: 'En retard', medium: 'Moyen', good: 'Bon' };

const classes = {
    bad: 'bg-red-400',
    medium: 'bg-yellow-400',
    good: 'bg-green-400',
};

export const getRemarque = (state) => {
    return remarques[state];
};

export const getClass = (state) => {
    return classes[state];
};
