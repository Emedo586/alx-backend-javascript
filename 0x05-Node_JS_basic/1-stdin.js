process.stdout.write('Welcome to Holberton School, what is your name?\n');
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const person_input = process.stdin.read()
  if (person_input !== null)
    process.stdout.write(`Your name is: ${person_input}`);
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
