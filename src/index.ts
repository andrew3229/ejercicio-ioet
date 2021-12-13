import { lectorArchivoTxt } from "./components/lectorArchivoTxt";
import { comprobarCoincidenciaHorario } from './components/comprobamosCoincidenciaHorario';
import { Validador } from './components/validadorArchivo';
const informacion = lectorArchivoTxt('./dist/trabajadores.txt')

enum EstadoDeArchivo {
    DatosDuplicados = 1,
}

const validador = new Validador(informacion)
var comprobanteNombresTrabajadoresDuplicados = validador.validadorArchivo()

if(comprobanteNombresTrabajadoresDuplicados==EstadoDeArchivo.DatosDuplicados){
    console.log(`En el archivo ingresado se encuentra con nombres duplicados en los trabajadores por favor verificar antes de poder continuar`);
}else{
    comprobarCoincidenciaHorario(comprobanteNombresTrabajadoresDuplicados);
}


