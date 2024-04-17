interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}
// Creat two student objects
const student1: Student = {
  firstName: "Emedo",
  lastName: "Peace",
  age: 20,
  location: "Nigeria",
};

const student2: Student = {
  firstName: "Emedo",
  lastName: "Jane",
  age: 22,
  location: "Ghana",
};
// Create an array containing the student objects
const studentsList: Student[] = [student1, student2];

function createTable(): void {
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  const firstNameHeader = document.createElement("th");
  const locationHeader = document.createElement("th");

  firstNameHeader.textContent = "First Name";
  locationHeader.textContent = "Location";

  headerRow.appendChild(firstNameHeader);
  headerRow.appendChild(locationHeader);
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  // Iterate through the studentsList and append rows to the table
  studentsList.forEach((student) => {
    const row = document.createElement("tr");
    const firstNameCell = document.createElement("td");
    const locationCell = document.createElement("td");

    firstNameCell.textContent = student.firstName;
    locationCell.textContent = student.location;

    row.appendChild(firstNameCell);
    row.appendChild(locationCell);
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

createTable();
