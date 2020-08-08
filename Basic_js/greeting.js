const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const UESR_LS = "currentUser"; //웹에서 임의로 생성한 유저 이름임
const SHOWING_CN = "showing";

function saveName(name){
    localStorage.setItem(UESR_LS,name);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    patingGreeting(currentValue);
    saveName(currentValue);

    // const currentValue = input.value;
    // console.log(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function patingGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function init(){
    const currentUser = localStorage.getItem(UESR_LS);
    if(currentUser === null){
        askForName();
    }else{
        patingGreeting(currentUser);
    }
}

init(); 