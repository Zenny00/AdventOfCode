const fs = require('node:fs');

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

const file_data = readData('input');
const data = file_data.split("\n");

const order_rules = [];
const rows = [];
let index = 0;
let row;
while((row = data[index]) != "") {
  order_rules.push(row);
  index++;
}

index++;

while((row = data[index]) != "") {
  rows.push(row);
  index++;
}

console.log(order_rules);
console.log(rows);
