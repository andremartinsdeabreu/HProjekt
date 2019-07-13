import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TarefaComponent } from './Tarefa/tarefa.component';

import { FormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: ':status', component: TarefaComponent},
  {path: '**', redirectTo: '/all'}
]

@NgModule({
  declarations: [
    AppComponent,
    TarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
