var body = document.body;
var corrAnsSum = 0;
var flag = 0;
var timeLeft = 0;
var highscore = 0;
var highScorearr = [];

// Question Bank:
var quizQuestions = [
	{
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
	{
		question: "What is 30/3?",
		answers: {
			a: '4',
			b: '8',
			c: '10'
		},
		correctAnswer: 'c'
	}
];

var startBtnEl = document.createElement("button");
startBtnEl.innerText="Start Test";

// Create first page Elements:

var h1El = document.createElement('h1');
h1El.textContent = 'Welcome to my page';

var h2El = document.createElement('h2');
h2El.textContent = 'This is a timed coding quiz with multiple-choice questions';

var fpageDiv = document.createElement('div');
body.appendChild(fpageDiv);

var headerDiv = document.createElement('div');
var hscoreDiv = document.createElement('div');

hscoreDiv.innerHTML = '<a onclick="getHighScore()" href="javascript:;"> Show High Score </a>';

var timerDiv = document.createElement('div');
headerDiv.appendChild(hscoreDiv);
headerDiv.appendChild(timerDiv);

body.appendChild(headerDiv);

var mainDiv = document.createElement('div');
var footerDiv = document.createElement('div');


var qaDiv = document.createElement('div');

var qDiv = document.createElement('div');
qaDiv.appendChild(qDiv);

var aDiv = document.createElement('div');
qaDiv.appendChild(aDiv);

mainDiv.appendChild(qaDiv);
body.appendChild(mainDiv);

body.appendChild(footerDiv);

var resultDiv = document.createElement('div');
footerDiv.appendChild(resultDiv);

// first page:
fpageDiv.appendChild(startBtnEl);
fpageDiv.appendChild(h1El);
fpageDiv.appendChild(h2El);

// input for high score:
var inputSaveScore = document.createElement('input');
inputSaveScore.id = 'hscoreEl';

// button to save high score:
var btnSaveScore = document.createElement('button');
btnSaveScore.innerText="Save High Score";

// set css style:
body.setAttribute('style', 'font-family: sans-serif; font-family: sans-serif; padding: 20px; margin: 20px;');
headerDiv.setAttribute('style', 'display: flex; justify-content: space-between; margin:20px;');
fpageDiv.setAttribute('style', 'margin-top: 5em; display: flex; flex-direction: column; align-items: center; justify-content: center;');
startBtnEl.setAttribute('style', 'width: 20%; height: 100px; background: #171f4f; color: #fff; font-size: 2em; border-radius: 10px;');

// Start Timer Function:
function startTimer(){
    timeLeft = 2000;
    var timeInterval = setInterval(function() {
        timerDiv.textContent = 'Time Left: ' + timeLeft + ' s';
        timeLeft--;
        if(timeLeft == 0){
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

// function end quiz:
function endQuiz(){
    mainDiv.textContent="Time Up. Your final score is: " + timeLeft + ".";
    
    // Show input and button to sace high score
    mainDiv.appendChild(inputSaveScore);
    mainDiv.appendChild(btnSaveScore);
}


// function show questions
function showQuestion(question){
    var ques = question.question;
    var ans = question.answers;
    var corAns = question.correctAnswer;
    
    // call print questions function: 
    printQuestion(ques, ans, corAns);
}

// function print questions
function printQuestion(ques, ans, corAns){
    qDiv.textContent = "";
    aDiv.textContent="";
    qDiv.textContent += ques;
    for(letter in ans){
        aDiv.innerHTML +=        
        '<a class="linkbutton" onclick="check(event)" href="javascript:;" value = ' + letter + ' correctans = ' + corAns + '>' + letter + ': ' + ans[letter] + '</a>' + '</br>';
    }
}

function check(event) {
    var getAns = event.target.getAttribute("value");
    var correctAns = event.target.getAttribute("correctans");
    if(getAns === correctAns){
        corrAnsSum++;
        resultDiv.textContent = "Correct Answer";
    }
    else{
        timeLeft = timeLeft - 10;
        
        resultDiv.textContent = "Wrong Answer";
    }
    flag++; 
    startQuiz(flag);
}


// Start Quiz Function:
function startQuiz(){
    if(flag < quizQuestions.length ){
        showQuestion(quizQuestions[flag]);
    }else{
        endQuiz();
    }
}

function getHighScore(){
    mainDiv.textContent = '';

    var highScorearr = JSON.parse(localStorage.getItem("highscoredetails"));

    if(highScorearr != null){
        for(i = 0; i<highScorearr.length; i++){
            mainDiv.innerHTML += 'Name: '+ highScorearr[i].initials + '. High Score: ' + highScorearr[i].highscore + "</br>";
        }
    }else{
        mainDiv.textContent = 'No High score set yet';
    }
}

// Start button Function:
var startBtnHandler = function(event){
    fpageDiv.remove();
    startTimer();
    startQuiz();
}
var saveHighScoreHandler = function(event){
    var getInitials = document.getElementById('hscoreEl').value;
    //console.log(getInitials);
    if(getInitials == ""){
        alert('Please Enter your initials ');
    }else{
        // create obj for high score:
        var highScoreObj = {
            initials: getInitials,
            highscore: timeLeft
        };

        var highScorearr = JSON.parse(localStorage.getItem("highscoredetails"));

        if(highScorearr != null){   // if highscore array is not empty:
            highScorearr.push(highScoreObj);
            highScorearr = highScorearr.sort((a, b) => (a.highscore > b.highscore) ? -1 : 1);   // sort array by high score
        }else{
            highScorearr=[];
            highScorearr.push(highScoreObj);
        }
        localStorage.setItem("highscoredetails", JSON.stringify(highScorearr));
    }
}
// Start button click:
startBtnEl.addEventListener("click", startBtnHandler);

// Save High Score button Click:
btnSaveScore.addEventListener("click", saveHighScoreHandler);
