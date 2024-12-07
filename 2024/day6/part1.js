const fs = require("node:fs");

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

const file_data = readData('input');
// Filter out any blank data
const data = file_data.split("\n").filter((row) => row !== "").map((row) => row.split(''));
let start_row = 0;
let start_column = 0;

for (var i = 0; i < data.length; i++) {
  let row = data[i];
  for (var j = 0; j < row.length; j++) {
    if (row[j] == "^") {
      start_row = i;
      start_column = j;
      break;
    }
  }
}

let current_row = start_row;
let current_column = start_column;
let degrees = 90;
while (data?.[current_row]?.[current_column] !== undefined) {
  // Set the value so we can count it later
  data[current_row][current_column] = "X";
  
  if (
    degrees == 90 && data?.[current_row-1]?.[current_column] == "#" ||
    degrees == 180 && data?.[current_row]?.[current_column+1] == "#" ||
    degrees == 270 && data?.[current_row+1]?.[current_column] == "#" ||
    degrees == 0 && data?.[current_row]?.[current_column-1] == "#"
  ) {
    degrees = (degrees + 90) % 360;
  }

  if (degrees == 90) {
    current_row--;
  } else if (degrees == 180) {
    current_column++;
  } else if (degrees == 270) {
    current_row++;
  } else if (degrees == 0) {
    current_column--;
  }
}

let unique_spaces = 0;
for (var i = 0; i < data.length; i++) {
  for (var j = 0; j < data[i].length; j++) {
    if (data[i][j] == "X") {
      unique_spaces++;
    }
  }
}

console.log(unique_spaces);
