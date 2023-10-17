const startBtn = document.getElementById('start-btn');
const timerContainer = document.getElementById('timer-container');
const timerElement = document.getElementById('timer');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const gameOverContainer = document.getElementById('game-over-container');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const nextBtn = document.getElementById('next-btn');
const saveBtn = document.getElementById('save-btn');
const initialsInput = document.getElementById('initials');
const finalScoreElement = document.getElementById('final-score');
const highScoresList = document.getElementById('high-scores-list');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;

const questions = [
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Hyperlink and Text Markup Language', correct: false },
      { text: 'High Tech Markup Language', correct: false },
      { text: 'Home Tool Markup Language', correct: false }
    ]
  },
  {
    question: 'What is the correct way to write a JavaScript array?',
    answers: [
      { text: "var cake = (0:'chocolate', 1:'lemon', 2:'vanilla')", correct: false },
      { text: "var cake = ['chocolate', 'lemon', 'vanilla']", correct: true },
      { text: "var cake = (chocolate, lemon, vanilla)", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: 'Which of the following is an example of a string?',
    answers: [
      { text: '"Hello world!"', correct: true },
      { text: '10', correct: false },
      { text: '"Hello world!', correct: false },
      { text: 'Hello World!', correct: false }
    ]
  },
  {
    question: 'What is the correct format if I wanted "Panic" in an alert box?',
    answers: [
      { text: "msg('False Alarm')", correct: false },
      { text: "alert('False Alarm')" , correct: true },
      { text: "prompt('False Alarm')", correct: false },
      { text: "alertBox('False Alarm')", correct: false }
    ]
  },
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    showGameOver();
  }
});

saveBtn.addEventListener('click', saveScore);

function startQuiz() {
  startBtn.classList.add('hide');
  questionContainer.classList.remove('hide');
  setNextQuestion();
  startTimer();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    answerButtons[index].innerText = answer.text;
    answerButtons[index].addEventListener('click', () => {
      if (answer.correct) {
        score++;
      } else {
        timeLeft -= 10;
      }
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
      } else {
        showGameOver();
      }
    });
  });
}

function showGameOver() {
  resultContainer.classList.add('hide');
  gameOverContainer.classList.remove('hide');
  finalScoreElement.innerText = `Your final score: ${score}`;
}

function resetState() {
  answerButtons.forEach(button => {
    button.classList.remove('correct');
    button.classList.remove('wrong');
  });
}

function startTimer() {
  const timerInterval = setInterval(function () {
    if (timeLeft > 0) {
      updateTimer();
      timeLeft--;
    } else {
      clearInterval(timerInterval);
      showGameOver();
    }
  }, 1000);
}

function updateTimer() {
  timerElement.innerText = timeLeft;
}

function saveScore() {
  const initials = initialsInput.value.toUpperCase();
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const newScore = { initials, score };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order

  localStorage.setItem('highScores', JSON.stringify(highScores));
  showHighScores();
}

function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScoresList.innerHTML = highScores
    .map(score => `<li>${score.initials}: ${score.score}</li>`)
    .join('');

  hideContainers();
  highScoresContainer.classList.remove('hide');
}

function hideContainers() {
  questionContainer.classList.add('hide');
  resultContainer.classList.add('hide');
  gameOverContainer.classList.add('hide');
  highScoresContainer.classList.add('hide');
}


