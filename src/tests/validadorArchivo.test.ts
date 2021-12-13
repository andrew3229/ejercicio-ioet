import { Validador } from '../components/validadorArchivo';
const informacion =`RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\r
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00`

const validador = new Validador(informacion)


// VERIFICACION DE LA ESTRUCTURA DEL ARREGLO SIMBOLO DE IGUALDAD '=' 
test('validación de la estructura del arreglo recibido debe contar con un símbolo de igualdad "=", se envia un simbolo "=" para comparar', () => {
  let datos:string= "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00"

  let respuestaEsperada:string = '';

  expect(validador.validaEstructuraIgualdad(datos)).toEqual(respuestaEsperada);
})


test('control de error en la estructura del arreglo recibido al tener varios simbolos de igualdad', () => {
  let datos:string= "RENE==MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00"

  let respuestaEsperada:string = 'Error linea de entrada';

  expect(validador.validaEstructuraIgualdad(datos)).toEqual(respuestaEsperada);
})


test('control de error en la estructura del arreglo recibido recibir una cadena vacia o salto de linea', () => {
  let datos:string= "\n"

  let respuestaEsperada:string = 'Error linea de entrada';

  expect(validador.validaEstructuraIgualdad(datos)).toEqual(respuestaEsperada);
})


// VERIFICACION DE LA ESTRUCTURA DE HORAS Y MINUTOS RECIBIDOS
test('dado una hora y minutos de entrada y salida se valida que cumplan la estructura, dos números en horas y dos números en minutos, se envia a comprobar estructura correcta', () => {
  let horaIngresada:string= "23"
  let minutoIngresado:string= "50"
  let horaSalida:string= "07"
  let minutoSalida:string= "15"

  let respuestaEsperada:number = 1;

  expect(validador.validaLongitudHoraMinuto(horaIngresada,minutoIngresado,horaSalida,minutoSalida)).toEqual(respuestaEsperada);
})


test('dado una hora y minutos de entrada y salida se valida que cumplan la estructura, dos números en horas y dos números en minutos, se envia a comprobar estructura con una hora o minuto vacio', () => {
  let horaIngresada:string= "23"
  let minutoIngresado:string= "50"
  let horaSalida:string= "07"
  let minutoSalida:string= ""

  let respuestaEsperada:number = 0;

  expect(validador.validaLongitudHoraMinuto(horaIngresada,minutoIngresado,horaSalida,minutoSalida)).toEqual(respuestaEsperada);
})

// VERIFICAMOS LAS HORAS INGRESADAS EN LA ESTRUCTURA DE INFORMACIÓN DEL TRABAJADOR

test('dado los dias y horas que el trabajador estuvo en oficina, se valida el registro el registro de horas entre las 00:00 hasta las 23:59, responder a un evento correcto', () => {
  let trabajador:string= "RENE"
  let horasPorSemana:string= "MO10:00-12:00"

  let respuestaEsperada:number = 0;

  expect(validador.validaDiasTrabajados(trabajador,horasPorSemana)).toEqual(respuestaEsperada);
})


test('dado los dias y horas que el trabajador estuvo en oficina, se valida el registro el registro de horas entre las 00:00 hasta las 23:59, responder a un evento con horas o minutos incorrectos', () => {
  let trabajador:string= "RENE"
  let horasPorSemana:string= "MO10:88-29:00"

  let respuestaEsperada:number = 1;

  expect(validador.validaDiasTrabajados(trabajador,horasPorSemana)).toEqual(respuestaEsperada);
})


// VALIDAMOS NOMBRES DUPLICADOS EN LOS ARREGLOS INGRESADOS
test('dado un arreglo con la estructura sin nombres duplicados, debe retornar la misma estructura enviada', () => {
  let trabajador:string[]= ["RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"]
  let comprobante:number = 0;
  let respuestaEsperada:string[] = ['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'];

  expect(validador.almacenaArregloCorrecto(comprobante,trabajador)).toEqual(respuestaEsperada);
})


test('dado un arreglo con la estructura con nombres duplicados, debe retornar el número 1 como error', () => {
  let trabajador:string[]= ["RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00","RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"]
  let comprobante:number = 0;
  let respuestaEsperada:number = 1;

  expect(validador.almacenaArregloCorrecto(comprobante,trabajador)).toEqual(respuestaEsperada);
})


