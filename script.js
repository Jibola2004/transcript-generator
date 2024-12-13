const addcourse = document.getElementById("add");
const tablebody = document.querySelector(".course-row");
const gpaCalculatorButton = document.getElementById("gpa-calculator");
const result = document.getElementById("result");
let cgpa = document.getElementById("cgpa");
let prevCredit=document.getElementById("prev-credits");

const systems = [
  {
    type: "AA/BA/BB",
    grade: [
      { letter: "AA", gradeEquvalent: 4 },
      { letter: "BA", gradeEquvalent: 3.5 },
      { letter: "BB", gradeEquvalent: 3.0 },
      { letter: "CB", gradeEquvalent: 2.5 },
      { letter: "CC", gradeEquvalent: 2.0 },
      { letter: "DC", gradeEquvalent: 1.5 },
      { letter: "DD", gradeEquvalent: 1.0 },
      { letter: "FD", gradeEquvalent: 0.5 },
      { letter: "FF", gradeEquvalent: 0.0 },
      { letter: "NA", gradeEquvalent: 0.0 },
    ],
  },
  {
    type: "A1/A2/A3",
    grade: [
      { letter: "A1", gradeEquvalent: 4 },
      { letter: "A2", gradeEquvalent: 3.75 },
      { letter: "A3", gradeEquvalent: 3.5 },
      { letter: "B1", gradeEquvalent: 3.25 },
      { letter: "B2", gradeEquvalent: 3.0 },
      { letter: "B3", gradeEquvalent: 2.75 },
      { letter: "C1", gradeEquvalent: 2.5 },
      { letter: "C2", gradeEquvalent: 2.25 },
      { letter: "C3", gradeEquvalent: 2.0 },
      { letter: "D", gradeEquvalent: 1.75 },
      { letter: "F", gradeEquvalent: 0.0 },
    ],
  },
  {
    type: "A+/A/A-",
    grade: [
      { letter: "A+", gradeEquvalent: 4 },
      { letter: "A", gradeEquvalent: 3.75 },
      { letter: "A-", gradeEquvalent: 3.5 },
      { letter: "B+", gradeEquvalent: 3.25 },
      { letter: "B", gradeEquvalent: 3.0 },
      { letter: "B-", gradeEquvalent: 2.75 },
      { letter: "C+", gradeEquvalent: 2.5 },
      { letter: "C", gradeEquvalent: 2.25 },
      { letter: "C-", gradeEquvalent: 2.0 },
      { letter: "D+", gradeEquvalent: 1.75 },
      { letter: "D", gradeEquvalent: 0.0 },
      { letter: "F", gradeEquvalent: 0.0 },
    ],
  },
];

let system;

function gradingSystem() {
  const gradeSystem = document.getElementById("gradeSystem").value;
  system = systems.find((s) => s.type === gradeSystem);
}

function addCourseToTable() {
  const newrow = document.createElement("tr");
  newrow.innerHTML = `
    <td><input type="text" class="course-code" placeholder="Course Code"></td>
    <td><input type="text" class="course-name" placeholder="Course Name"></td>
    <td>
      <select name="credit" class="credit">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2 </option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </td>
    <td>
      <select name="grade" class="grade">
        ${system.grade.map(g => `<option value="${g.letter}">${g.letter}</option>`).join('')}
      </select>
    </td>`;
  tablebody.appendChild(newrow);
}

addcourse.addEventListener("click", () => {
  gradingSystem();
  addCourseToTable();
});


function calculateGPA() {
  const allRows = tablebody.querySelectorAll("tr");
  let totalCredits = 0;
  let weightedGradePoints = 0;

  allRows.forEach((row) => {
    const creditElement = row.querySelector(".credit");
    const gradeElement = row.querySelector(".grade");

    if (!creditElement || !gradeElement) return;

    const credit = parseFloat(creditElement.value);
    const grade = gradeElement.value;

    const gradeData = system.grade.find((g) => g.letter === grade);
    const gradePoints = gradeData ? gradeData.gradeEquvalent : 0;

    totalCredits += credit;
    weightedGradePoints += credit * gradePoints;
  });


  cgpa = parseFloat(cgpa.value);
  prevCredit= parseFloat(prevCredit.value);
  let cumGPA;
 /* if (totalCredits > 0 ) {
    const gpa = weightedGradePoints / totalCredits;
    result.innerHTML = `Calculated GPA: ${gpa.toFixed(2)}`;
  } else {
    alert("No valid courses to calculate GPA.");
  }*/

    if (totalCredits > 0){
      
      cumGPA = ((prevCredit*cgpa)+(weightedGradePoints))/(prevCredit+totalCredits);
     const gpa = weightedGradePoints / totalCredits;
     result.innerHTML=`cumGPA:${cumGPA}    GPA:${gpa.toFixed(2)}`;
    }
    else {
      alert("No valid courses to calculate GPA.");
    }
   /* console.log("gpa calculator");
    console.log( cgpa);
    console.log( prevCredit);
    console.log(cumGPA);*/

}

gpaCalculatorButton.addEventListener("click", calculateGPA);