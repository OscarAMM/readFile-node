const xlsx = require("xlsx");
const fs = require('fs');
const file = xlsx.readFile('././catmid/excel/predios_25.xlsx');

let data = [];
let dataObject = [];
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = xlsx.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {    
      data.push(res)
   })
}


dataObject = data.map(info => {

    return  {
        iIDSolicitud: info.FolioSolicitud,
        iIDDetalle: info.FolioServicio, 
        iIDInscripcion: info.Numero_Inscripcion      
    }
    
});
console.log(dataObject);
  
fs.writeFile('././catmid/excel/json/predios_25.json', JSON.stringify(dataObject),'utf-8', error => {
    if(error){
        console.error(error);
        return;
    }
    console.log('Archivo creado correctamente');
});