
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
    
    } else if (view === 'historico') {
        console.log('entro a historico')
        const historicoVacaciones = await model.getHistoricoVacaciones();
        historicoVacaciones.forEach(element => {
            if (element.documento){
            element.documento = element.documento.toString('base64');
            }
        });
        //console.log(historicoVacaciones)
        //const historicoTraslados = await model.getHistoricoTraslados();
        //const historicoSalidas = await model.getHistoricoSalidas();
        //const historicoIncapacidades = await model.getHistoricoIncapacidades();
        //const historicoCartas = await model.getHistoricoCartas();
        return {
            historicoVacaciones,
            /*
            historicoTraslados,
            historicoSalidas,
            historicoIncapacidades,
            historicoCartas,
            */
            needInfo:true
        };
    } else{
        return {
            needInfo:false
        }
    }
};