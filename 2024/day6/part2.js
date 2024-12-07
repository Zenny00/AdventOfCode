const fs = require("node:fs");

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

function is_infinite_loop(current_row, current_column, data) {
  let degrees = 90;
  let movements = 0;
  while (data?.[current_row]?.[current_column] !== undefined) {
    // Set a random bound that if we exceed we're probably in a loop
    if (movements > 50000) {
      return true;
    }

    if (
      degrees == 90 && data?.[current_row-1]?.[current_column] == "#" || 
      degrees == 90 && data?.[current_row-1]?.[current_column] == "O" ||
      degrees == 180 && data?.[current_row]?.[current_column+1] == "#" ||
      degrees == 180 && data?.[current_row]?.[current_column+1] == "O" ||
      degrees == 270 && data?.[current_row+1]?.[current_column] == "#" ||
      degrees == 270 && data?.[current_row+1]?.[current_column] == "O" ||
      degrees == 0 && data?.[current_row]?.[current_column-1] == "#" ||
      degrees == 0 && data?.[current_row]?.[current_column-1] == "O"
    ) {
      degrees = (degrees + 90) % 360;
      continue; // The gaurd does not move AND turn in the same move. Thank you https://www.reddit.com/r/adventofcode/comments/1h8g48w/2024_day_6_part_2_guard_doesnt_change_direction/
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

    movements++;
  }

  return false;
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
let obstacle_positions = 0;
for (var i = 0; i < data.length; i++) {
  for (var j = 0; j < data[i].length; j++) {
    if (data[i][j] == "^") {
      continue;
    }

    let original_character = data[i][j];
    data[i][j] = "O";
    obstacle_positions += (is_infinite_loop(current_row, current_column, data) ? 1 : 0);
    data[i][j] = original_character;
  }
}

console.log(obstacle_positions);
