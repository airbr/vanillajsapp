
var app = document.getElementById("app");
window.run = function() { app.innerText="Fun!"; };
app.innerHTML = '<button onclick="run()">Load</button>';
