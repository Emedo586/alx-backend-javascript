process.stdout.write('Welcome to Holberton School, what is your name?\n');
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const person = process.stdin.read();
  if (person !== null) process.stdout.write(`Your name is: ${person}`);
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
