const fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);

function splitData(data) {
  const lines = data.split('\n');
  return {
    header: lines[0].split(','),
    rows: lines.slice(1, -1)
  };
}

function countStudents(path) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await readFileAsync(path, { encoding: 'utf-8' });
      const { header, rows } = splitData(data);

      const idxFn = header.findIndex((ele) => ele === 'firstname');
      const idxFd = header.findIndex((ele) => ele === 'field');

      const fields = {};
      const students = {};

      rows.forEach((line) => {
        const list = line.split(',');
        if (!fields[list[idxFd]]) fields[list[idxFd]] = 0;
        fields[list[idxFd]] += 1;
        if (!students[list[idxFd]]) students[list[idxFd]] = '';
        students[list[idxFd]] += students[list[idxFd]] ? `, ${list[idxFn]}` : list[idxFn];
      });

      console.log(`Number of students: ${rows.length}`);
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          console.log(`Number of students in ${key}: ${element}. List: ${students[key]}`);
        }
      }
      resolve();
    } catch (err) {
      reject(new Error('Cannot load the database'));
    }
  });
}

module.exports = countStudents;
