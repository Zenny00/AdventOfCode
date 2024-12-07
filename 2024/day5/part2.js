const fs = require('node:fs');

function fix_row(row, rules) {
  let valid = true;
  let i = 0;
  let seen = [];
  while (valid && i < row.length) {
    let number = row[i];
    let not_before = order_map[number];

    // If we've already seen any of the numbers we're not supposed to this row is invalid
    
    if (not_before) {
      let swap_index = 0;
      let invalid = seen.some((e, i) => {
          let result = not_before.includes(e);
          swap_index = i;
          return result;
      });

      if (invalid) {
        let tmp = row[swap_index];
        row[swap_index] = row[i];
        row[i] = tmp;

        i = 0;
        seen = [];
        continue;
      }
    }

    seen.push(number);
    i++;
  }

  return row;
}

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

console.log(order_map)

let broken_rows = []; 
let valid_rows = [];
loop1:
for (let i = 0; i < rows.length; i++) {
  let valid_row = true;
  let row = rows[i];
  let numbers = row.split(",");
  let seen = [];
loop2:
  for (let j = 0; j < numbers.length; j++) {
    let number = numbers[j];
    let not_before = order_map[number];

    // If we've already seen any of the numbers we're not supposed to this row is invalid
    if (not_before && seen.some((e) => not_before.includes(e))) {
      broken_rows.push(fix_row(numbers, order_map));
      break loop2;
    }

    seen.push(number);
  }

  if (valid_row) {
    valid_rows.push(numbers);
  }
}

console.log(broken_rows);

let middle_sum = 0;
for (let i = 0; i < broken_rows.length; i++) {
  let row = broken_rows[i];
  let number = Number(row[Math.floor(row.length/2)]);
  middle_sum += number;
}

console.log(middle_sum);
