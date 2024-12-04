const fs = require('node:fs');

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

const file_data = readData('input');

let result = 0;
// I had to look up how to make this regex, not smart enough to do this on my own
let regex = new RegExp("mul\\(([0-9]{1,3}),([0-9]{1,3})\\)|do\\(\\)|don\\'t\\(\\)", 'g');
let matches = file_data.match(regex);

let should_process = true;
for (let i = 0; i < matches.length; i++) {
  let match = matches[i];
  
  // If we hit a do we should process until we hit a don't
  if (match == "do()") {
    should_process = true;
  } else if (match == "don't()") {
    should_process = false;
  } else if (should_process) {
    let numbers_regex = new RegExp("([0-9]{1,3}),([0-9]{1,3})");
    let parsed_numbers = numbers_regex.exec(match);
    result += Number(parsed_numbers[1]) * Number(parsed_numbers[2]);
  }
}

console.log(result);

