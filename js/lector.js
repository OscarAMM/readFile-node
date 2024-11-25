const jsonFile = require("./cedulas.json");
const fs = require('fs');
let tests = jsonFile.results;
let info = tests.map(data => data["allTests"] );

let data = JSON.stringify(info);

fs.writeFile('Output.txt', data, (err) => {
    if(err) throw err;
})
console.log(info)