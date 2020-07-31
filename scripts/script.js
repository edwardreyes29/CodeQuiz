// Global variables
var randomNum = 0;  // To store a randomly generated number
var randomPick;     // To store a randomly chosen question from questions array  
var score = 0;      // Keeps track of players score
var secondsLeft = 120;   // Time set for quiz
var timerInterval;  // to control the timer
var quizTakers = [];    // to store quiz takers objects
// Sort high scores to highest to lowest
var sortedArray;

// Initialize quizTakers array with store quizTakers scores and initials
initQuizTakers();

// Display high score
function showHighest() {
    sortedArray = mergeSort(quizTakers);
    document.getElementById("show-highest").textContent = "High Score: " + sortedArray[0].score;
}
showHighest();

// These are the questions to be randomly chosen and displayed
// TODO: Add 15 questions
var questions = [
    {   askQuestion: "How many Hawaiian Islands are there total?", 
        answers: [{answer: "137", correct: 1}, {answer: "8", correct: 0}, {answer: "53", correct: 0}, {answer: "94", correct: 0}],
    },
    {   askQuestion: "Which of one of these is not a style of Martial Art?", 
        answers: [{answer: "JiuJitsu", correct: 0}, {answer: "Eskrima", correct: 0}, {answer: "CQC", correct: 1}, {answer: "Aikido", correct: 0}],
    },
    {   askQuestion: "Is the logical expression (4 > 7) || (5 > 2) true or false?", 
        answers: [{answer: true, correct: 1}, {answer: false, correct: 0}],
    },
    {   askQuestion: "What is the earliest century the guitar instrument can be traced?", 
        answers: [{answer: "16th Century", correct: 0}, {answer: "17th Century", correct: 0}, {answer: "18th Century", correct: 0}, {answer: "15th Century", correct: 1}],
    },
    {   askQuestion: "If A = True and B = True, then (A && B) && (!A || !B) is?", 
        answers: [{answer: true, correct: 0}, {answer: false, correct: 1}],
    }, 
    {   askQuestion: "How many teeth does a typical adult human have?", 
        answers: [{answer: "28", correct: 0}, {answer: "32", correct: 1}, {answer: "37", correct: 0}, {answer: "22", correct: 0}],
    },
    {   askQuestion: "Penicillin was first discovered in what year?", 
        answers: [{answer: "1928", correct: 1}, {answer: "1895", correct: 0}, {answer: "1904", correct: 0}, {answer: "1955", correct: 0}],
    },
    {   askQuestion: "1, 1, 2, 3, 5, 8, 13, ___", 
        answers: [{answer: "34", correct: 0}, {answer: "17", correct: 0}, {answer: "21", correct: 1}, {answer: "55", correct: 0}],
    },


];

// Start the trivia
var startButton = document.getElementById('start-button')
startButton.addEventListener("click", function() {
    event.preventDefault();
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
var answers = document.querySelector(".answers");
answers.addEventListener("click", function(event) {
    event.preventDefault();
   // If there are no more questions, stop quiz
    var element = event.target;

    // Check if answer is correct
    var elementIndex =  element.getAttribute("data-index")

    // Check if answer is correct
    if (randomPick.answers[elementIndex].correct === 1) {
        showCorrect()
        score += 10;
    } else {
        showIncorrect()
        secondsLeft -= 10;
    }

    questions.splice(randomNum, 1);
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

// Displays "Correct!" if the user gets the right answer
var showIfCorrect = document.querySelector(".show-if-correct");
function showCorrect() {
    showIfCorrect = document.querySelector(".show-if-correct");
    showIfCorrect.classList.add("border-top");
    showIfCorrect.textContent = "Correct!";

    setInterval(function() {
        showIfCorrect.textContent = "";
        showIfCorrect.classList.remove("border-top");
    }, 2000);
}

// Displays "Incorrect!" if the user gets the wrong answer
function showIncorrect() {
    showIfCorrect = document.querySelector(".show-if-correct");
    showIfCorrect.classList.add("border-top");
    showIfCorrect.textContent = "Incorrect";

    setInterval(function() {
        showIfCorrect.textContent = "";
        showIfCorrect.classList.remove("border-top");
    }, 2000);
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

// Add event listener to initial-submit
var initialSubmit = document.getElementById("initial-submit");
initialSubmit.addEventListener("click", function() {
    event.preventDefault();
    var enteredInitials = document.getElementById("enterInitials").value.trim();
    console.log(enteredInitials);

    // Make sure enteredInitials is not an empty string
    if (enteredInitials.length === 0) {
        console.log(true);
        document.getElementById("enterInitials").classList.add("is-invalid");
        return;
    }
    document.getElementById("enterInitials").classList.remove("is-invalid");
    document.getElementById("enterInitials").classList.add("is-valid");

    // Create a player object to store initials and score
    var quizTakerObj = {
        initials: enteredInitials,
        score: score  
    };
    quizTakers.push(quizTakerObj);
    storeQuizTakers();
    showHighScores();
})

function storeQuizTakers() {
    // Add code here to stringify the todos array and save it to the "todos" key in localStorage
    localStorage.setItem("quizTakers", JSON.stringify(quizTakers))
}

function initQuizTakers() {
    var storedQuizTakers = JSON.parse(localStorage.getItem("quizTakers"));
    if (storedQuizTakers !== null) {
        for(var i = 0; i < storedQuizTakers.length; i++) {
            quizTakers.push(storedQuizTakers[i]);
        } 
    }   
}

function showHighScores() {
    showHighest();
    document.getElementById("results-display").style.display = "none";
    document.getElementById("high-scores-display").style.display = "block";

    // Display results in score board.
    sortedArray = mergeSort(quizTakers);
    for (var i = 0; i < sortedArray.length; i++) {
        var quizTaker = sortedArray[i];
        var li = document.createElement("li");
        li.textContent = (i + 1) + ". " + quizTaker.initials + " - " + quizTaker.score;
        li.classList.add("quiz-taker");
        li.classList.add("list-group-item");
        li.classList.add("list-group-item-action");
        li.classList.add("btn")
        document.getElementById("scoreboard").appendChild(li);
    }
}

// Merge sort:
// reference: https://medium.com/javascript-in-plain-english/javascript-merge-sort-3205891ac060
function mergeSort(arr) {
    // if array only has 1 element, no need to sort
    if (arr.length <= 1) {
        return arr;
    }

    // find the middle
    const middle = Math.floor(arr.length / 2);

    // divide array into left and right
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // use recursion to combine left and right
    return merge(mergeSort(left), mergeSort(right));
}

// Merge two arrays: left and right
function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // Concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].score > right[rightIndex].score) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
        }
    }

    // Concat arrays
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

// TODO: add functions to go back, clear scores, and play again( will require to reset scores)