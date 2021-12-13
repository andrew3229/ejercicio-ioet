import { diasSemana, signoSeparacion } from '../utils/diasSemana';
import { lectorArchivoTxt } from "./lectorArchivoTxt";

enum validaInformacionArchivoTxt{
    archivoNoEncontrado,
    archivoVacio = '',
}
const informacion = lectorArchivoTxt()
const dias = diasSemana;

export class Validador{
    private informacion:string|string[];
    private arregloArchivoRecibido:any;

    constructor(informacion:string|string[]){
        this.informacion = informacion
        this.arregloArchivoRecibido = informacion;
    }

    validadorArchivo () {
        this.arregloArchivoRecibido = this.arregloArchivoRecibido.trim(signoSeparacion.vacio)
        this.arregloArchivoRecibido = this.arregloArchivoRecibido.split(signoSeparacion.retorno)

        if(this.arregloArchivoRecibido== validaInformacionArchivoTxt.archivoNoEncontrado)
            throw('El archivo no se encuentra en la ruta especificada')

        if(this.arregloArchivoRecibido== validaInformacionArchivoTxt.archivoVacio)
            throw('El archivo ingresado no cuenta con información')
        
            
        // creamos un nuevo arreglo para almacenar la información sin salto de lineas del archivo .txt
        var arregloCorrecto:any = []
        
        //recorremos el archivo linea por linea e iniciamos las comprobaciones
        var comprobanteValidadorFecha = 0
        this.arregloArchivoRecibido.forEach((lineaRecorridaArchivoTxt:string) => {
            comprobanteValidadorFecha = 0
            if(lineaRecorridaArchivoTxt!= signoSeparacion.salto_linea){
                const lineaArchivoTxt = lineaRecorridaArchivoTxt.replace(/['"]+/g, '');
            
                if(!this.validaEstructuraIgualdad(lineaArchivoTxt)){
                    
                    const [empleado,diasSemanales] = lineaArchivoTxt.split(signoSeparacion.igualdad)
                    const horas = diasSemanales.split(signoSeparacion.coma)

                    horas.forEach(diaEnOficina => {
                        if(this.validaDiasTrabajados(empleado,diaEnOficina) == 1)
                            comprobanteValidadorFecha += 1
                    });
                    
                    comprobanteValidadorFecha != 0 
                    ? console.log(`------------- Error en trabajador ${empleado.trim()} -------------`)
                    :arregloCorrecto.push(lineaArchivoTxt.replace(signoSeparacion.salto_linea, signoSeparacion.vacio));
                }
            }
        });

        return this.almacenaArregloCorrecto(comprobanteValidadorFecha,arregloCorrecto)
    }
    
    //verificamos contar con maximo 1 signo de igualdad, caso contrario presenta el mensaje
    validaEstructuraIgualdad(d:string):string{
        if((d.split('=').length-1) !== 1){
            console.log(`La estructura ${d.trim()} esta de forma incorrecta`); 
            return 'Error linea de entrada';
        }
        return ''
    }

    // validamos el formato de horas y minutos cumplan estructura 00:00 
    validaLongitudHoraMinuto(horaIngresada:string,minutoIngresado:string,horaSalida:string,minutoSalida:string):number{
        if(horaIngresada.trim().length==2 && minutoIngresado.trim().length == 2 && horaSalida.trim().length == 2 && minutoSalida.trim().length == 2)
            return 1

        return 0
    }

    //validamos información de los días ingresados
    validaDiasTrabajados(empleado:string,diaEnOficina:string){
            
        if(!dias.includes(diaEnOficina.substr(0,2))){
            console.log(`Error en trabajador ${empleado.trim()} la información de días esta incorrecta ${diaEnOficina}`) 
        }

        // validamos la informacion del rango de horas
        const [horasEntrada,horaSalida] =  diaEnOficina.substr(2,).split(signoSeparacion.guion);
        const horasEntradaMinutos =  horasEntrada.split(signoSeparacion.dos_puntos);
        const horaSalidaMinutos =  horaSalida.split(signoSeparacion.dos_puntos);
        

        const verificaLongitudHorasPorDia:number = this.validaLongitudHoraMinuto(
            horasEntradaMinutos[0],
            horaSalidaMinutos[0],
            horasEntradaMinutos[1],
            horaSalidaMinutos[1]
        )
        
        //validamos que las horas no superen a 82800 que es el equivalente a 23 horas en segundos
        //y 3540 que es el equivalente a 59 minutos en segundos
        if( verificaLongitudHorasPorDia == 1 &&
            parseInt(horasEntradaMinutos[0])*60*60 <=  82800 && parseInt(horaSalidaMinutos[0])*60*60 <=  82800 && 
            parseInt(horasEntradaMinutos[1])*60 <=  3540 && parseInt(horaSalidaMinutos[1])*60 <=  3540 
        ){
            return 0;
        }else{
            console.log(`Error en el dia/hora ingresado ${diaEnOficina} del trabajador ${empleado.trim()}`);
            return 1;
        }   
    }

    //Exportacion final de informacion
    almacenaArregloCorrecto(comprobanteValidadorFecha:any,arregloCorrecto:any){
        var enviamosResultadodeValidacion = arregloCorrecto
        if(comprobanteValidadorFecha==0){
            var arregloNombresTrabajadores:string[] = []
            
            arregloCorrecto.forEach((empleado:string) => {
                arregloNombresTrabajadores.push(empleado.split(signoSeparacion.igualdad)[0])
            });

            let verificamosNombresDuplicados = Array.from(new Set(arregloNombresTrabajadores)) ;

            if(verificamosNombresDuplicados.length != arregloCorrecto.length){
                enviamosResultadodeValidacion = 1
            }
        }

        return enviamosResultadodeValidacion
    }
}

// const validador= new Validador(informacion)
// validador.validadorArchivo()











