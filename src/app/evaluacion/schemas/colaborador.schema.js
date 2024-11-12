import z from 'zod';
/*x:z.string({invalid_type_error:""})*/ 
const colaboradorSchema = z.object({
    ident:z.string().max(30),
    nombre: z.string({
        invalid_type_error:'El nombre debe de ser una cedena de texto',
        required_error:'El nombre es requerido'
    }),
    p_ape: z.string({
        invalid_type_error:'El apellido debe de ser una cedena de texto',
        required_error:'El apellido es requerido'
    }),
    s_ape: z.string({
        invalid_type_error:'El apellido debe de ser una cedena de texto',
        required_error:'El apellido es requerido'
    }),
    genero: z.enum(['M', 'F']),
    puesto: z.number().int().positive().max(500, { message: 'Puesto no registrdo' }),
    email: z.string().email({ message: 'El correo electrónico debe ser válido' }),
    estado: z.enum(['A', 'I']),
    depto: z.number().int().positive().max(500,{ message: 'El departamento no está registrado' }),
    dir: z.number().int().positive().max(500,{ message: 'La dirección no está registrado' }),
    pais: z.number().int().positive().max(3,{ message: 'El país no está registrado' }),
    clave: z.string().min(8, { message: 'La clave debe contener mínimo 8 caracteres' }),
    a_cargo: z.enum(['si', 'no']),
    jefe_id: z.string().optional(),
    fec_ingreso: z.string().date({ message: 'La fecha de ingreso debe ser una fecha válida en formato YYYY-MM-DD' }),
    resp: z.enum(['0', '1'])
});


export async function validateColaborador(input){
    return colaboradorSchema.safeParseAsync(input)
}

export async function validatePartialColaborador(input){
    return colaboradorSchema.partial().safeParseAsync(input)
}