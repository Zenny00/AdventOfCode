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

function moveBlock(free_start, block_start, length, disk) {
  let index = 0;
  while (index < length) {
    console.log(index, free_start, block_start, length, disk.join(''));
    let value = disk[free_start];
    disk[free_start] = disk[block_start];
    disk[block_start] = value;
    block_start--;
    free_start++;
    index++;
  }
}

let data = readData('input2')?.trim();

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
  if (disk[right] === ".") {
    right--;
    continue;
  }

  if (disk[left] !== ".") {
    left++;
    continue;
  }

  let length = 0;
  let temp_right = right;
  let start_char = disk[temp_right];
  while (disk[temp_right] === start_char) {
    length++;
    temp_right--;
  }

  let temp_left = left;
  let free_space = 0;
  while (disk[temp_left] === "." && free_space !== length) {
    free_space++;
    temp_left++;
  }

  if (free_space === length) {
    console.log('yes')
    moveBlock(left, right, length, disk);
  }

  right = temp_right;
  left = temp_left;
}

console.log(disk.join(''));

// We compute the checksum on all non-empty values
let checksum = 0;
let index = 0;
while (index < disk.length) {
  if (disk[index] !== ".") {
    checksum += index * disk[index];
  }
  index++;
}
console.log(checksum);
