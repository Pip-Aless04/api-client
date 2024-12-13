
export const infoReportView = async ({view, model}) => {

    if (view === 'salida_personal') {
        const tipoSalida =  await model.getAllTipoSalida({});
        const motivoSalida = await model.getAllMotivoSalida({});
        
        return {
            tipoSalida,
            motivoSalida,
            needInfo:true
        };
    } else if (view === 'traslado_personal') {
        const deptos = await model.getAllDeptos();
        return {
            deptos,
            needInfo:true
        };
    } else if (view === 'solicitud_cartas') {
        const cartas = await model.getAllTipoCartas();
        console.log(cartas)
        return {
            cartas,
            needInfo:true
        };
    } else if (view === 'reporte_incapacidad') {
        const novedades =  await model.getAllTipoNovedades({estado:'A'});
        return {
            novedades,
            needInfo:true
        };
    } else{
        return {
            needInfo:false
        }
    }
};