const fs = require("node:fs");

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

/**
 * Returns true if this value is within the map 
 */
function isWithinMap(num_rows, num_columns, row, column) {
  return (0 <= row) && (row < num_rows) && (0 <= column) && (column < num_columns);
}

function placeAntinode(row, column, data) {
  let was_placed = false;
  if (data[row][column] !== "#") {
    was_placed = true;
    data[row][column] = "#";
  }

  return was_placed;
}

function updateData(row, column, data) {
  let was_placed = false;
  if (isWithinMap(data.length, data[0].length, row, column)) {
    was_placed = placeAntinode(row, column, data);
  }

  return was_placed ? 1 : 0;
}

function propagateAntinode(row, column, slope_x, slope_y, data) {
  let num_antinodes = 0;
  let source_row = row;
  let source_column = column;

  while (isWithinMap(data.length, data[0].length, source_row, source_column)) {
    let upper_antinode_column = source_column - slope_x;
    let upper_antinode_row = source_row - slope_y;

    num_antinodes += updateData(upper_antinode_row, upper_antinode_column, output);
    source_column = upper_antinode_column;
    source_row = upper_antinode_row;
  }

  return num_antinodes;
}

function findAntinodes(start_row, start_column, data, output, antinode_count) {
  let frequency = data[start_row][start_column];
  // We start on the start row to reduce the amount of rows we need to traverse and to avoid duplicates
  for (let row = start_row; row < data.length; row++) {
    for (let column = 0; column < data[row].length; column++) {
      if (data[row][column] == frequency && (row !== start_row || column !== start_column)) {
        let slope_x = column - start_column;  
        let slope_y = row - start_row;

        // We calculate the upper and lower antinodes for each frequency pair
        antinode_count += propagateAntinode(row, column, slope_x, slope_y, data);
        antinode_count += propagateAntinode(start_row, start_column, -slope_x, -slope_y, data);        
      }
    }
  }

  return antinode_count;
}

const file_data = readData('input');
// Filter out any blank data
const data = file_data.split("\n").filter((row) => row !== "").map((row) => row.split(""));
// Make a copy of the input data to change
const output = JSON.parse(JSON.stringify(data));
let antinode_count = 0;
for (let row = 0; row < data.length; row++) {

  for (let column = 0; column < data[row].length; column++) {
    if (data[row][column] !== "." && data[row][column] !== "#") {
      antinode_count = findAntinodes(row, column, data, output, antinode_count);
    }
  }
}

console.log(antinode_count);
output.forEach((row) => console.log(row.join("")));

