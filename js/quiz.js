document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const wrapper = document.querySelector(".screen-wrapper");

  startBtn.addEventListener("click", () => {
    wrapper.classList.add("show-quiz");
  });
});
