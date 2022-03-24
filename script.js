/*add a new todo variables */
let addTodoInput = document.querySelector('.add-todo-input');
let headingFormAddTodo = document.querySelector('.heading-form-add-todo');
let todoUl = document.querySelector('.todo-ul');
/*heading Search variables */
let headingSearchFormInput = document.querySelector('.heading-form-input');
let headingFormSearch = document.querySelector('.heading-form-search');

/*error message*/
let errorMessage = document.querySelector('.err-msg');

/*start of event for submitting the form to add a new todo*/

function addLiElement(inputText){
    let pattern = /^[a-zA-Z0-9 !%?\.]{1,50}$/;
    if(pattern.test(inputText)){
        let html = `<li class="todo-ul-li bg-li-color">
                    ${inputText} 
                    <i class="fa-solid fa-trash-can"></i>
                </li>`;
        todoUl.innerHTML += html;
    }
   
}

/*delete feature*/
function addAnLiItem(e){
    e.preventDefault();
    let newTodoInputValue = addTodoInput.value.trim();

    addLiElement(newTodoInputValue);
    headingFormAddTodo.reset();
}

todoUl.addEventListener('click',deleteLiElement)
/*end of delete feature*/

function deleteLiElement(e){
    if(e.target.className === 'fa-solid fa-trash-can'){
        e.target.parentElement.remove();
    }
    
}

headingFormAddTodo.addEventListener('submit',addAnLiItem);

/*END of event for submitting the form to add a new todo*/

/*search functionality*/

function showMatches(e){
    e.preventDefault();
    let searchTerm = this.value.toLowerCase().trim();
    let pattern = /^[a-zA-Z0-9 !%?\.]{1,50}$/;
    if(headingSearchFormInput.value ===''){
        Array.from(todoUl.children).forEach(todo=>{
            todo.classList.remove('hide');
        })
    }
    if(todoUl.children.length === 0){
        errorMessage.innerText = 'No list to search from. Add new todos first.';
        errorMessage.classList.remove('hidden');
    }else{
        if(pattern.test(searchTerm)){
            e.preventDefault();
            let filterResults = Array.from(todoUl.children).filter(todo=>{
                if(todo.innerText.toLowerCase().includes(searchTerm)){
                    return todo;
                }
            })
            console.log(filterResults);
            filterResults.forEach(todo =>{
                todo.classList.add('show');
                todo.classList.remove('hide');
            })
    
            let filteredOut = Array.from(todoUl.children).filter(todo=>{
                if(!todo.innerText.toLowerCase().includes(searchTerm)){
                    return todo;
                }
            })
            console.log(filteredOut);
            filteredOut.forEach(todo =>{
                todo.classList.add('hide');
                todo.classList.remove('show');
            })
            
        }else{
            e.preventDefault();
            errorMessage.innerText = 'Try another search word!';
            errorMessage.classList.remove('hidden');
        }

    }

}
headingSearchFormInput.addEventListener('keyup',showMatches)
addTodoInput.addEventListener('keyup',()=>{
    errorMessage.classList.add('hidden');
})
/*END of search functionality*/



