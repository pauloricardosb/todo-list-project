// Projeto To-Do List

const mainSection = document.getElementById('main-section');
const buttonSection = document.getElementById('button-section');

// Cria título da página

function criaHeader() {
  const header = document.createElement('header');
  const headerText = document.createElement('p');

  headerText.innerText = 'Todo App';
  header.id = 'page-header';

  mainSection.appendChild(header);
  header.appendChild(headerText);
}

criaHeader();

// Cria caixa de texto

function criaInput() {
  const input = document.createElement('input');
  input.id = 'new-task-input';
  mainSection.appendChild(input);
}

criaInput();

// Cria botão para adicionar tarefa

function criaBotao() {
  const btn = document.createElement('button');
  btn.id = 'criar-tarefa';
  btn.innerText = 'Adicionar Tarefa';

  btn.addEventListener('click', criaLista);
  mainSection.appendChild(btn);
}

criaBotao();

// Cria lista ordenada

function ordList() {
  const ordList = document.createElement('ol');
  ordList.id = 'todo-list';

  mainSection.appendChild(ordList);
}

ordList();

function criaLista() {
  const ordList = document.getElementById('todo-list');
  const textoInput = document.getElementById('new-task-input');
  const lista = document.createElement('li');

  lista.innerText = textoInput.value;
  textoInput.value = '';

  ordList.appendChild(lista);
}

// Adiciona cor de fundo ao selecionar item da lista de tarefas

const ordenadeList = document.getElementById('todo-list');

function selecionarItem(event) {
  const listItem = document.querySelectorAll('li');

  for (let index = 0; index < listItem.length; index += 1) {
    listItem[index].style.backgroundColor = 'white';
    listItem[index].classList.remove('select');
  }
  event.target.style.backgroundColor = '#B2C8DF';
  event.target.classList.add('select');
}

ordenadeList.addEventListener('click', selecionarItem);

// Adiciona classe completed e marca / desmarca tarefa

function completaTarefa(event) {
  event.target.classList.toggle('completed');

  if (event.target.style.textDecoration === 'line-through solid rgb(0, 0, 0)') {
    event.target.style.textDecoration = 'none';
  } else {
    event.target.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
  }
}

ordenadeList.addEventListener('dblclick', completaTarefa);

// Botao para limpar lista de tarefas

function limpar() {
  const listItens = document.querySelectorAll('li');

  for (let index = 0; index < listItens.length; index += 1) {
    ordenadeList.removeChild(listItens[index]);
  }
}

function limpaTudo() {
  const btnLimpar = document.createElement('button');
  btnLimpar.id = 'apaga-tudo';
  btnLimpar.className = 'btn-section';
  btnLimpar.innerText = 'Limpar Tarefas';

  buttonSection.appendChild(btnLimpar);
  document.querySelector('#apaga-tudo').addEventListener('click', limpar);
}

limpaTudo();

// Botao para limpar tarefas finalizadas

function limparFinalizados() {
  const listItens = document.querySelectorAll('li');

  for (let index = 0; index < listItens.length; index += 1) {
    if (listItens[index].classList.contains('completed')) {
      ordenadeList.removeChild(listItens[index]);
    }
  }
}

function botaoFinalizados() {
  const btnClean = document.createElement('button');
  btnClean.id = 'remover-finalizados';
  btnClean.className = 'btn-section';
  btnClean.innerText = 'Limpar Finalizados';

  buttonSection.appendChild(btnClean);
  btnClean.addEventListener('click', limparFinalizados);
}

botaoFinalizados();

// Botao para limpar tarefas selecionadas

function limparSelecionados() {
  const listItens = document.querySelectorAll('li');

  for (let index = 0; index < listItens.length; index += 1) {
    if (listItens[index].classList.contains('select')) {
      ordenadeList.removeChild(listItens[index]);
    }
  }
}

function botaoSelecionados() {
  const btnCleanSelected = document.createElement('button');
  btnCleanSelected.id = 'remover-selecionado';
  btnCleanSelected.className = 'btn-section';
  btnCleanSelected.innerText = 'Limpar Selecionados';

  buttonSection.appendChild(btnCleanSelected);
  btnCleanSelected.addEventListener('click', limparSelecionados);
}

botaoSelecionados();

// Cria botões para mover elemento da lista de tarefas

function botoes() {
  const upButton = document.createElement('button');
  upButton.id = 'mover-cima';
  upButton.className = 'btn-section';
  upButton.innerText = 'Mover acima';

  const downButton = document.createElement('button');
  downButton.id = 'mover-baixo';
  downButton.className = 'btn-section';
  downButton.innerText = 'Mover abaixo';

  buttonSection.appendChild(upButton);
  buttonSection.appendChild(downButton);
}

botoes();

// Mover acima

function moverAcima() {
  const listItems = document.querySelectorAll('li');

  for (let index = 0; index < listItems.length; index += 1) {
    if (
      listItems[index].classList.contains('select') &&
      listItems[index].previousElementSibling
    ) {
      listItems[index].parentNode.insertBefore(
        listItems[index],
        listItems[index].previousElementSibling,
      );
    }
  }
}

const moveAcima = document.querySelector('#mover-cima');
moveAcima.addEventListener('click', moverAcima);

// Mover abaixo

function moverAbaixo() {
  const listItems = document.querySelectorAll('li');

  for (let index = 0; index < listItems.length; index += 1) {
    if (
      listItems[index].classList.contains('select') &&
      listItems[index].nextElementSibling
    ) {
      listItems[index].parentNode.insertBefore(
        listItems[index].nextElementSibling,
        listItems[index],
      );
    }
  }
}

const moveAbaixo = document.querySelector('#mover-baixo');
moveAbaixo.addEventListener('click', moverAbaixo);

// Salvar tarefas

function botaoSalvar() {
  const buttonSaveTasks = document.createElement('button');
  buttonSaveTasks.id = 'salvar-tarefas';
  buttonSaveTasks.className = 'btn-section';
  buttonSaveTasks.innerText = 'Salvar Tarefas';

  buttonSection.appendChild(buttonSaveTasks);
}

botaoSalvar();

function saveTasks() {
  localStorage.setItem('newList', JSON.stringify(ordenadeList.innerHTML));
}

document.querySelector('#salvar-tarefas').addEventListener('click', saveTasks);

// Função de recarregar página

function reload() {
  const savedList = localStorage.getItem('newList');
  ordenadeList.innerHTML = JSON.parse(savedList);
}

window.onload = function () {
  reload();
};

// Referências

//https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore#syntax
