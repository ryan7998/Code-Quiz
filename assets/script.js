var body = document.body;
var corrAnsSum = 0;
let flag = 0;
// Question answers:
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
			a: '3',
			b: '5',
			c: '10'
		},
		correctAnswer: 'c'
	}
];

var startBtnEl = document.createElement("button");
startBtnEl.innerText="Start Test";

var checkAnsBtn = document.createElement("button");
checkAnsBtn.innerText="Next Question";

var h1El = document.createElement('h1');
h1El.textContent = 'Welcome to my page';

var h2El = document.createElement('h2');
h2El.textContent = 'This is a timed coding quiz with multiple-choice questions';

var fpageDiv = document.createElement('div');
body.appendChild(fpageDiv);

var timerDiv = document.createElement('div');
body.appendChild(timerDiv);

var qaDiv = document.createElement('div');
body.appendChild(qaDiv);

var qDiv = document.createElement('div');
qaDiv.appendChild(qDiv);

var aDiv = document.createElement('div');
qaDiv.appendChild(aDiv);

fpageDiv.appendChild(startBtnEl);
fpageDiv.appendChild(h1El);
fpageDiv.appendChild(h2El);

body.setAttribute('style', 'font-family: sans-serif;');
fpageDiv.setAttribute('style', 'margin-top: 5em; display: flex; flex-direction: column; align-items: center; justify-content: center;');
startBtnEl.setAttribute('style', 'width: 20%; height: 100px; background: #171f4f; color: #fff; font-size: 2em; border-radius: 10px;');

// Start Timer Function:
function startTimer(){
    var timeLeft = 5;
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
    body.textContent="";
    body.textContent="Time Up. Your final score is: " + corrAnsSum + ".";
}

// function show questions
function showQuestion(question){
    var ques = question.question;
    var ans = question.answers;
    var corAns = question.correctAnswer;

    if(printQuestion(ques, ans, corAns)){
        checkAnsBtn.addEventListener("click", checkCorrectAnswers());
    }
}

// function print questions
function printQuestion(ques, ans, corAns){
    qDiv.textContent = "";
    aDiv.textContent="";
    qDiv.textContent += ques;
    for(letter in ans){
        aDiv.innerHTML += 
        '<label>'
            + '<input type="radio" name="question" value="'+letter+'">'
            + letter + ': '
            + ans[letter]
        + '</label>';
    }
    body.appendChild(checkAnsBtn);
    checkAnsBtn.setAttribute('correctans', corAns);
    checkAnsBtn.addEventListener("click", checkAnswerHandler);
}

//function check answers:
var checkAnswerHandler = function(event) {
    var getSelected = document.querySelector('input[name="question"]:checked').value;
    var targetEl = event.target.getAttribute("correctans");
    
    if(getSelected === targetEl){
        corrAnsSum++;
    }
    flag++; 
    startQuiz(flag);
}

// Start Quiz Function:
function startQuiz(){
    console.log(flag, quizQuestions.length);
    //var i=0;
 
    if(flag < quizQuestions.length ){
        showQuestion(quizQuestions[flag]);
    }else{
        console.log("Score: " + corrAnsSum);
    }
}

// Start button Function:
var startBtnHandler = function(event){
    fpageDiv.textContent="";
    startTimer();
    startQuiz();
}

// Start button click:
startBtnEl.addEventListener("click", startBtnHandler);
