const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language is used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "C#", correct: false }
    ]
  },
  {
    question: "Who is known as the father of computers?",
    answers: [
      { text: "Charles Babbage", correct: true },
      { text: "Alan Turing", correct: false },
      { text: "John von Neumann", correct: false },
      { text: "Bill Gates", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "Which company developed the iPhone?",
    answers: [
      { text: "Samsung", correct: false },
      { text: "Apple", correct: true },
      { text: "Nokia", correct: false },
      { text: "Sony", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Helium", correct: false }
    ]
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Shark", correct: false }
    ]
  },
  {
    question: "Which continent is known as the Dark Continent?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Europe", correct: false },
      { text: "Australia", correct: false }
    ]
  },
  {
    question: "What is the national sport of Japan?",
    answers: [
      { text: "Cricket", correct: false },
      { text: "Sumo Wrestling", correct: true },
      { text: "Karate", correct: false },
      { text: "Baseball", correct: false }
    ]
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Osmium", correct: false },
      { text: "Oganesson", correct: false },
      { text: "Oxide", correct: false }
    ]
  }
];

// Select elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

// Start quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

// Show a question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;
  progressEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersEl.appendChild(button);
  });
}

// Reset before next question
function resetState() {
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
}

// When answer is selected
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Show correct answer
  Array.from(answersEl.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

// Show result
function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.innerText = `You scored ${score} out of ${questions.length}!`;
  restartBtn.style.display = "inline-block";
}

// Handle Next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Event listeners
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartBtn.addEventListener("click", restartQuiz);

// Restart Quiz
function restartQuiz() {
  startQuiz();
}

// Start immediately
startQuiz();