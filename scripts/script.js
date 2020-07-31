// var mystatus = document.querySelector("#mystatus");
// console.log(mystatus);
// mystatus.textContent = "\u2705"; --> checkmark
// mystatus.textContent = "\u274C"; --> x mark

// Global variables
var startButton = document.getElementById('start-button')
var showIfCorrect = document.querySelector(".show-if-correct");
var randomNum = 0;
var randomPick;
var answers = document.querySelector(".answers");
var score = 0;
var secondsLeft = 75;
var timerInterval;

var questions = [
    {   askQuestion: "How many Hawaiian Islands are there total?", 
        answers: [{answer: "137", correct: 1}, {answer: "8", correct: 0}, {answer: "53", correct: 0}, {answer: "94", correct: 0}],
    },
    {   askQuestion: "Which of one of these is not a style of Martial Art?", 
        answers: [{answer: "JiuJitsu", correct: 0}, {answer: "Eskrima", correct: 0}, {answer: "CQC", correct: 1}, {answer: "Aikido", correct: 0}],
    },
    {   askQuestion: "Is the logical expression (4 > 7) || (5 > 2) true or false?", 
        answers: [{answer: true, correct: 1}, {answer: false, correct: 0}]
    }   
];

// Start the trivia
startButton.addEventListener("click", function() {
    document.getElementById("start-display").style.display = "none";
    document.getElementById("questions-display").style.display = "block";
    countDown();
    generateQuestion();
});


function generateQuestion() {
    if (questions.length === 0) {
        displayResults();
        return;
    } 
    // Pick a question at random
    randomNum = Math.floor(Math.random() * questions.length);
    randomPick = questions[randomNum];
    // Set the question
    document.getElementById('ask-question').textContent = randomPick.askQuestion;

    // list the answers
    var answer = document.querySelectorAll(".answer");

    // ensure all answer elements displays are show.
    answer.forEach(element => element.style.display="block");

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
    
}

// When a question is picked, let the user now whether question is correct 
// and generate a new questions
answers.addEventListener("click", function(event) {
   // If there are no more questions, stop quiz
    
    var element = event.target;

    // Check if answer is correct
    var elementIndex =  element.getAttribute("data-index")

    var showIfCorrect = document.querySelector(".show-if-correct");
    showIfCorrect.classList.add("border-top");
    // Check if answer is correct
    console.log(randomPick.answers[elementIndex])
    if (randomPick.answers[elementIndex].correct === 1) {
        showIfCorrect.textContent = "Correct!";
        console.log("correct")
        score += 10;
    } else {
        showIfCorrect.textContent = "Incorrect";
        secondsLeft -= 10;
    }
    
    setInterval(function() {
        showIfCorrect.textContent = "";
        showIfCorrect.classList.remove("border-top");
    }, 2000);

    questions.splice(randomNum, 1);
    console.log(questions.length)
    if (questions.length === 0) {
        stopTimer()
        stopQuiz();
        return;
    } 

    generateQuestion();
})

function countDown() {
    var quizTime = document.getElementById("quiz-time");

    timerInterval = setInterval(function() {
        secondsLeft--;
        quizTime.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0 || questions.length < 0) {
            clearInterval(timerInterval);
            // If seconds is 0, stop quiz
            stopQuiz();
        }
    }, 1000)
}

// Stop timer
function stopTimer() {
    clearInterval(timerInterval);
}

function stopQuiz() {
    document.getElementById("questions-display").style.display = "none";
    document.getElementById("results-display").style.display = "block";
    document.getElementById("display-score").innerHTML = "Your final score is " + score;

}

// TODO: work on this function to display results to user
function displayResults() {
    console.log("Done!");
}