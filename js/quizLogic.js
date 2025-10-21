document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const exitBtn = document.getElementById("exit-btn");
    const nextBtn = document.getElementById("next-btn");

    const screenWrapper = document.querySelector(".screen-wrapper");
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");

    const answersBox = quizScreen.querySelector(".answers");
    const questionTitle = quizScreen.querySelector("h5");
    const questionNumber = quizScreen.querySelector(".tasknumber");
    const timerDisplay = quizScreen.querySelector(".timer");

    const correctCountDisplay = quizScreen.querySelectorAll("small strong")[0];
    const wrongCountDisplay = quizScreen.querySelectorAll("small strong")[1];
    const difficultySelect = startScreen.querySelector("select");
  
    let questions = [];
    let currentIndex = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let timer = null;
    let timeLeft = 20;
    let answered = false;
    let canGoNext = false;
  
    const showNext = () => {
      nextBtn.style.visibility = "visible";
      nextBtn.disabled = false;
      canGoNext = true;
    };
  
    const hideNext = () => {
      nextBtn.style.visibility = "hidden";
      nextBtn.disabled = true;
      canGoNext = false;
    };
  
    const resetQuiz = () => {
      clearInterval(timer);
      currentIndex = 0;
      correctCount = 0;
      wrongCount = 0;
      timeLeft = 20;
      answered = false;
      canGoNext = false;
      correctCountDisplay.textContent = correctCount;
      wrongCountDisplay.textContent = wrongCount;
      hideNext();
    };
  
    startBtn.addEventListener("click", () => {
      const difficulty = difficultySelect.value;
      questions = (difficulty === "0") ? window.easyQuestions : window.hardQuestions;
  
      if (!questions || questions.length === 0) {
        alert("Nincsenek kérdések a kiválasztott nehézséghez.");
        return;
      }
  
      resetQuiz();
      screenWrapper.classList.add("show-quiz");
      loadQuestion();
    });
  
    exitBtn.addEventListener("click", () => {
      const modal = new bootstrap.Modal(document.getElementById("exitModal"));
      modal.show();
  
      document.getElementById("confirm-exit").onclick = () => {
        modal.hide();
        screenWrapper.classList.remove("show-quiz");
        resetQuiz();
      };
    });
  
    nextBtn.addEventListener("click", () => {
      if (!canGoNext) return;
      clearInterval(timer);
      currentIndex++;
  
      if (currentIndex < questions.length) {
        loadQuestion();
      } else {
        finishQuiz();
      }
    });
  
    const loadQuestion = () => {
      clearInterval(timer);
      timeLeft = 20;
      timerDisplay.textContent = `00:${String(timeLeft).padStart(2, "0")}`;
      answered = false;
      canGoNext = false;
      hideNext();
  
      const q = questions[currentIndex];
      questionTitle.textContent = q.text;
      questionNumber.textContent = currentIndex + 1;
  
      answersBox.innerHTML = "";
      q.answers.forEach((answer, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = "col-11 mx-auto mb-3";
  
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn w-100 text-break d-flex flex-column flex-sm-row align-items-center text-start";
        btn.innerHTML = `
          <strong class="col-sm-0 mx-auto">${String.fromCharCode(65 + i)}</strong>
          <span class="col-sm-12 mx-auto">${answer}</span>
        `;
  
        btn.addEventListener("click", () => {
          if (!answered) handleAnswer(btn, i, q.correctIndex);
        });
  
        wrapper.appendChild(btn);
        answersBox.appendChild(wrapper);
      });
  
      startTimer();
    };
  
    const handleAnswer = (button, index, correctIndex) => {
      const buttons = answersBox.querySelectorAll("button");
      buttons.forEach(b => b.disabled = true);
      clearInterval(timer);
      answered = true;
  
      if (index === correctIndex) {
        button.classList.add("selected");
        correctCount++;
        correctCountDisplay.textContent = correctCount;
      } else {
        button.classList.add("wrong");
        if (buttons[correctIndex]) buttons[correctIndex].classList.add("selected");
        wrongCount++;
        wrongCountDisplay.textContent = wrongCount;
      }
  
      showNext();
    };
  
    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `00:${String(timeLeft).padStart(2, "0")}`;
        if (timeLeft <= 0) {
          clearInterval(timer);
          handleTimeExpired();
        }
      }, 1000);
    };
  
    const handleTimeExpired = () => {
      const buttons = answersBox.querySelectorAll("button");
      buttons.forEach(b => b.disabled = true);
      const q = questions[currentIndex];
      if (buttons[q.correctIndex]) buttons[q.correctIndex].classList.add("selected");
      wrongCount++;
      wrongCountDisplay.textContent = wrongCount;
      answered = true;
      showNext();
    };
  
    const finishQuiz = () => {
      clearInterval(timer);
      alert(`Kvíz vége!\n Helyes válaszok: ${correctCount}\n Helytelen válaszok: ${wrongCount}`);
      screenWrapper.classList.remove("show-quiz");
      resetQuiz();
    };
  });
  