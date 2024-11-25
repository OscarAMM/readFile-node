const xlsx = require("xlsx");
const fs = require('fs');
const { table } = require("console");
const file = xlsx.readFile('././rpc/PDU.xlsx');

let data = [];
let dataObject = [];
let dataService = [];
const sheets = file.SheetNames

for (let i = 0; i < sheets.length; i++) {
    const temp = xlsx.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
}


dataObject = data.map(info => {

    let tablaje = (info.Tablaje) ? `Tablaje ${info.Tablaje}` : "";
    let calle = (info.Calle) ? `Calle ${info.Calle}` : "";
    let numero = (info.Numero) ? `Numero ${info.Numero}` : "";

    return {
        iIDPredio: info.FE,
        cNomenclatura: `${calle} ${numero} ${tablaje} ${info.TipoPredio} ${info.Colonia} ${info.Municipio}`,
        cedicion: info.FE
    }

});

dataService = data.map(predio => {
    let idFolioElectronico = predio.FE;
    return {
        idPredio: idFolioElectronico,
        lVigente: true,
    }
});

console.log(dataObject);
console.log(dataService);

fs.writeFile('././rpc/predios.json', JSON.stringify(dataObject), 'utf-8', error => {
    if (error) {
        console.error(error);
        return;
    }
    console.log('Archivo creado correctamente');
});

fs.writeFile('././rpc/servicio.json', JSON.stringify(dataService), 'utf-8', error => {
    if (error) {
        console.error(error);
        return;
    }
});