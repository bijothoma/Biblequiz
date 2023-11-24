let quizData = [
  {
    question: " She found no rest for the sole of her foot. Who?",
    options: ["Sarah", "Tamar", "Dove", "Rebekah"],
    answer: "Dove",
  },
  {
    question: "Which is the only sacrifice that offerer could eat?",
    options: [
      "Burnt offering",
      "Grain offering",
      "Peace offering",
      "Sin offering",
    ],
    answer: "Peace offering",
  },
  {
    question: "This is the finger of God. What?",
    options: ["Darkness", "Lice", "Hail", "Frog"],
    answer: "Lice",
  },
  {
    question: "She has been more righteous than I. Who?",
    options: ["Sarah", "Rebekah", "Tamar", "Leah"],
    answer: "Tamar",
  },
  {
    question: "How hast thou broken forth? Who?",
    options: ["Pharez", "Zarah", "Esau", "Jacob"],
    answer: "Pharez",
  },
  {
    question: "In his days was the earth divided. Whose?",
    options: ["Eber", "Joktan", "Eber", "Peleg"],
    answer: "Peleg",
  },
  {
    question:
      "He was the father of such as dwell in tents, and of such as have cattle. Who?",
    options: ["Jubel", "Jabal", "Jebal", "Jelab"],
    answer: "Jabal",
  },
  {
    question: "And the ark rested upon the mountains of Ararat on ___________.",
    options: [
      "Seventeenth day of seventh month",
      "First day of seventh month",
      "Seventh day of seventh month",
      "Fifteenth day of seventh month",
    ],
    answer: "Seventeenth day of seventh month",
  },
  {
    question: "How old was Jacob when Abraham died?",
    options: ["12", "15", "18", "25"],
    answer: "15",
  },
  {
    question: "We have found water. And he called it ________",
    options: ["Rehoboth", "Sitnah", "Esek", "Shebah"],
    answer: "Shebah",
  },
];

let currentQuestionIndex = 0;
let studentAnswer = new Array(quizData.length);
let timeLeft = 59;
let timer;

function updateTimer() {
  if (timeLeft > 0) {
    const displaySeconds = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
    timerDisplay.textContent = displaySeconds;
    timeLeft--;
  } else {
    clearInterval(timer);
    timerDisplay.textContent = "0";
    score();
    disableButtons();
  }
}
function startTimer() {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
  startbutton.parentElement.style.display = "none";
}

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerDisplay = document.getElementById("timer");
const startbutton = document.getElementById("start-button");
startbutton.addEventListener("click", startTimer);

displayQuestion();

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D"];
  currentQuestion.options.forEach((option, index) => {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("quiz-card");

    const optionLabel = document.createElement("span");
    optionLabel.textContent = optionLetters[index];
    optionLabel.classList.add("option-label");
    optionContainer.appendChild(optionLabel);

    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("quiz-option");
    optionButton.setAttribute("data-option", option);
    optionButton.setAttribute("data-label", optionLetters[index]);

    optionContainer.appendChild(optionButton);
    optionsContainer.appendChild(optionContainer);
  });
}
optionsContainer.addEventListener("click", function (e) {
  // But only alert for elements that have an alert-button class
  if (e.target.classList.contains("quiz-option")) {
    const optionLabel = e.target.dataset.label;
    const optionText = e.target.dataset.option;
    const optionLabels = document.querySelectorAll(".option-label");
    const allOptions = document.querySelectorAll(".quiz-option");
    allOptions.forEach((option) => option.classList.remove("selected"));
    e.target.classList.add("selected");
    optionLabels.forEach((option) => {
      if (option.textContent == optionLabel) {
        option.style.backgroundColor = "black";
        saveAnswers(optionText);
      } else {
        option.style.removeProperty("background-color");
      }
    });
  }
});
nextButton.addEventListener("click", function (e) {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    e.target.style.display = "none";
  }
});

function saveAnswers(answer) {
  studentAnswer[currentQuestionIndex] = answer;
}

submitButton.addEventListener("click", function () {
  score();
  clearInterval(timer);
  timerDisplay.textContent = "!!!";
  disableButtons();
});
function disableButtons() {
  const allOptions = document.querySelectorAll(".quiz-option");
  allOptions.forEach((option) => (option.disabled = true));
  nextButton.disabled = true;
  submitButton.disabled = true;
}

function score() {
  let totalScore = 0;
  quizData.forEach((question, index) => {
    if (question.answer == studentAnswer[index]) {
      totalScore++;
    }
  });
  scoreContainer.innerText = `Your total score is  ${totalScore}/${quizData.length}`;
}
