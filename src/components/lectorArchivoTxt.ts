const fs = require('fs')
const rutaArchivoTxt = '../dist/trabajadores.txt'

export const lectorArchivoTxt = (archivoRuta:string=rutaArchivoTxt) => {
    try {
        if (fs.existsSync(archivoRuta)) {
            
            return fs.readFileSync(archivoRuta,'utf8', 'utf8')
        }
    } catch(err) {
        console.error(err)
    }
};