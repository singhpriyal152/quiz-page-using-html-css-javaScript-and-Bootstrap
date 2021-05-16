



const quizDB = [
  {
question:  " 'OS' computer abbreviation usually means?",
a :" Order of Significance",
b : "Open Software",
c : "Operating System",
d: " Optical Sensor",
ans:"ans3"
},

{
question:  " 'MOV' extension refers usually to what kind of file?" ,
a : "image file",
b : "Animation/movie file",
c : "Audio file",
d: "MS Office document",
ans:"ans2"
},

{
question:  " 'DB' computer abbreviation usually means? ",
a :"Database ",
b : " Double Byte",
c : "Data Block",
d: "Driver Boot ",
ans:"ans1"
},


{
question:  "  What do we call a network whose elements may be separated by some distance? It usually involves two or more small networks and dedicated high-speed telephone lines.",
a :" URL (Universal Resource Locator)",
b : "LAN (Local Area Network)",
c : "WAN (Wide Area Network)",
d: " WWW (World Wide Web)",
ans:"ans3"
},

{
question:  " 'MPG' extension refers usually to what kind of file?",
a :" Word Perfect Document file ",
b : " MS Office document",
c : "Animation/movie file",
d: "Image file",
ans:"ans3"
},
{
question:  " Which of these is a documented hoax virus?",
a :" McDonalds screensaver ",
b : " Alien.worm",
c : " Merry Xmas",
d: " Adolph",
ans:"ans1"
},


{

question:  " '.INI' extension refers usually to what kind of file?",
a :" Image file ",
b : " System file",
c : " Hypertext related file",
d: " Image Color Matching Profile file",
ans:"ans2"
},


{

question:  " This is a paragraph Question",
a :" Shoaib ",
b : " Harshad",
c : " Preksha",
d: " Yawer",
ans:"ans4"
},

{

question:  " This is a paragraph Question'? ",
a :" 7 ",
b : " 2 ",
c : " 3 ",
d: " 8 ",
ans:"ans3"
}


];
const maximize=document.querySelector( '#max-btn');
const minimize=document.querySelector( '#minimize');
const close=document.querySelector( '#close');
const clear=document.querySelector( '#clear');
const review=document.querySelector( '#review');
const question = document.querySelector( '.question');
const option1= document.querySelector( '#option1');
const option2= document.querySelector( '#option2');
const option3= document.querySelector( '#option3');
const option4= document.querySelector( '#option4');
const submit = document.querySelector( '#submit');
const quesno= document.querySelector( '.questionNo');
const answers = document.querySelectorAll('.answer');
const showScore = document.querySelectorAll('#showScore');
const buttons= document.querySelectorAll('.num');
const next = document.querySelector( '#next');
const prev= document.querySelector( '#prev');
let questionCount=0;
let score=0;
var SelectedAnswers= [];
const startingMinutes = 10;
let time= startingMinutes * 60;
const countdownEl =document.getElementById('countdown');

setInterval (updateCountdown,1000);

 function updateCountdown(){
   const minutes= Math.floor(time / 60);
   let seconds= time %60;
   seconds =seconds <10 ?'0'+ seconds :seconds;
   countdownEl.innerHTML=minutes+' Min '+seconds+' Secs ';
   time--;
   if(time<0)
   {
     clearInterval(setInterval);
     countdownEl.innerHTML="00:00";

      document.getElementById("QuizArea").style.display = "none";

      document.getElementById("results").style.display = "block";
      const span2=document.querySelector('#displayAnswer');
       span2.innerText=score+" / "+ (quizDB.length);
        document.getElementById("timeup").style.display = "block";
   }
 };
 const loadQuestion = () => {
   const questionList = quizDB[questionCount];
    quesno.innerHTML= "Question: "+ (questionCount+1) +"/9";
    if(questionCount<7)
    {
   question.innerText= questionList.question;
 }
 else{

   question.innerHTML= "This is a paragraph <span></span> <br>Shoaib, Harshad, Preksha, and Yawer are four friends playing poker. In each hand, the individual player has to bet 800 rupees. Preksha wins three hands, Yawer wins two and the others win four hands each.";
   var temp= "#q"+ (questionCount+1);
   const span=document.querySelector('span');
   const button = document.createElement("button");
   button.innerText="question";
   button.setAttribute("class", "btn btn-primary");
   button.setAttribute("type", "button");
   button.setAttribute("data-bs-target", temp);
   button.setAttribute("data-bs-toggle", "collapse");
   button.setAttribute("aria-expanded", "false");
   button.setAttribute("aria-controls", "collapseExample");
   span.append(button);
 }

   option1.innerText= questionList.a;
   option2.innerText= questionList.b;
   option3.innerText= questionList.c;
   option4.innerText= questionList.d;
   if(questionCount==0)
   {
     prev.disabled=true;
   }
   else
   {
     prev.disabled=false;
   };
   if(questionCount==8)
   {
     next.disabled=true;
   }
 else{
   next.disabled=false;
 }

 }

