const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('././catmid/respuestas/nuevo/traslaciones_31032023.json')
});

const jsonData = [];
const result = [];
readInterface.on('line', (line) => {
    const obj = JSON.parse(line);
    jsonData.push(obj);
});

readInterface.on('close', () => {
    const infoData = jsonData.reduce((result, data) => {
        if (!data.lError) {
            let servicios = data.ttServicios;
            let infoData = servicios.map(info => JSON.stringify(info)).join('\n');
            result.push(infoData);            
        }
        return result;
    }, []).join('\n');

    fs.writeFile('././catmid/respuestas/nuevo/archivoCompleto/noti31032023.json', infoData, 'utf-8', error => {
        if(error){
            console.error(`Error ${error}`);
            return
        }
        console.log('Se ha creado el archivo correctamente');
    });
});