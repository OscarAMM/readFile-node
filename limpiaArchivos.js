const fs = require('fs');

fs.readFile('././catmid/respuestas/antiguo/traslaciones_31032023.txt', 'utf8', (error, data) => {
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
    fs.writeFile('././catmid/respuestas/nuevo/traslaciones_31032023.json', infoTxt, 'utf8', error => {
      if (error) {
        console.error('Failed to write file: ' + error);
        return;
      }
      console.log('Data written to output.txt');
    });    
});
