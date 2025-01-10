const questions = [
  {
    question: "What does 'var' stand for in JavaScript?",
    answers: ['Variable', 'Variety', 'Variant', 'Varicose'],
    correct: 0,
  },
  {
    question: 'Which type of Pop-up box is NOT available in JavaScript?',
    answers: ['Alert', 'Confirm', 'Prompt', 'Input'],
    correct: 3,
  },
  {
    question: 'What does NaN stand for?',
    answers: [
      'Not-a-Number',
      'Number-at-Node',
      'Non-active-Node',
      'Not-applicable-Number',
    ],
    correct: 0,
  },
  {
    question: 'Which of these is a JavaScript data type?',
    answers: ['Number', 'Element', 'Node', 'List'],
    correct: 0,
  },
  {
    question: "What is the output of 1 + '1' in JavaScript?",
    answers: ['2', "'11'", "'2'", 'Error'],
    correct: 1,
  },
  {
    question: 'What is used to declare constants in JavaScript?',
    answers: ['const', 'let', 'var', 'constant'],
    correct: 0,
  },
  {
    question: 'Which operator is used for strict equality?',
    answers: ['==', '=', '===', '!=='],
    correct: 2,
  },
  {
    question: 'What does JSON stand for?',
    answers: [
      'JavaScript Object Notation',
      'JavaScript Only',
      'JavaScript Original Nodes',
      'None',
    ],
    correct: 0,
  },
  {
    question: 'Which function is used to parse JSON?',
    answers: [
      'JSON.parse()',
      'JSON.stringify()',
      'JSON.convert()',
      'JSON.decode()',
    ],
    correct: 0,
  },
  {
    question: 'What does DOM stand for?',
    answers: [
      'Document Object Model',
      'Data Object Map',
      'Document Orientation Module',
      'None',
    ],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let timer = 30;
let interval;

const startButton = document.getElementById('start-btn');
const highscoresButton = document.getElementById('highscores-btn');
const saveButton = document.getElementById('save-btn');
const restartButton = document.getElementById('restart-btn');
const backButton = document.getElementById('back-btn');

startButton.addEventListener('click', startQuiz);
highscoresButton.addEventListener('click', showHighScores);
saveButton.addEventListener('click', saveScore);
restartButton.addEventListener('click', startQuiz);
backButton.addEventListener('click', showMenu);

function startQuiz() {
  switchView('quiz'); // Switch to the quiz view
  currentQuestion = 0; // Reset question index
  score = 0; // Reset score
  timer = 30; // Reset timer
  showQuestion(); // Show the first question
  startTimer(); // Start the countdown
}

function startTimer() {
  clearInterval(interval);
  document.getElementById('time').textContent = timer;
  interval = setInterval(() => {
    timer--;
    document.getElementById('time').textContent = timer;
    if (timer <= 0) endQuiz();
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestion];

  if (!question) return; // Ensure there's a valid question

  const questionDiv = document.getElementById('question');
  const answersDiv = document.getElementById('answers');

  // Display the question
  questionDiv.textContent = question.question;

  // Clear previous answers
  answersDiv.innerHTML = '';

  // Display the answer buttons
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('btn', 'primary', 'fade-in');
    button.addEventListener('click', () => checkAnswer(index));
    answersDiv.appendChild(button);
  });
}

function checkAnswer(index) {
  if (index === questions[currentQuestion].correct) {
    score++;
    // triggerConfetti();
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(interval);
  switchView('end');
  document.getElementById('score').textContent = score;
}

function saveScore() {
  const name = document.getElementById('name').value.trim();
  if (name) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name, score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
    showHighScores();
  }
}

function showHighScores() {
  switchView('highscores');
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const highScoresList = document.getElementById('highscores-list');
  highScoresList.innerHTML = highScores
    .map((score) => `<li>${score.name}: ${score.score}</li>`)
    .join('');
}

function showMenu() {
  switchView('menu');
}

function switchView(view) {
  document
    .querySelectorAll('#app > div')
    .forEach((div) => div.classList.add('hidden'));
  document.getElementById(view).classList.remove('hidden');
}

// function triggerConfetti() {
//   const confetti = new ConfettiGenerator({ target: 'confetti-canvas' });
//   confetti.render();
//   setTimeout(() => clear(), 2000);
// }
