var body = document.body;
var corrAnsSum = 0;
var flag = 0;
var timeLeft = 0;
var highscore = 0;
var highScorearr = [];
var finalScore = 0;
var timeInterval = 0;

// Question Bank:
var quizQuestions = [
	{
		question: "Is JavaScript a case-sensitive language?",
		answers: {
			a: 'True',
			b: 'False'
		},
		correctAnswer: 'a'
	},
	{
		question: "Which of the following is a valid type of function javascript supports?",
		answers: {
			a: 'named function',
			b: 'anonymous function',
            c: 'Both of the above',
            d: 'None of the above'
		},
		correctAnswer: 'c'
    },
    {
		question: "Which built-in method removes the last element from an array and returns that element?",
		answers: {
			a: 'last()',
			b: 'get()',
            c: 'pop()',
            d: 'None of the above'
		},
		correctAnswer: 'c'
    },
    {
		question: "Which of the following code creates an object?",
		answers: {
			a: 'var book = Object();',
			b: 'var book = new Object();',
            c: 'var book = new OBJECT();',
            d: 'var book = new Book();'
		},
		correctAnswer: 'b'
    },
    {
		question: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
		answers: {
			a: 'toSource()',
			b: 'valueOf()',
            c: 'toString()',
            d: 'None of the above'
		},
		correctAnswer: 'a'
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
hscoreDiv.querySelector('a').setAttribute('style', 'text-decoration:none');


var timerDiv = document.createElement('div');
headerDiv.appendChild(hscoreDiv);
headerDiv.appendChild(timerDiv);

body.appendChild(headerDiv);

var mainDiv = document.createElement('div');
var footerDiv = document.createElement('div');


var qaDiv = document.createElement('div');

var qDiv = document.createElement('h1');
qaDiv.appendChild(qDiv);

var aDiv = document.createElement('div');
qaDiv.appendChild(aDiv);

mainDiv.appendChild(qaDiv);
body.appendChild(mainDiv);

body.appendChild(footerDiv);

var resultDiv = document.createElement('h2');
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
btnSaveScore.setAttribute('style', 'background: #171f4f; color: #fff; border-radius: 5px; padding:5px; margin: 0 10px');

// button to go back:
var btnGoback = document.createElement('button');
btnGoback.innerText="Go back";
btnGoback.setAttribute('style', 'background: #171f4f; color: #fff; border-radius: 5px; padding:5px; margin: 0 10px');

// button clear high score:
var btnClearScore = document.createElement('button');
btnClearScore.innerText="Clear Score";
btnClearScore.setAttribute('style', 'background: #171f4f; color: #fff; border-radius: 5px; padding:5px; margin: 0 10px');


// set css style:
body.setAttribute('style', 'font-family: sans-serif; font-family: sans-serif; padding: 20px; margin: 20px;');
headerDiv.setAttribute('style', 'display: flex; justify-content: space-between; margin:20px;');
fpageDiv.setAttribute('style', 'margin-top: 5em; display: flex; flex-direction: column; align-items: center; justify-content: center;');
startBtnEl.setAttribute('style', 'width: 20%; height: 100px; background: #171f4f; color: #fff; font-size: 2em; border-radius: 10px;');

// Start Timer Function:
function startTimer(){
    timeLeft = 2000;
    timeInterval = setInterval(function() {
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
    finalScore = timeLeft;
    clearInterval(timeInterval);
    timerDiv.textContent="";
    mainDiv.innerHTML="<h2>All Done!!</h2> Your final score is: " + finalScore + ".</br></br>";
    
    // Show input and button to sace high score
    mainDiv.innerHTML += "<label>Enter Initials: </label>";
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
    var all = document.getElementsByClassName('linkbutton');
    for (var i = 0; i < all.length; i++) {
        all[i].setAttribute('style', 'text-align: center; color: white; background: #171f4f; padding: 10px; text-decoration: none; border-radius: 5px; width: 100px;');
    }
    aDiv.setAttribute('style', 'display:flex; flex-direction:column');
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
    resultDiv.setAttribute('style', 'font-style: italic; color: grey; border-top: 2px solid; padding: 10px;');
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
    fpageDiv.textContent='';
    headerDiv.textContent='';
    footerDiv.textContent='';

    var highScorearr = JSON.parse(localStorage.getItem("highscoredetails"));

    if(highScorearr != null){
        for(i = 0; i<highScorearr.length; i++){
            mainDiv.innerHTML += 'Name: '+ highScorearr[i].initials + '. High Score: ' + highScorearr[i].highscore + "</br>";
        }
    }else{
        mainDiv.textContent = 'No High score set yet';
    }
    mainDiv.appendChild(btnGoback);
    mainDiv.appendChild(btnClearScore);
}

// Start button Function:
var startBtnHandler = function(event){
    fpageDiv.remove();
    startTimer();
    startQuiz();
}

// Save high score Handler:
var saveHighScoreHandler = function(event){
    var getInitials = document.getElementById('hscoreEl').value;
    //console.log(getInitials);
    if(getInitials == ""){
        alert('Please Enter your initials ');
    }else{
        // create obj for high score:
        var highScoreObj = {
            initials: getInitials,
            highscore: finalScore
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
        getHighScore();
    }
}

// Back Button Handler:
var backButtonHandler = function(event){
    location.reload();
}
var clearScoreHandler = function(event){
    localStorage.clear();
    location.reload();
}

// Start button click:
startBtnEl.addEventListener("click", startBtnHandler);

// Save High Score button Click:
btnSaveScore.addEventListener("click", saveHighScoreHandler);

// Go Back button Click:
btnGoback.addEventListener("click", backButtonHandler);

btnClearScore.addEventListener("click", clearScoreHandler);