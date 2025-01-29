
export const infoReportView = async ({ user, view, model, tipo_reporte }) => {

    const handlers = {
        salida_personal: async () => {
            const tipoSalida = await model.getAllTipoSalida({});
            const motivoSalida = await model.getAllMotivoSalida({});
            const paises = await model.getAllPais({ estado: 'A' });
            const subordinados = (user.permiso === 2 || user.permiso === 3)
                ? await model.getAllSubordinados({ estado: 'A' })
                : await model.getAllSubordinados({ jefe_id: user.id, estado: 'A' });

            return {
                tipoSalida,
                motivoSalida,
                paises,
                subordinados,
                needInfo: true,
            };
        },

        traslado_personal: async () => {
            const deptos = await model.getAllDeptos();
            return { deptos, needInfo: true };
        },

        solicitud_cartas: async () => {
            const cartas = await model.getAllTipoCartas();
            return { cartas, needInfo: true };
        },

        reporte_incapacidad: async () => {
            const novedades = await model.getAllTipoNovedades({ estado: 'A' });
            return { novedades, needInfo: true };
        },

        historico: async () => {
            const historicoHandlers = {
                '1': async () => ({
                    dataHistorico: await model.getHistoricoSalidas(),
                    nombre_reporte: 'Historico de salidas',
                    needInfo: true,
                }),
                '2': async () => ({
                    dataHistorico: await model.getHistoricoVacaciones(),
                    nombre_reporte: 'Historico de vacaciones',
                    needInfo: true,
                }),
                '3': async () => ({
                    dataHistorico: await model.getHistoricoTraslados(),
                    nombre_reporte: 'Historico de traslados',
                    needInfo: true,
                }),
                '4': async () => ({
                    dataHistorico: await model.getHistoricoIncapacidades(),
                    nombre_reporte: 'Historico de Incapacidades',
                    needInfo: true,
                }),
                '5': async () => ({
                    dataHistorico: await model.getHistoricoCartas(),
                    nombre_reporte: 'Historico de cartas',
                    needInfo: true,
                }),
            };

            return historicoHandlers[tipo_reporte]
                ? await historicoHandlers[tipo_reporte]()
                : { needInfo: false };
        },
        
        colaboradores_config: async () => {
            const colaboradores = await model.getAll({});
            return { colaboradores, needInfo: true };
        }
    };

    // Ejecutar el handler correspondiente si existe
    return handlers[view] ? await handlers[view]() : { needInfo: false };
};
