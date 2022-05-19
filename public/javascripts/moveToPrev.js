const prevButton = document.querySelector(".prevButton");

if (prevButton) {
  prevButton.addEventListener("click", () => {
    window.history.back();
  });
}
