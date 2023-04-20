const jsonFile = require("././catmid/testeo/NOTI_TEST");
const fs = require('fs');
let modifiedData = "";
// let info = tests.map(data => data["allTests"] );

// let data = JSON.stringify(info);

// fs.writeFile('Output.txt', data, (err) => {
//     if(err) throw err;
// })
// const jsonObjects = tests.map(item => item.data);

//   // Convert the JSON data to a string with newline separators
//   const outputData = jsonObjects.map(obj => JSON.stringify(obj)).join('\n')
// console.log(outputData)
// const fs = require('fs');

// Read the input file
fs.readFile('././catmid/testeo/NOTI_TEST.json', 'utf8', (error, data) => {
  if (error) {
    console.error('Failed to read file: ' + error);
    return;
  }

  // Parse the input data as a JSON array
  const jsonArray = JSON.parse(data);

  // Extract the JSON data and separate them with \n
  const outputData = jsonArray.map(obj => JSON.stringify(obj)).join('\n\n');
  if(outputData.includes("delete")){
    modifiedData = outputData.replace(/"delete"/g, "");
    console.log(modifiedData);
  }
  // Write the output data to the output file
  fs.writeFile('././catmid/testeo/NOTI_TEST_RESULT.txt', modifiedData, 'utf8', error => {
    if (error) {
      console.error('Failed to write file: ' + error);
      return;
    }
    console.log('Data written to output.txt');
  });
});
