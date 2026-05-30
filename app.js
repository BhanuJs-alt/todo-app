console.log("js is connected");
let mainList= document.querySelector("#main-list");
let addBtn=document.querySelector("#add-btn");
let input=document.querySelector("#input");

let tasks=[];

loadTask();//loading saved task

//function to add task to the list
function addTask(){
    let taskTxt = input.value.trim();//only text no extra space add

    if(taskTxt !== ""){
        let Newtask ={
            id:Date.now(),
            text: taskTxt,
            completed:false
        };
        tasks.push(Newtask);
       createListElement(Newtask);
        saveTask();
        input.value="";
        console.log(tasks);
    }
}

function createListElement(task){
    const li = document.createElement('li');//it will create new element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className="check-btn";
    checkbox.checked = task.completed;
   
    const span = document.createElement('span');
    span.className = "task-text";
    span.innerText = task.text;
    if (task.completed) {
        span.classList.add("completed");
    }

    const actionsDiv = document.createElement('div');
    actionsDiv.className = "actions";

    const editBtn=document.createElement('button')
    editBtn.innerHTML='&#9998;';
    editBtn.className='edit-btn';
    
    const delBtn= document.createElement('button');
    delBtn.innerHTML="&times;";
    delBtn.className="del-btn";//giving btn a class name

    checkbox.addEventListener('change', (event) => {
        task.completed = event.target.checked;
        if (task.completed) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }
        saveTask(); 
    });

    delBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id != task.id); 
        li.remove();
        saveTask(); 
        console.log(tasks); 
    });

    editBtn.addEventListener('click', () => {
        if (task.completed) return; 
        
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            span.innerText = task.text;
            saveTask(); 
        }
    });
    
    
    li.setAttribute("data-id",task.id)
   
    li.appendChild(checkbox);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(actionsDiv);
    mainList.appendChild(li);
  
}



//function for saving tasks 
function saveTask(){
    localStorage.setItem("todoTasks",JSON.stringify(tasks));//local storage save string only stringify convert into string

}

//function to load tasks
function loadTask(){
    let savedTask = localStorage.getItem("todoTasks");

    if(savedTask){
        let parsedTasks=JSON.parse(savedTask);
         tasks = parsedTasks.filter(task => task.id !== undefined && task.id !== null);
        tasks.forEach(task =>{
          createListElement(task);//calling createlisst element function for creating element
        });
    }  
}


addBtn.addEventListener('click',addTask);

input.addEventListener('keypress',function(event){
    if(event.key=="Enter"){
        addTask();
    }
});