const inputTask = document.querySelector('#input-new-task');
const btnTask = document.querySelector('#btn-new-task');
const tasks = document.querySelector('#tasks');

//Função para criar o elemento li
function createLi() {
    const li = document.createElement('li');
    return li;
}

//Função para criar a tarefa
function createTask(task) {
    const li = createLi();
    li.innerHTML = task;
    li.setAttribute('class', 'task');
    tasks.appendChild(li);
    clearInput();
    deleteTask(li);
    saveTask(li);
}

//Função para limpar o imput (após adicionar uma tarefa)
function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

//Função para inserir o botão/icone de remover tarefa
function deleteTask(task) {
    const clearButton = document.createElement('button');
    clearButton.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #acacac; font-size: 1.2rem;"></i>';
    task.appendChild(clearButton);
    clearButton.setAttribute('class', 'delete')
    clearButton.setAttribute('title', 'Deletar');
    clearButton.addEventListener('click', function () {
        clearButton.parentElement.remove();
        saveTask();
    })
}

//Evento de inserir tarefa após clicar na tecla espaço
inputTask.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

//Evento de clicar no ícone de adicionar tarefa
btnTask.addEventListener('click', function () {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

////Função para salvar tarefas dentro do banco de dados
function saveTask() {
    const liTasks = tasks.querySelectorAll('li');
    const toDoList = [];

    for (let task of liTasks) {
        let textTask = task.innerText;
        //colocando no array
        toDoList.push(textTask);
    }
    
    const tasksJSON = JSON.stringify(toDoList);

    localStorage.setItem('tarefas', tasksJSON);
}

////Função para adicionar as tarefas salvas na página
function adicionarTarefasSalvas() {
    const tasks = localStorage.getItem('tarefas');
    const toDoList = JSON.parse(tasks);

    for (let task of toDoList){
        createTask(task);
    }
}

//Variáveis para criação do botão de alteração da cor padrão
const btnToggleMode = document.querySelector('#toggleMode');
const body = document.body;
const inputBox = document.querySelector('#to-do-list div');
const container = document.querySelector('#to-do-list');

//Evento pra alterar as cores padrão ao clicar no botão
btnToggleMode.addEventListener('click', function () {
    body.classList.toggle('toggleColorBody');   
    inputBox.classList.toggle('toggleColorInput'); 
    container.classList.toggle('toggleColorToDoList');
})

adicionarTarefasSalvas();