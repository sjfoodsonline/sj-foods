const themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("sj_theme", isDark ? "dark" : "light");
};
if(localStorage.getItem("sj_theme") === "dark"){
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}
