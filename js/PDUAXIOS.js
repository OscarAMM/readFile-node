const XLSX = require("xlsx");
const fs = require('fs');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();


const TAMANO_BLOQUE = 150; // Tamaño del bloque
const url_sigey = process.env.URL_SIGEY;

function procesarExcelEnBloques(filePath) {
  try {
    const file = XLSX.readFile(filePath);
    const sheets = file.SheetNames;

    let data = [];

    for (let i = 0; i < sheets.length; i++) {
      const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      data = data.concat(temp); // Concatenar datos de todas las hojas
    }



    // Procesar datos en bloques de 1000
    for (let j = 0; j < data.length; j += TAMANO_BLOQUE) {
      const bloque = data.slice(j, j + TAMANO_BLOQUE);

      const bloqueDataService = bloque.map(predio => ({
        idPredio: predio.FE,
        lVigente: true
      }));

     setTimeout(async() => {
      enviarDatosAAPI(bloqueDataService);
     }, 5000)
      
    }
  } catch (error) {
    console.log(error);
  }

}
async function enviarDatosAAPI(datos) {

  try {
    const baseUrl = url_sigey;
    let ttFolios = JSON.stringify(datos);

    const url = `${baseUrl}?servicio=Predios&metodo=MarcaPredioPDU&iSolicitudPDU=6&iAnioFiscalPDU=2024&cUsuario=administrador&cFolioPDU=M-57&ttFolios=${ttFolios}&cTipoPDU=M&cModo=INSCRIPCION`;

    const response = await axios.post(url, {}, {
      headers: {
        //   'Content-Type': 'application/json',
        'sistema': 22,
        'token': 'MYTOKEN'
      }
    });

    console.log('Respuesta de la API:', response.data);
    
  } catch (error) {
    console.error('Error al enviar datos a la API:', error);
  }
}


// Ejemplo de uso
const filePath = '././rpc/PDU_FALTANTE.xlsx';
procesarExcelEnBloques(filePath);