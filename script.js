//document object model-to access html document in js
const info_box = document.querySelector(".info_box");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

info_box.classList.add("activeInfo");

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuetions(0); //called to display the 1st question
  queCounter(1); //passing 1 parameter to queCounter or set the quescounter
  startTimer(10); //initiate the timer
  // startTimerLine(0); //calling startTimerLine function
};
//variables are intialized to manage the quiz state
let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  showQuetions(que_count); //to display the 1st question
  queCounter(que_numb); //update the ques counter
  clearInterval(counter); //stop timer
  startTimer(timeValue); //restart the timer
  timeText.textContent = "Time Left"; //change the text of timeText to Time Left
  next_btn.classList.remove("show"); //hide the skip button
};

quit_quiz.onclick = () => {
  window.location.href = "index.html";
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
    // timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
  } else {
    clearInterval(counter);

    showResult(); 
  }
};

function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>";
  '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.remove("selected");
  }

  answer.classList.add("selected");

  if (userAns == correcAns) {
    userScore += 5;
    console.log("Correct Answer");
  } else {
    userScore -= 1;
    console.log("Wrong Answer");
  }
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  nextQuestion();
}
function nextQuestion() {
  if (que_count < questions.length - 1) {
    que_count++; // increment the que_count value
    que_numb++; // increment the que_numb value
    showQuetions(que_count); // show the next question
    queCounter(que_numb); // update the question counter
    time = 10;
    startTimer(timeValue); // start the timer for the next question
  } else {
    clearInterval(counter); // clear counter
    showResult();
  }
}

function showResult() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");

  var name = localStorage.getItem("name");

  let scoreTag =
    "<span> Hi <p>," +
    name +
    "</p> You got only <p>" +
    userScore +
    "</p> out of <p>" +
    questions.length * 5 +
    "</p></span>";
  scoreText.innerHTML = scoreTag;
}
function startTimer(time) {
  clearInterval(counter);
  timeCount.textContent = time;

  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      nextQuestion();
      startTimer(timeValue);

      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
        }
      }
    }
  }
}
function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
