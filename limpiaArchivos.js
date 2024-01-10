const fs = require('fs');

fs.readFile('././catmid/respuestas/antiguo/NOTIFICACION_11_NOV_AL_31_DIC_2023_RESPUESTA.txt', 'utf8', (error, data) => {
    if (error) {
      console.error('Failed to read file: ' + error);
      return;
    }

    let infoTxt = data.replace(/\\/g,'');
    console.log(infoTxt);
    // Parse the input data as a JSON array
    //const jsonArray = JSON.parse(infoTxt);
  
    // Extract the JSON data and separate them with \n
    //const outputData = infoTxt.map(obj => JSON.stringify(obj)).join('\n');
   
    // Write the output data to the output file
    fs.writeFile('././catmid/respuestas/nuevo/NOTIFICACION_11_NOV_AL_31_DIC_2023_RESPUESTA.json', infoTxt, 'utf8', error => {
      if (error) {
        console.error('Failed to write file: ' + error);
        return;
      }
      console.log('Data written to output.txt');
    });    
});
