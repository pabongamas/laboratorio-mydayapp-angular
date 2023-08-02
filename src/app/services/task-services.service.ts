import { Injectable } from '@angular/core';
import { Tarea } from './../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {
  tasks: Array<Tarea> = [];
  pending: number = 0;
  completed: number = 0;
  constructor() {
    let data = localStorage.getItem('mydayapp-angular');
    if (data) {
      this.tasks = JSON.parse(data);
      this.updateCounters();
    }
   }

  addTask(title: string) {
    if (title != '') {
      let newTask: Tarea = {
        id: this.tasks.length,
        title: title.trim(),
        completed: false
      }
      this.tasks.push(newTask);
      this.updateCounters();
      this.saveLocalData();
    }
  }
  getTasks(){
    return this.tasks;
  }
  removeTask(index:number){
    this.tasks.splice(index, 1);
    this.updateCounters();
    this.saveLocalData();
  }
  completedTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.updateCounters();
    this.saveLocalData();
  }
  updateCounters(){
    this.pending = this.tasks.filter(task => !task.completed).length;
    this.completed = this.tasks.filter(task => task.completed).length;
  }
  editTaskTitle(index:number,title:string){
    if (title != '') {
      this.tasks[index].title = title.trim();
      this.saveLocalData();
    }
  }
  eraseCompleted(){
    this.tasks = this.tasks.filter(task => !task.completed);
    this.updateCounters();
    this.saveLocalData();
    return this.tasks;
  }
  saveLocalData() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
}
