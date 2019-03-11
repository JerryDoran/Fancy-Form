// CREATE THE QUESTIONS ARRAY
const questions = [
  {question: "Enter Your First Name"},
  {question: "Enter Your Last Name"},
  {question: "Enter Your Email", pattern: /\S+@\S+\.\S+/},
  {question: "Create A Password", type: "password"}
]

// TRANSITION TIMES
const shakeTime = 100; //Shake transition time
const switchTime = 200; //Transition between questions

// INITIALIZE POSITION AT FIRST QUESTION
let position = 0;

// INITIALIZE DOM ELEMENTS
const formBox = document.querySelector("#form-box")
const nextBtn = document.querySelector("#next-btn")
const prevBtn = document.querySelector("#prev-btn")
const inputGroup = document.querySelector("#input-group")
const inputField = document.querySelector("#input-field")
const inputLabel = document.querySelector("#input-label")
const inputProgess = document.querySelector("#input-progress")
const progress = document.querySelector("#progress-bar")

// EVENTS

// Get question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);

// Next Button Click
nextBtn.addEventListener("click", validate);

// Input field enter click
inputField.addEventListener("keyup", e => {
  if(e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS
function getQuestion() {
  // Get the current question
  inputLabel.innerHTML = questions[position].question;

  // Get current type, if no type specified then treat type as 'text'
  inputField.type = questions[position].type || "text";

  // Get the current answer
  inputField.value = questions[position].answer || "";

  // Focus on current element
  inputField.focus();

  // Set the progress bar width - variable to the questions array length
  progress.style.width =(position * 100) / questions.length + "%";

  // Add user icon or back arrow depending on question
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

// DISPLAY QUESTION TO USER
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgess.style.transition = "";
  inputProgess.style.width = "100%";
}

// HIDE QUESTION FROM USER
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgess.style.width = 0;
  inputProgess.style.transition = "none";
  inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
  // Make sure pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field input fail
function inputFail() {
  formBox.className = "error";

  // Repeat shake motion
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2)* 2 - 1)* 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field input pass
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store answer in array.
  questions[position].answer = inputField.value;

  // Increment position
  position++;

  // If new question, hide current and get next one.
  if(questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove if no more questions.
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";
    formComplete();
  }
}

// All fields complete - show h1 end.
function formComplete() {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(document.createTextNode(`Thanks ${questions[0]
    .answer} You are registered and will get an email shortly`));
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
