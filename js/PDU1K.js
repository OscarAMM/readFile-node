const XLSX = require("xlsx");
const fs = require('fs');
const axios = require('axios');

const TAMANO_BLOQUE = 150; // Tamaño del bloque

function procesarExcelEnBloques(filePath) {
  const file = XLSX.readFile(filePath);
  const sheets = file.SheetNames;

  let data = [];

  for (let i = 0; i < sheets.length; i++) {
    const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    data = data.concat(temp); // Concatenar datos de todas las hojas
  }

  async function enviarDatosAAPI(datos) {
    try {
      const response = await axios.post('http://tu_url_api', datos, {
        headers: {
          'sistema': '22',
          'token': 'MYTOKEN'
        }
      });
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      console.error('Error al enviar datos a la API:', error);
    }
  }

  // Procesar datos en bloques de 1000
  for (let j = 0; j < data.length; j += TAMANO_BLOQUE) {
    const bloque = data.slice(j, j + TAMANO_BLOQUE);

    const bloqueDataService = bloque.map(predio => ({
        idPredio: predio.FE,
        lVigente: true
      }));

    // const datosParaEnviar = {
    //     // Formatear los datos del bloque según los requisitos de la API
    //     servicio: 'Predios',
    //     metodo: 'MarcaPredioPDU',
    //     iSolicitudPDU:6,
    //     iAnioFiscalPDU:2024,
    //     cUsuario:'administrador',
    //     cFolioPDU:'M-57',
    //     ttFolios:bloqueDataService,
    //     cTipoPDU:'M',
    //     cModo:'INSCRIPCION',
    //   };

    // Procesar el bloque para crear dataObject y dataService
    // const bloqueDataObject = bloque.map(info => ({
    //   iIDPredio: info.FE,
    //   cNomenclatura: `${info.Calle || ''} ${info.Numero || ''} ${info.Tablaje || ''} ${info.TipoPredio} ${info.Colonia} ${info.Municipio}`,
    //   cedicion: info.FE
    // }));


    //Crear nombres de archivo únicos para cada bloque
    const nombreArchivoObject = `predios_bloque_${j / TAMANO_BLOQUE}.json`;
    const rutaArchivoObject = `././rpc/${nombreArchivoObject}`;

    const nombreArchivoService = `servicio_bloque_${j / TAMANO_BLOQUE}.json`;
    const rutaArchivoService = `././rpc/${nombreArchivoService}`;

    //Escribir el bloque en archivos JSON separados
    // fs.writeFile(rutaArchivoObject, JSON.stringify(bloqueDataObject), 'utf-8', (error) => {
    //   if (error) {
    //     console.error(`Error al escribir el archivo ${nombreArchivoObject}:`, error);
    //   } else {
    //     console.log(`Archivo ${nombreArchivoObject} creado correctamente`);
    //   }
    // });

    fs.writeFile(rutaArchivoService, JSON.stringify(bloqueDataService), 'utf-8', (error) => {
      if (error) {
        console.error(`Error al escribir el archivo ${nombreArchivoService}:`, error);
      } else {
        console.log(`Archivo ${nombreArchivoService} creado correctamente`);
      }
    });
  }
}

// Ejemplo de uso
const filePath = '././rpc/PDU.xlsx';
procesarExcelEnBloques(filePath);