import z from 'zod';

const reportSchema = z.object({
    tipo_salida: z.number().int().positive({required_error:'El tipo de salida es obligatorio', invalid_type_error: 'El tipo de salida debe ser un número'}),
    motivo_salida: z.number().int().positive({required_error:'El motivo de salida es obligatorio', invalid_type_error: 'El tipo de motivo de salida debe ser un número'}),
    saldo_vacaciones: z.number().int().positive({required_error:'El saldo de vacaciones es obligatorio', invalid_type_error: 'El saldo de vacaciones debe ser un número'}),
    motivo_traslado: z.number().int().positive({required_error:'El motivo de traslado es obligatorio', invalid_type_error: 'El motivo de traslado debe ser un número'}),
    depto_traslado: z.number().int().positive({required_error:'El departamento de traslado es obligatorio', invalid_type_error: 'El departamento de traslado debe ser un número'}),
    tipo_novedad: z.number().int().positive({required_error:'El tipo de novedad es obligatorio', invalid_type_error: 'El tipo de novedad debe ser un número'}),
    tipo_carta: z.number().int().positive({required_error:'El tipo de carta es obligatorio', invalid_type_error: 'El tipo de carta debe ser un número'}),
    ca_otro: z.string({invalid_type_error: 'El otro debe ser una cadena de texto'}),
    email_envio: z.string().email({required_error:'El correo electrónico es obligatorio', invalid_type_error: 'El correo electrónico debe ser una cadena de texto'}),
    detalle_reporte: z.string({required_error:'El detalle es obligatorio', invalid_type_error: 'El detalle debe ser una cadena de texto'}),
    tipo_reporte: z.number().int().positive({required_error:'El tipo de reporte es obligatorio', invalid_type_error: 'El tipo de reporte debe ser un número'}),
    pais_solicita: z.number().int().positive({required_error:'El país es obligatorio', invalid_type_error: 'El país debe ser un número'}),
    fecha_inicio: z.string().date({required_error:'La fecha de ingreso es obligatoria', invalid_type_error: 'La fecha de ingreso debe ser una fecha',message:'El formato de la fehca de ingreso es: YYYY-MM-DD'}),
    fecha_fin: z.string().date({required_error:'La fecha de ingreso es obligatoria', invalid_type_error: 'La fecha de ingreso debe ser una fecha',message:'El formato de la fehca de ingreso es: YYYY-MM-DD'}),
    fecha_envio_doc: z.string().date({invalid_type_error: 'La fecha de ingreso debe ser una fecha',message:'El formato de la fehca de ingreso es: YYYY-MM-DD'}),
    estado: z.enum(['S', 'P', 'A', 'D'], {required_error:'El estado es obligatorio', invalid_type_error: 'El estado debe ser una cadena de texto'}),
    tipo_documento: z.number().int().positive({required_error:'El tipo de documento es obligatorio', invalid_type_error: 'El tipo de documento debe ser un número'}),

});

export async function validateReport(input) {
    return reportSchema.safeParse(input);
}

export async function validatePartialReport(input) {
    return reportSchema.partial().safeParse(input);
}
