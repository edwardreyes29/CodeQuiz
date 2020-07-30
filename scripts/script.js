// var mystatus = document.querySelector("#mystatus");
// console.log(mystatus);
// mystatus.textContent = "\u2705"; --> checkmark
// mystatus.textContent = "\u274C"; --> x mark

var questions = [
    {   askQuestion: "How many Hawaiian Islands are there total?", 
        answers: [{answer: "137", correct: 1}, {answer: "8", correct: 0}, {answer: "53", correct: 0}, {answer: "94", correct: 0}],
    },
    {   askQuestion: "Which of one of these is not a style of Martial Art?", 
        answers: [{answer: "JiuJitsu", correct: 0}, {answer: "Eskrima", correct: 0}, {answer: "CQC", correct: 0}, {answer: "Aikido", correct: 0}],
    },
    {   askQuestion: "Is the logical expression (4 > 7) || (5 > 2) true or false?", 
        answers: [{answer: true, correct: 1}, {answer: false, correct: 0}]
    }
    
]

// Start the trivia
var startButton = document.getElementById('start-button')
startButton.addEventListener("click", function() {
    var mainDisplay = document.getElementById("main-display");
    mainDisplay.style.display = "none";
    countDown();
    generateQuestion();
});

var randomNum = 0;
function generateQuestion() {

    console.log("before splice");
    questions.forEach(element => console.log(element));
    
    // Pick a question at random
    randomNum = Math.floor(Math.random() * questions.length);
    var randomPick = questions[randomNum];
    // Set the question
    document.getElementById('ask-question').textContent = randomPick.askQuestion;

    // list the answers
    var answer = document.querySelectorAll(".answer");
    for (var i = 0; i < randomPick.answers.length; i++) {
        answer[i].textContent = randomPick.answers[i].answer;

        // for true or false questions
        if (randomPick.answers.length === 2 && i === 1) {
            for (var j = 0, k = i + 1; j < 2; j++, k++) {
                answer[k].style.display = "none";
            }
        }
    } // end for loop
     // remove question from question array
    questions.splice(randomNum, 1);
}


function countDown() {
    var quizTime = document.getElementById("quiz-time");
    
    var secondsLeft = 75;

    var timerInterval = setInterval(function() {
        secondsLeft--;
        quizTime.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            alert("Times up!");
        }

    }, 1000)
}