loadQuestion();


submit.addEventListener('click',() => {
  const checkedAnswer = getCheckAnswer();
  console.log(checkedAnswer);
  if(review.checked)
  {
    buttons[questionCount].style.backgroundColor = "#c6ffc1";
  }
  else {
 if(checkedAnswer!="0")
 {
buttons[questionCount].style.backgroundColor = "#fea82f";
  if(checkedAnswer==quizDB[questionCount].ans){
    score++;
  };
  };
};
document.getElementById("QuizArea").style.display = "none";
document.getElementById("results").style.display = "block";
const span2=document.querySelector('#displayAnswer');
 span2.innerText=score+" / "+ (quizDB.length);
 next.disabled=true;
 prev.disabled=true;
 submit.disabled=true;
});

const getCheckAnswer = () => {
  let answer="0";
  if(review.checked)
  {
      SelectedAnswers[questionCount]="MFR";
  }
  else{
  answers.forEach((curAnsElem) => {
    if(curAnsElem.checked){
      answer = curAnsElem.id;
      SelectedAnswers[questionCount]=curAnsElem.id;
    }

  });
  return answer;
}
};

const Selectprev = () =>{
  if(SelectedAnswers[questionCount]=="MFR")
  {
  review.checked=true;
  answers.forEach((curAnsElem) => curAnsElem.checked= false);
}
else{
    review.checked=false;
}
  answers.forEach((curAnsElem) => {


    if(curAnsElem.id==SelectedAnswers[questionCount]){
      curAnsElem.checked= true;
    }

});
};
const deselectAll = () => {
  answers.forEach((curAnsElem) => curAnsElem.checked= false);
  review.checked=false;

}

function button_click(clicked) {
               questionCount= clicked-1;
               loadQuestion();
               if(SelectedAnswers.length<=questionCount)
                 {
                   deselectAll();
               }
             else{
               Selectprev();
             }
           }

 minimize.addEventListener('click',() => {
  document.getElementById("QuizArea").style.display = "none";
  document.getElementById("maximize").style.display = "block";
  });
 maximize.addEventListener('click',() => {
   document.getElementById("maximize").style.display = "none";
   document.getElementById("QuizArea").style.display = "block";
 });
close.addEventListener('click',() => {
  document.getElementById("QuizArea").style.display = "none";
});

prev.addEventListener('click',() => {
  questionCount--;
  loadQuestion();
  Selectprev();
    next.disabled=false;
});
clear.addEventListener('click',() => {
  deselectAll();
  buttons[questionCount].style.backgroundColor = "#fff";
  SelectedAnswers[questionCount]="";
});

 next.addEventListener('click',() => {
   const checkedAnswer = getCheckAnswer();
   console.log(checkedAnswer);
   if(review.checked)
   {
     buttons[questionCount].style.backgroundColor = "#c6ffc1";
   }
   else {
  if(checkedAnswer!="0")
  {
buttons[questionCount].style.backgroundColor = "#fea82f";
   if(checkedAnswer==quizDB[questionCount].ans){
     score++;
   };
   };
 };
   questionCount++;
   if(SelectedAnswers.length<=questionCount)
     {
       deselectAll();
   }
 else{
   Selectprev();
 }



  if(questionCount < quizDB.length){
     loadQuestion();
   }


           /*showScore.classList.remove('scoreArea');*/
});
