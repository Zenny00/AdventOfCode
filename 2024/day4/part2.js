const fs = require('node:fs');

function check_xmas(grid, row, column) {
  // Hardcode each case
  var xmas_count = 0;
  if (grid?.[row]?.[column] == 'A' && grid?.[row+1]?.[column+1] == 'M' && grid?.[row-1]?.[column-1] == 'S' && grid?.[row+1]?.[column-1] == 'M' && grid?.[row-1]?.[column+1] == 'S') {
    xmas_count++;
  }

  if (grid?.[row]?.[column] == 'A' && grid?.[row+1]?.[column+1] == 'S' && grid?.[row-1]?.[column-1] == 'M' && grid?.[row+1]?.[column-1] == 'S' && grid?.[row-1]?.[column+1] == 'M') {
    xmas_count++;
  }
 
  if (grid?.[row]?.[column] == 'A' && grid?.[row+1]?.[column+1] == 'M' && grid?.[row-1]?.[column-1] == 'S' && grid?.[row+1]?.[column-1] == 'S' && grid?.[row-1]?.[column+1] == 'M') {
    xmas_count++;
  }

  if (grid?.[row]?.[column] == 'A' && grid?.[row+1]?.[column+1] == 'S' && grid?.[row-1]?.[column-1] == 'M' && grid?.[row+1]?.[column-1] == 'M' && grid?.[row-1]?.[column+1] == 'S') {
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
    if (data[row][column] == 'A') {
      xmas_count += check_xmas(data, row, column);
    }
  }
}

console.log(xmas_count);
