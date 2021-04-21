const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById("progress-text");
const scoreText=document.getElementById("score");
const progressBarFull=document.getElementById("progress-bar-full")


let currentQuestion={};
let acceptinAnswer=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions =[];

fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple")
    .then(res=>{
        return res.json();
    }).then(loadedQuestions=>{
        console.log(loadedQuestions.results);
        loadedQuestions.results.map(loadedQuestion=>{
            const formattedQuestion={
                question: loadedQuestion.questions
            };

            
            const answerChoices=[...loadedQuestions.incorrect_answers];
            formattedQuestion.answer=Math.floor(Math.random()*3)+1;
           answerChoices.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer);


        })
       // questions=loadedQuestions;
        //startGame();
    })
    .catch(err=>{
        console.error(err);
    })
    



const CORRECT_BONUS=10;
const MAX_QUESTIONS=4;

startGame =()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
}

getNewQuestion=()=>{

    if(availableQuestions.length==0 || questionCounter>=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        //go to the end page
        return window.location.assign("/end.html")
    }
    questionCounter++;

    progressText.innerText=`Question ${questionCounter}/${MAX_QUESTIONS}`;

    //update the progress bar
    
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionIndex=Math.floor(Math.random()*availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>{
        const number=choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+number];
    })

    availableQuestions.splice(questionIndex,1)
    acceptinAnswer=true;

}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptinAnswer)return;

        acceptinAnswer=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset["number"];

        let classToApplay='incorrect';

        if(selectedAnswer==currentQuestion.answer){
            classToApplay='correct';
        }

        if(classToApplay=='correct'){
            incremenetScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApplay);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApplay);
            getNewQuestion();
        },1000)
        

       
    })
})

incremenetScore=num=>{
    score+=num;
    scoreText.innerHTML=score;
}



