const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList")
const TODOS_LS = "todos";
let toDos = []; //array

function deleteToDo(event){
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    //    removeChild해서 선택한 한개가 삭제된 li
    //    toDos에는 아직 삭제된게 반영x임
    //    현재li.id는 삭제할려고 선택된 놈임
    //    이상태에서 filter함수 쓰면 선택된 li.id값이
    //    그 todos 개수만큼 돌면서 조건을 검사한다
    //    만약 id가 1인놈 삭제 할려고 눌렀고, 돌면서 1이 아닌 것들만
    //    새 배열에 담는거네

    toDos = cleanToDos;
    saveToDos();
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}                                     //JSON.stringify는 object를 string으로 바꿔준다

function paintTodo(text){
    const li = document.createElement("li");
    const delbtn = document.createElement("button");
    delbtn.innerHTML = "X";
    delbtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delbtn);
    li.id = newId; //li에 id부여
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos(); 
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value="";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //console.log(loadedToDos);
        const parseedToDos = JSON.parse(loadedToDos); //object로 만들어줌
        //console.log(parseedToDos);

        parseedToDos.forEach(function(toDo){
            //console.log(toDo.text);
            paintTodo(toDo.text);
        });

    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}
init();