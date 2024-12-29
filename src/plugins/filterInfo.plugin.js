/*
cedula subordinado
cedula jefe
tipo reporte
tipo salida
motivo salida
tipo novedad
tipo carta
pais solicitante
fecha inicio
fecha fin
area actual
area traslado
fecha envío doc
estado
fecha transacción
*/

export const getFilterInfo = async ({model}) => {
    try {
        const tipoReporte = await model.getAllTipoReporte();
        const tipoSalida = await model.getAllTipoSalida();
        const motivoSalida = await model.getAllMotivoSalida();
        const tipoNovedad = await model.getAllTipoNovedad();
        const tipoCarta = await model.getAllTipoCarta();
        const pais = await model.getAllPais();
        const areas = await model.getAllDeptos();
        const info = {
            tipoReporte,
            tipoSalida,
            motivoSalida,
            tipoNovedad,
            tipoCarta,
            pais,
            areas,
        };
        console.log(info);
        return info;
    } catch (error) {
        console.error('Error al obtener los colaboradores:', error.message);
        return { success: false, error: 'Error al obtener los colaboradores' };
    }
};