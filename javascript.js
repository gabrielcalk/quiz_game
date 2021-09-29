// Passing all the ID and HTML from the html to the JS file in a const
const view_scores = document.querySelector('#view_scores');
const buttons_high_score = document.querySelector('.buttons_high_score');
const countdown = document.querySelector('.countdown');
const title = document.querySelector('.title');
const tag_p = document.querySelector('#explanation');
const button = document.querySelector('.glow-on-hover');
const choiceDiv = document.getElementById('choices');
const section_game = document.querySelector('#section_game');
const show_score = document.querySelector('#show_score');
const section_last_page = document.querySelector('#section_last_page');
const btn_submit = document.querySelector('#btn_submit');
const ul_dom = document.querySelector('#ul_dom');

// Declarating the time and the current index for the questions loops
let currentIndex = 0;
var time;
var timer_html;

// Getting the data from the local storage and adding on one const
const storedUserName = JSON.parse(localStorage.getItem('storedUserName')) || []

// Showing the scores if the user click on the "View High Scores"
view_scores.addEventListener('click', function(){

// if the user click to see the score and don't have any, then show one alert about it
    if (storedUserName.length === 0){
        alert("No scores in this moment, play the game to add yours!")
    } else{

// Cleaning the page and adding the scores after the user click on "view highscores"
    view_scores.disabled = true;
    tag_p.classList.add('hide');
    button.classList.add('hide');
    putScoresOnPage();
    }
})

// Creating all the questions that will appear on the game
const myQuestions = [
    {
        question: '2 + 2',
        options: [
        '5',
        '6',
        '4',
        '8',
        ],
        answer: '4'
    },
    {
        question: '7 * 5',
        options: [
            '35', 
            '45',
            '25',
            '15',
        ],
        answer: '35'
    },
    {
        question: '120 / 5',
        options: [
            '23.6',
            '28',
            '23.5',
            '24',
        ],
        answer: '24'
    },
    {
        question: '81 * 14',
        options: [
            '1354',
            '975',
            '1244',
            '1134',
        ],
        answer: '1134'
    },
    {
        question: '98 * 41',
        options: [
            '4014',
            '4018',
            '3958',
            '4821',
        ],
        answer: '4018'
    },
];

// Adding one event to the start the game when the user click on "start quiz"
button.addEventListener('click', startGame);

// Setting a time, cleaning the page and start the functions to show the questions on the page
function startGame() {
    time = 75
    tag_p.classList.add('hide');
    button.classList.add('hide');
    view_scores.classList.add('hide');
    startCountdown();
    startQuestions();
    choiceDiv.removeAttribute('class')
}

// Starting the countdown/scores of the Game, noticed that this only start when the user click on the 'start quiz' button
function startCountdown() {
    countdown.textContent = time;
    timer_html = setInterval (countdownSec, 1000) ;
    function countdownSec() {
        time --
        countdown.textContent = time;

// if the time go to 0, then stop the interval time and then show the user some alert
// Noticed that if the user get 0 on the middle of the game he/she can continue playing
        if (time == 0){
            clearInterval(timer_html)
            alert('Your score is 0 now!')
        }
    }
}

// Creating the question that are on the object on the top of this file
function startQuestions(){
    choiceDiv.innerHTML = '';
    // 4, porem comeca no 0
    let currentQuestion = myQuestions[currentIndex]

// Creating a button and a title for each question and option
    currentQuestion.options.forEach(function(choice, i){
        var choiceButton = document.createElement('button');
        choiceButton.setAttribute('class', 'glow-on-hover')
        choiceButton.setAttribute('value', choice)

        title.textContent = currentQuestion.question;
        choiceButton.textContent = i + 1 + ') ' + ' ' + choice;

        choiceDiv.appendChild(choiceButton);

// When one option/choice is clicked, then start the optionsQuestion functions that will se if that button value match with the answer (if the answer is right or wrong)
        choiceButton.onclick = optionsQuestions;
    });

    var correct = 0;
    var incorrect = 0;

// Function that check if the answer is right ow wrong
    function optionsQuestions() {

// If it is right, then show "correct!"
        if(this.value === myQuestions[currentIndex].answer){
            tag_p.classList.remove('hide')
            tag_p.textContent = 'Correct!';
            correct++

// If it is wrong, then show 'Wrong'
        } else {
            tag_p.classList.remove('hide')
            tag_p.textContent = 'Wrong!';
            incorrect++
            time -= 10;
        }
        currentIndex++;

// If already show all the question, then show the end page (page that let the user put his/her name)
        if(currentIndex === myQuestions.length){
            clearInterval(timer_html)
            showEndPage();  
        }   else{
                startQuestions();
            }
    }
}

// Cleaning the page and showing the page with the points that the user did and an input that hi/she can put an name
function showEndPage() {
    countdown.textContent = time
    tag_p.classList.add('hide');
    btn_submit.classList.add('glow-on-hover');
    title.textContent = 'All done!';
    choiceDiv.parentNode.removeChild(choiceDiv)

    show_score.classList.remove('hide');
    show_score.textContent = 'Your final score is ' + time;
    section_last_page.classList.remove('hide')

// When the user click on 'submit' then start the function to show the scores
    btn_submit.addEventListener('click', getScores)
}

// Getting the score and adding in an object call = score_and_user
function getScores(event) {
    event.preventDefault()
    var playerName = document.querySelector('input[name="player-name"]').value
    if (!playerName){
        alert('Please, provide your name.')
        showEndPage();
    }
    var score_and_user = {
        score: time,
        name: playerName,
    }

    storedUserName.push(score_and_user);
// Setting the score and name from user to the local storage
    localStorage.setItem('storedUserName', JSON.stringify(storedUserName));

// Putting the scores on ascending order
    storedUserName.sort((a,b) => {
        return b.score - a.score 
    })

// Calling the function above
    putScoresOnPage()
}

// cleaning everything on the page and adding the scores
function putScoresOnPage() {

    section_last_page.classList.add('hide')
    ul_dom.classList.remove('hide')

    for(i = 0; i < storedUserName.length; i++){
        var li_scores = document.createElement('li');
        var score_and_name = ul_dom.appendChild(li_scores);
        score_and_name.textContent = " Name: " + storedUserName[i].name + '-> ' + 'Score: ' + storedUserName[i].score
    }

// Calling the function above
    addButtons();
}

// Adding the button "go back" and "Clear Scores" to the final page of the quiz
function addButtons(){

// Creating the button to go back
    var go_back = document.createElement('button');
    go_back.setAttribute('class', 'glow-on-hover');
    go_back.textContent =('Go Back');
    buttons_high_score.appendChild(go_back);

// Adding the event on the button "go back" to reload to the page when the user click
    go_back.addEventListener('click', reloadPage);

    function reloadPage() {
        location.reload()
    }

// Creating the button to clear scores
    var clear_score = document.createElement('button')
    clear_score.setAttribute('class', 'glow-on-hover')
    clear_score.textContent = 'Clear Scores'
    buttons_high_score.appendChild(clear_score);

// Adding the event on the button "Clear Scores" to clear all the data from the local storage when the user click
    clear_score.addEventListener('click', cleanScores)

    function cleanScores() {
        localStorage.removeItem('storedUserName');
        ul_dom.classList.add('hide')

    }
}


