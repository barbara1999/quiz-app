const highScoresList=document.getElementById('high-scores-list');
const highScores=JSON.parse(localStorage.getItem('highScores')) || [];

let counter=1;

highScoresList.innerHTML=highScores.
    map(score=>{
        
    return `<li class="high-score">${counter++}. ${score.name} - ${score.score}</li>`;
})
.join("");

console.log(highScores);