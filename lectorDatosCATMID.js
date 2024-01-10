const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('././catmid/respuestas/nuevo/NOTIFICACION_01_JUL-AL-31_OCT_2023_RESPUESTA.json')
});

const jsonData = [];
const result = [];
readInterface.on('line', (line) => {
    const obj = JSON.parse(line);
    jsonData.push(obj);
});

readInterface.on('close', () => {
    const infoData = jsonData.reduce((result, data) => {
        
        // if (!data.lError) {
            
                      
        // }
        let servicios = data.ttServicios;
            let infoData = servicios.map(info => JSON.stringify(info)).join('\n');
            result.push(infoData);  
        return result;
    }, []).join(',');
    

    fs.writeFile('././catmid/respuestas/nuevo/archivoCompleto/NOTIFICACION_01_JUL-AL-31_OCT_2023_RESPUESTA.json', infoData, 'utf-8', error => {
        if(error){
            console.error(`Error ${error}`);
            return
        }
        console.log('Se ha creado el archivo correctamente');
    });
});