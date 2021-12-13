import { diasSemana,signoSeparacion } from '../utils/diasSemana';

var dias=diasSemana;

export const comprobarCoincidenciaHorario = (datosTrabajadores:string[]) => {
    for (let recorreArregloInicio = 0; recorreArregloInicio < datosTrabajadores.length; recorreArregloInicio++) {
        for (let recorreArregloFinal = datosTrabajadores.length - 1; recorreArregloFinal > recorreArregloInicio ; recorreArregloFinal--) {
            verficaHorariosCoincidenciaTrabajadores(datosTrabajadores[recorreArregloInicio].replace(/['"]+/g, ''),datosTrabajadores[recorreArregloFinal].replace(/['"]+/g, ''))
        }
    }
    
    //comparamos la información de dos trabajadores y las conicidencias en días y horas
    function verficaHorariosCoincidenciaTrabajadores(primerTrabajador:string, segundoTrabajador:string) {
        const [trabajadorUno, horarioTrabajadorUno] = primerTrabajador.split(signoSeparacion.igualdad)
        const [trabajadorDos, horarioTrabajadorDOs] = segundoTrabajador.split(signoSeparacion.igualdad)
        
        const horasEmpleado1 = horarioTrabajadorUno.split(signoSeparacion.coma)
        const horasEmpleado2 = horarioTrabajadorDOs.split(signoSeparacion.coma)
    
        var contador = 0;
        dias.forEach(e=>{
            horasEmpleado1.forEach(diaEmpleado =>{
    
                if(e == diaEmpleado.substr(0,2)){
                    horasEmpleado2.forEach(diaEmpleado2 => {
                        if(e == diaEmpleado2.substr(0,2))
                        {
                            const [horaEntradaE1,horaSalidaE1] = diaEmpleado.substr(2).split(signoSeparacion.guion)
                            const [horaEntradaE2,horaSalidaE2] = diaEmpleado2.substr(2).split(signoSeparacion.guion)
                            rangoHoras(horaEntradaE1,horaSalidaE1,horaEntradaE2,horaSalidaE2)   && contador++
                        }
                    });
                }
            })        
            
        })
        console.log(trabajadorUno.trim() +'-'+ trabajadorDos.trim()+ '--->'+ contador);
    }

    // realizamos las validaciones de las conicidencias en los horarios de los trabajadores
    function rangoHoras(horaEntradaE1:string,horaSalidaE1:string,horaEntradaE2:string,horaSalidaE2:string):number {
    
        var [horaEntradaTrabajadorUno,minutosEntradaTrabajadorUno]:string[]|number[] = horaEntradaE1.split(signoSeparacion.dos_puntos)
        var [horaSalidaTrabajadorUno,minutosSalidaTrabajadorUno]:string[]|number[] = horaSalidaE1.split(signoSeparacion.dos_puntos)
        var [horaEntradaTrabajadorDos,minutosEntradaTrabajadorDos]:string[]|number[] = horaEntradaE2.split(signoSeparacion.dos_puntos)
        var [horaSalidaTrabajadorDos,minutosSalidaTrabajadorDos]:string[]|number[] = horaSalidaE2.split(signoSeparacion.dos_puntos)
    
    
        horaEntradaTrabajadorUno=parseInt(horaEntradaTrabajadorUno)*60 *60 + parseInt(minutosEntradaTrabajadorUno)*60;
        horaSalidaTrabajadorUno=parseInt(horaSalidaTrabajadorUno)*60 *60 + parseInt(minutosSalidaTrabajadorUno)*60;
        horaEntradaTrabajadorDos=parseInt(horaEntradaTrabajadorDos)*60 *60 + parseInt(minutosEntradaTrabajadorDos)*60;
        horaSalidaTrabajadorDos=parseInt(horaSalidaTrabajadorDos)*60 *60 + parseInt(minutosSalidaTrabajadorDos)*60;
        
       
        if(( horaEntradaTrabajadorUno >= horaEntradaTrabajadorDos && horaEntradaTrabajadorUno <= horaSalidaTrabajadorDos ) ){
            return 1
        }
    
    
        if(( horaEntradaTrabajadorDos >= horaEntradaTrabajadorUno && horaEntradaTrabajadorDos <= horaSalidaTrabajadorUno ) ){
            return 1
        }
    
        if((horaSalidaTrabajadorUno >= horaSalidaTrabajadorDos && horaSalidaTrabajadorUno >= horaEntradaTrabajadorDos ) ){
            return 1
        }

        if((horaSalidaTrabajadorDos >= horaEntradaTrabajadorUno && horaSalidaTrabajadorUno >= horaSalidaTrabajadorDos ) ){
            return 1
        }

        return 0
    }
}