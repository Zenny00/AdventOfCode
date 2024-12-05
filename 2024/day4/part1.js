const fs = require('node:fs');

function check_xmas(grid, row, column) {
  // Hardcode each case
  var xmas_count = 0;
  // Right
  if (grid?.[row]?.[column] == 'X' && grid?.[row]?.[column+1] == 'M' && grid?.[row]?.[column+2] == 'A' && grid?.[row]?.[column+3] == 'S') {
    xmas_count++;
  }

  // Left
  if (grid?.[row]?.[column] == 'X' && grid?.[row]?.[column-1] == 'M' && grid?.[row]?.[column-2] == 'A' && grid?.[row]?.[column-3] == 'S') {
    xmas_count++;
  }

  // Up
  if (grid?.[row]?.[column] == 'X' && grid?.[row+1]?.[column] == 'M' && grid?.[row+2]?.[column] == 'A' && grid?.[row+3]?.[column] == 'S') {
    xmas_count++;
  }

  // Down
  if (grid?.[row]?.[column] == 'X' && grid?.[row-1]?.[column] == 'M' && grid?.[row-2]?.[column] == 'A' && grid?.[row-3]?.[column] == 'S') {
    xmas_count++;
  }

  // Up-right
  if (grid?.[row]?.[column] == 'X' && grid?.[row+1]?.[column+1] == 'M' && grid?.[row+2]?.[column+2] == 'A' && grid?.[row+3]?.[column+3] == 'S') {
    xmas_count++;
  }

  // Down-left
  if (grid?.[row]?.[column] == 'X' && grid?.[row-1]?.[column-1] == 'M' && grid?.[row-2]?.[column-2] == 'A' && grid?.[row-3]?.[column-3] == 'S') {
    xmas_count++;
  }

  // Up-left
  if (grid?.[row]?.[column] == 'X' && grid?.[row+1]?.[column-1] == 'M' && grid?.[row+2]?.[column-2] == 'A' && grid?.[row+3]?.[column-3] == 'S') { 
    xmas_count++;
  }

  // Down-right
  if (grid?.[row]?.[column] == 'X' && grid?.[row-1]?.[column+1] == 'M' && grid?.[row-2]?.[column+2] == 'A' && grid?.[row-3]?.[column+3] == 'S') {
    xmas_count++;
  }
  return xmas_count;
} 

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
const data = file_data.split("\n").filter((row) => row !== "");

// Loop through each row and check each letter until we find an 'X'
var xmas_count = 0;
for (var row = 0; row < data.length; row++) {
  for (var column = 0; column < data[row].length; column++) {
    if (data[row][column] == 'X') {
      xmas_count += check_xmas(data, row, column);
    }
  }
}

console.log(xmas_count);
