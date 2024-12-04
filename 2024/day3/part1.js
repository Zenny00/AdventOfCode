const fs = require('node:fs');

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

const fileData = readData('input');

let result = 0;
let regex = new RegExp("mul\\(([0-9]{1,3}),([0-9]{1,3})\\)", 'g');
let match;

while ((match = regex.exec(fileData)) !== null) {
  result += Number(match[1]) * Number(match[2]);
}

console.log(result);

