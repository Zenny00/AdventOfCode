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

order_map = {};
for (let i = 0; i < order_rules.length; i++) {
  let numbers = order_rules[i].split("|");
  let first = numbers[0];
  let second = numbers[1];

  if (order_map[first]) {
    order_map[first].push(second);
  } else {
    order_map[first] = [second];
  }
}

let valid_rows = [];
for (let i = 0; i < rows.length; i++) {
  let valid_row = true;
  let row = rows[i];
  let numbers = row.split(",");
  let seen = [];
  for (let j = 0; j < numbers.length; j++) {
    let number = numbers[j];
    let not_before = order_map[number];

    // If we've already seen any of the numbers we're not supposed to this row is invalid
    if (not_before && seen.some((e) => not_before.includes(e))) {
      valid_row = false;
    }

    seen.push(number);
  }

  if (valid_row) {
    valid_rows.push(numbers);
    
  }
}

let middle_sum = 0;
for (let i = 0; i < valid_rows.length; i++) {
  let row = valid_rows[i];
  let number = Number(row[Math.floor(row.length/2)]);
  middle_sum += number;
}

console.log(middle_sum);
