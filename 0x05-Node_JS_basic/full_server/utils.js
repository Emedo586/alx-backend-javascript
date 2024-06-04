import fs from 'fs';
import csv from 'csv-parser';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const students = {};
        csv()
          .on('data', (row) => {
            if (!students[row.field]) {
              students[row.field] = [];
            }
            students[row.field].push(row.firstname);
          })
          .on('end', () => {
            resolve(students);
          });
        data.pipe(csv());
      }
    });
  });}
