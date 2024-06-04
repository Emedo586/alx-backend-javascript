import { readDatabase } from '../utils';

export class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase(process.argv[2]);
      const fields = Object.keys(students).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
      let response = 'This is the list of our students\n';
      fields.forEach((field) => {
        response += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    try {
      const students = await readDatabase(process.argv[2]);
      const fieldStudents = students[major];
      if (!fieldStudents) {
        res.status(404).send(`No students in ${major} field`);
      } else {
        res.status(200).send(`List: ${fieldStudents.join(', ')}`);
      }
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}
