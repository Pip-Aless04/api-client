import zod from 'zod';

const schemaTalento = zod.object({
    id: zod.number().int().positive(),
    nombre: zod.string(),
    nota: zod.number().int().min(0),
    estado: zod.enum(['A', 'I']),
    porcentaje: zod.number().int().min(0)
});

export const validateTalento = async (input) => {
    return schemaTalento.safeParse(input);
};

export const validatePartialTalento = async (input) => {
    return schemaTalento.partial().safeParse(input);
};

