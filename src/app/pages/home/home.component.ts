import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Tarea } from './../../models/tareas.model';
import {TaskServicesService} from './../../services/task-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  tasks: Tarea[] = [];
  taskTitle:string="";
  constructor(
    private taskService:TaskServicesService
  ) {
    this.tasks = this.taskService.getTasks();
  }
 

  addNewTask(){
    this.taskService.addTask(this.taskTitle);
    this.taskTitle = '';
  }
  getPending() {
    return this.taskService.pending;
  }

  getCompleted() {
    return this.taskService.completed;
  }

  getTotal() {
    return this.taskService.getTasks().length;
  }
  eraseCompleted(){
    this.tasks = this.taskService.eraseCompleted();
  }
}
