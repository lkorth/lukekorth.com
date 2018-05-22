document.getElementById("searchform").addEventListener("submit", function(form) {
  location.href = "https://google.com/search?q=site:https://lukekorth.com%20" + document.getElementById("search").value;
  form.preventDefault();
}, false);
