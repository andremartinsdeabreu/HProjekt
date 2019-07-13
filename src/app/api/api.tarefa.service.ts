import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TarefaModel from '../models/TarefaModel';

@Injectable()
export default class TarefaService {
    private API = 'http://localhost:8080/api';
    private TAREFA_API = `${this.API}/Tarefas`;

    constructor(private http: HttpClient) { }

    get(query): Observable<Array<TarefaModel>> {
        let isCompleted = null;
        if(query === 'completed' || query === 'active') {
            isCompleted = query === 'completed';
        }
        return this.http.get<Array<TarefaModel>>(`${this.TAREFA_API}/ObterTarefas?isDone=${isCompleted}`)
    }

    add(tarefa) {
        return this.http.post<TarefaModel>(`${this.TAREFA_API}/CadastrarTarefa`, tarefa);
    }

    put(tarefa: TarefaModel) {
        return this.http.put<TarefaModel>(`${this.TAREFA_API}/AtualizaTarefa/`, tarefa);
    }

    delete(id) {
        return this.http.delete(`${this.TAREFA_API}/DeleteTarefa?id=${id}`);
    }

    deleteCompleted() {
        return this.http.delete(`${this.TAREFA_API}/DeleteTarefa?id=0`);
    }
}