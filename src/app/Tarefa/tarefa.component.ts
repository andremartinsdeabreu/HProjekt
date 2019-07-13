import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import { Tarefa_Service } from './tarefa.service';
import TarefaService from '../api/api.tarefa.service'

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
  providers: [TarefaService]
})
export class TarefaComponent implements OnInit {
  private novaTarefa;
  private tarefas;
  private tarefasAtivas;
  private path;

  constructor(private tarefaService: TarefaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      this.path=params['status'];
      this.getTarefas(this.path);
    })    
  }

  getTarefas(query='') { 
    /*return this.tarefaService.get(query).then(tarefas=> {
      this.tarefas=tarefas;
      this.tarefasAtivas = this.tarefas.filter(tarefa=>tarefa.isDone).length;
    })*/
    return this.tarefaService.get(query).subscribe(data=> {
      this.tarefas = data;
      this.tarefasAtivas = this.tarefas.filter(tarefa=>!tarefa.isDone).length;
    })
  }

  adicionaTarefa() {
    //this.novaTarefa='';
    let tarefa = {
      Id: 0,
      Title: this.novaTarefa,
      IsDone: false,
      Editing: false
    };
    this.tarefaService.add(tarefa).subscribe(data=> {
      this.novaTarefa='';//Limpa o input form value
      this.getTarefas();
    })
  }

  atualizaTarefa(tarefa, novoValor) {
    tarefa.Title=novoValor;
    return this.tarefaService.put(tarefa).subscribe(data=>{
      tarefa.Editing = false;
      return this.getTarefas();
    })
  }

  checkTarefa(tarefa, isChecked) {
    tarefa.isDone=isChecked;
    return this.tarefaService.put(tarefa).subscribe(data=>{
      tarefa.isDone = false;
      return this.getTarefas();
    })
  }

  removeTarefa(id) {
    this.tarefaService.delete(id).subscribe(data=>{
      return this.getTarefas();
    })
  }

  removeTarefasOK() {
    this.tarefaService.deleteCompleted().subscribe(data => {
      return this.getTarefas();
    })
  }
}
