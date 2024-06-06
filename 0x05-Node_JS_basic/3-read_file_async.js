const fs = require('fs');
const path = require('path');

module.exports = async function countStudents(filePath) {
  try {
    const data = await fs.promises.readFile(path.resolve(filePath), { encoding: 'utf-8' });
    const lines = data.split('\n').slice(1, -1);
    const header = data.split('\n').slice(0, 1)[0].split(',');
    const idxFn = header.findIndex((ele) => ele === 'firstname');
    const idxFd = header.findIndex((ele) => ele === 'field');
    const fields = {};
    const students = {};

    for (const line of lines) {
      const list = line.split(',');
      if (!fields[list[idxFd]]) fields[list[idxFd]] = 0;
      fields[list[idxFd]] += 1;
      if (!students[list[idxFd]]) students[list[idxFd]] = '';
      students[list[idxFd]] += students[list[idxFd]] ? `, ${list[idxFn]}` : list[idxFn];
    }

    console.log(`Number of students: ${lines.length}`);
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        const element = fields[key];
        console.log(`Number of students in ${key}: ${element}. List: ${students[key]}`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
