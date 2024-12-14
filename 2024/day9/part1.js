/**
 * I started to look at other peoples solutions for ideas starting on day 9 cause I was stuck
 */

const fs = require("node:fs");

function readData(filename) {
  try {
    const data = fs.readFileSync('./' + filename, 'utf8');
    return data;
  } catch (e) {
    return null;
  }
}

let data = readData('input')?.trim();

// We want to fill the array with with an ID or '.'
let disk = [];
let ID = 0;
for (let i = 0; i < data.length; i++) {
  let value = Number(data[i]);
  // If our current index is even we're on an ID, otherwise we're on free space
  if (i % 2 == 0) {
    for (let j = 0; j < value; j++) {
      disk.push(String(ID));
    }
    ID++;
  } else {
    for (let j = 0; j < value; j++) {
      disk.push('.');
    }
  }
}

// We want to move all blocks to the start of the disk
let left = 0;
let right = disk.length - 1;
while (left < right) {
  // The 
  if (disk[left] !== ".") {
    left++;
    continue;
  } 

  if (disk[right] === ".") {
    right--;
    continue;
  }

  // We swap the left and right and move the pointers
  let left_value = disk[left];
  disk[left] = disk[right];
  disk[right] = left_value;
  right--;
  left++;
}

// We compute the checksum on all non-empty values
let checksum = 0;
let index = 0;
while (disk[index] !== ".") {
  checksum += index * disk[index];
  index++;
}

console.log(checksum);
