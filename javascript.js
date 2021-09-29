const title = document.querySelector('.title')
const button = document.querySelector('.button');
const countdown = document.querySelector('.countdown');
const choiceDiv = document.getElementById('choices');
const section_game = document.querySelector('#section_game')
const tag_p = document.querySelector('#explanation')
const show_score = document.querySelector('#show_score')
const section_last_page = document.querySelector('#section_last_page')
const btn_submit = document.querySelector('#btn_submit')
const ul_dom = document.querySelector('#ul_dom')
const buttons_high_score = document.querySelector('.buttons_high_score')

let currentIndex = 0;
var time;
var timer_html;


const storedUserName = JSON.parse(localStorage.getItem('storedUserName')) || []


const myQuestions = [
    {
        question: 'Who is the most handsome person in the house?',
        options: [
        'Gabriel',
        'Trey',
        'Snoopy',
        'Trey fishs',
        ],
        answer: 'Gabriel'
    },
    {
        question: 'Who is the person who poops the most',
        options: [
            'Mark Texas', 
            'Mark Terril',
            'Snoopy',
            'All the options above',
        ],
        answer: 'All the options above'
    },
    {
        question: 'guess who i am: i know everything!',
        options: [
            'Jillian',
            'Gabriel',
            'Katia',
            'Trey',
        ],
        answer: 'Trey'
    },
    {
        question: 'Who is the most stressed person in the house',
        options: [
            'Trey',
            'Mark',
            'Jillian',
            'Katia',
        ],
        answer: 'Katia'
    },
    {
        question: 'Who is the fastest?',
        options: [
            '2 times Mark',
            'Trey',
            'Gabriel',
            'Snoopy',
        ],
        answer: 'Gabriel'
    },
];

button.addEventListener('click', startGame);

function startGame() {
    time = 75
    tag_p.classList.add('hide');
    button.classList.add('hide');
    startCountdown();
    startQuestions();
    choiceDiv.removeAttribute('class')
}

function startCountdown() {
    countdown.textContent = time;
    timer_html = setInterval (countdownSec, 1000) ;
    function countdownSec() {
        time --
        countdown.textContent = time;
        if (time == 0){
            clearInterval(timer_html)
        }
    }
}

function startQuestions(){
    choiceDiv.innerHTML = '';
    // 4, porem comeca no 0
    let currentQuestion = myQuestions[currentIndex]

    currentQuestion.options.forEach(function(choice, i){
        var choiceButton = document.createElement('button');
        choiceButton.setAttribute('class', 'button')
        choiceButton.setAttribute('value', choice)

        title.textContent = currentQuestion.question;
        choiceButton.textContent = i + 1 + '. ' + choice;

        choiceDiv.appendChild(choiceButton);
        choiceButton.onclick = optionsQuestions;
    });

    var correct = 0;
    var incorrect = 0;

    function optionsQuestions() {
    
        if(this.value === myQuestions[currentIndex].answer){
            tag_p.classList.remove('hide')
            tag_p.textContent = 'Correct!';
            correct++

        } else {
            tag_p.classList.remove('hide')
            tag_p.textContent = 'Wrong!';
            incorrect++
            time -= 10;
        }
        currentIndex++;

        if(currentIndex === myQuestions.length){
            clearInterval(timer_html)
            showEndPage();  
        }   else{
                startQuestions();
            }
    }
}

function showEndPage() {
    countdown.textContent = time
    tag_p.classList.add('hide');
    btn_submit.classList.add('button');
    title.textContent = 'All done!';
    choiceDiv.parentNode.removeChild(choiceDiv)

    show_score.classList.remove('hide');
    show_score.textContent = 'Your final score is ' + time;
    section_last_page.classList.remove('hide')

    btn_submit.addEventListener('click', getScores)
}

function getScores(event) {
    event.preventDefault()
    var playerName = document.querySelector('input[name="player-name"]').value

    var score_and_user = {
        score: time,
        name: playerName,
    }

    storedUserName.push(score_and_user);
    
    localStorage.setItem('storedUserName', JSON.stringify(storedUserName));
    // localStorage.setItem('score', JSON.stringify(time)); 

    putScoresOnPage()
}

function putScoresOnPage() {

    section_last_page.classList.add('hide')
    ul_dom.classList.remove('hide')

    for(i = 0; i < storedUserName.length; i++){
        var li_scores = document.createElement('li');
        var score_and_name = ul_dom.appendChild(li_scores);
        score_and_name.textContent = 'Score: ' + storedUserName[i].score + " Name: " + storedUserName[i].name
    }
    addButtons();
}

function addButtons(){
    var go_back = document.createElement('button');
    go_back.setAttribute('class', 'button');
    go_back.textContent =('Go Back');
    buttons_high_score.appendChild(go_back);

    go_back.addEventListener('click', reloadPage);

    function reloadPage() {
        location.reload()
    }

    var clear_score = document.createElement('button')
    clear_score.setAttribute('class', 'button')
    clear_score.textContent = 'Clear Scores'
    buttons_high_score.appendChild(clear_score);
    clear_score.addEventListener('click', cleanScores)

    function cleanScores() {
        localStorage.removeItem('storedUserName');
        ul_dom.classList.add('hide')

    }
}


