import z from 'zod';

const authSchema = z.object({
    ident: z.string({required_error:'La identoficacion es obligatoria', invalid_type_error: 'La identificación debe ser una cadena de texto'}),
    nombre: z.string({required_error:'El nombre es obligatorio', invalid_type_error: 'El nombre debe ser una cadena de texto'}),
    s_nombre: z.string({ invalid_type_error: 'El segundo nombre debe ser una cadena de texto'}).optional(),
    p_ape: z.string({required_error:'El primer apellido es obligatorio', invalid_type_error: 'El primer apellido debe ser una cadena de texto'}),
    s_ape: z.string({required_error:'El segundo apellido es obligatorio', invalid_type_error: 'El segundo apellido debe ser una cadena de texto'}),
    genero: z.enum(['M', 'F'], {required_error:'El género es obligatorio', invalid_type_error: 'El género debe ser una cadena de texto'}),
    puesto: z.number({required_error:'El puesto es obligatorio', invalid_type_error: 'El puesto debe ser un número'}),
    email: z.string().email({required_error:'El correo electrónico es obligatorio', invalid_type_error: 'El correo electrónico debe ser una cadena de texto'}),
    estado: z.enum(['A', 'I'], {required_error:'El estado es obligatorio', invalid_type_error: 'El estado debe ser una cadena de texto'}),
    depto: z.number({required_error:'El departamento es obligatorio', invalid_type_error: 'El departamento debe ser un número'}),
    dir: z.number({required_error:'El dirección es obligatorio', invalid_type_error: 'El dirección debe ser un número'}),
    pais: z.number({required_error:'El país es obligatorio', invalid_type_error: 'El país debe ser un número'}).int().max(3),
    clave: z.string({required_error:'La clave es obligatoria', invalid_type_error: 'La clave debe ser una cadena de texto'}).min(8, { message: 'La clave debe contener mínimo 8 caracteres' }),
    a_cargo: z.enum(['S', 'N'], {required_error:'El cargo es obligatorio', invalid_type_error: 'El cargo debe ser una cadena de texto'}),
    jefe_id: z.string({invalid_type_error: 'El jefe debe ser una cadena de texto'}).optional(),
    fec_ingreso: z.string().date({required_error:'La fecha de ingreso es obligatoria', invalid_type_error: 'La fecha de ingreso debe ser una fecha',message:'El formato de la fehca de ingreso es: YYYY-MM-DD'}),
});

export async function validateAuth(input) {
    return authSchema.safeParse(input);
}


export async function validatePartialAuth(input) {
  return authSchema.partial().safeParse(input);
}
