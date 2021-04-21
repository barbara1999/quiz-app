const highScoresList=document.getElementById('high-scoreslist');
const highScores=JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores);