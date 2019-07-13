import { Injectable } from '@angular/core';

 const TAREFAS = [
  {title: 'Install Angular CLI', isDone: true, editing: false },
  {title: 'Style App', isDone: true, editing: false },
  {title: 'Finish service functionalidade', isDone: false, editing: false },
  {title: 'Setup API', isDone: false, editing: false }
]

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  get(query) {

    return new Promise(resolve => {
      let data;
      if(query === 'completed' || query === 'active') {
        const isCompleted = query === 'completed';
        data = TAREFAS.filter(tarefa=>tarefa.isDone === isCompleted);
      } else {
        data = TAREFAS;
      }
    
      resolve(data)
    });
  }

  add(data) {
    return new Promise(resolve=>{
      TAREFAS.push(data);
      resolve(data);
    })
  }

  put(data) {
    return new Promise(resolve=>{
      const index = TAREFAS.findIndex(tarefa=> tarefa===data);
      TAREFAS[index].title=data.title;
      resolve(data);
    })
  }

  delete(data) {
    return new Promise(resolve => {
      const index = TAREFAS.findIndex(tarefa => tarefa===data);
      TAREFAS.splice(index, 1);
      resolve(data);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      let tarefas;
      tarefas = TAREFAS.filter(tarefa => tarefa.isDone);
      tarefas.array.forEach(element => {
        TAREFAS.splice(element.index,1);
      });
      resolve(tarefas);
    })
  } 
}
