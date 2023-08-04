import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Tarea } from './../../models/tareas.model';
import {TaskServicesService} from './../../services/task-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  tasks: Tarea[] = [];
  taskTitle:string="";
  currentRoute: string = '';
  sub;
  constructor(
    private route: ActivatedRoute,
    private taskService:TaskServicesService
  ) {
    this.tasks = this.taskService.getTasks();
    this.sub = this.route.url.subscribe(url => {
      console.log("y entonces: ", url);
      if (url.length === 0) {
        this.currentRoute = 'all';
        console.log(this.currentRoute);
      } else {
        this.currentRoute = url[0].path;
      }
      // console.log(url);
      // this.currentRoute = url[0].path;
      console.log(this.currentRoute);
      this.filterTasks(this.currentRoute);
    });
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
  filterTasks(filter: string) {
    switch (filter) {
      case 'all':
        this.tasks = this.taskService.getTasks();
        break;
      case 'pending':
        this.tasks = this.taskService.getTasks().filter(task => !task.completed);
        console.log("estoy en peding", this.tasks);
        break;
      case 'completed':
        this.tasks = this.taskService.getTasks().filter(task => task.completed);
        break;
      default:
        this.tasks = this.taskService.getTasks();
        break;
    }
  }
}
