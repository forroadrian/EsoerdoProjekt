document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const wrapper = document.querySelector(".screen-wrapper");

  startBtn.addEventListener("click", () => {
    wrapper.classList.add("show-quiz");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".screen-wrapper");
  const startBtn = document.getElementById("start-btn");
  const quizScreen = document.getElementById("quiz-screen");
  const startScreen = document.getElementById("start-screen");
  const exitBtn = quizScreen.querySelector(".buttonmenu button.btn-light");
  const questionNumberDisplay = quizScreen.querySelector(".rounded-circle");
  const timerDisplay = quizScreen.querySelector(".timer");
  
  let questionIndex = 1;
  let totalQuestions = 5; 
  let timeLeft = 20;
  let timerInterval;


  startBtn.addEventListener("click", () => {
    wrapper.classList.add("show-quiz");
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    startQuiz();
  });

  function startQuiz() {
    questionIndex = 1;
    updateQuestionNumber();
    startTimer();
  }

  function updateQuestionNumber() {
    questionNumberDisplay.textContent = questionIndex;
  }


  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;
    timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        nextQuestion();
      }
    }, 1000);
  }

  function nextQuestion() {
    if (questionIndex < totalQuestions) {
      questionIndex++;
      updateQuestionNumber();
      startTimer();
    } else {
      clearInterval(timerInterval);
      alert("Játék vége!");
    }
  }


  exitBtn.addEventListener("click", () => {
    const confirmModal = new bootstrap.Modal(document.getElementById("exitModal"));
    confirmModal.show();
  });

  document.getElementById("confirm-exit").addEventListener("click", () => {
    clearInterval(timerInterval);
    quizScreen.style.display = "none";
    startScreen.style.display = "block";
    wrapper.classList.remove("show-quiz");
    const modal = bootstrap.Modal.getInstance(document.getElementById("exitModal"));
    modal.hide();
  });

const answerButtons = quizScreen.querySelectorAll(".answers button");

answerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    answerButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});
});
