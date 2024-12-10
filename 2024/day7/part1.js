const fs = require("node:fs");

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

function canMakeResult(numbers, result, index, current) {
  if (numbers.length == index) {
    return current == result;
  }

  let add = current + numbers[index];
  let multiply = current * numbers[index];
  // Go down the recursive tree branching at each level to try both operators
  // Got ideas for this function from https://www.reddit.com/r/adventofcode/comments/1h8l3z5/2024_day_7_solutions/
  return canMakeResult(numbers, result, index+1, add) || canMakeResult(numbers, result, index+1, multiply);
}

const file_data = readData('input');
// Filter out any blank data
const data = file_data.split("\n").filter((row) => row !== "");

let calibration_results = 0;
for (let i = 0; i < data.length; i++) {
  let row = data[i];
  let parts = row.split(": ");
  let total = Number(parts[0]);
  let numbers = parts[1].split(" ").map((number) => Number(number));
  let is_valid_equation = canMakeResult(numbers, total, 0, 0);
  if (is_valid_equation) {
    calibration_results += total;
  }
}

console.log(calibration_results);
