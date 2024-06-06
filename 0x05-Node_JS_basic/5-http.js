const http = require('http');

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

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') res.end('Hello Holberton School!');
  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((data) => {
        res.write(data.numberStudents);
        res.write(data.listStudents.join('\n'));
        res.end();
      })
      .catch((err) => {
        res.end(err.message);
      });
  }
});

app.listen(port, hostname);

module.exports = app;
